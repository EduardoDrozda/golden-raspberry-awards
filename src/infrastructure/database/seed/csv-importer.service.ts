import { CreateMovieWithAssociationsModel } from "@domain/models/movie.model";
import { Knex } from "knex";
import { knex } from "..";
import { Injectable } from "@nestjs/common";
import { LoggerService } from "@common/logger";

@Injectable()
export class CsvImporterService {
  private readonly database: Knex = knex;
  constructor(private readonly loggerService: LoggerService) { }

  async import(data: CreateMovieWithAssociationsModel) {

    await this.database.transaction(async (trx) => {
      const { producers, studios, ...movieData } = data;
      try {
        const [movie] = await trx('movies').insert({ ...movieData }).returning('*');

        await Promise.all([
          ...data.producers.map(name => this.upsertRelation(trx, 'producers', 'movies_producers', movie.id, name)),
          ...data.studios.map(name => this.upsertRelation(trx, 'studios', 'movies_studios', movie.id, name)),
        ]);
      } catch (error) {
        this.loggerService.error(`Error importing movie: ${error.message}`);
        throw error;
      }
    });
  }

  private async upsertRelation(
    trx: Knex.Transaction,
    table: 'producers' | 'studios',
    joinTable: 'movies_producers' | 'movies_studios',
    movieId: number,
    name: string
  ) {
    let entity = await trx(table).where('name', name).first();
    if (!entity) {
      [entity] = await trx(table).insert({ name }).returning('*');
    }

    await trx(joinTable).insert({ movie_id: movieId, [`${table.slice(0, -1)}_id`]: entity.id });
  }
}