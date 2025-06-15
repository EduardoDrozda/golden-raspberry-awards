import { Injectable } from "@nestjs/common";
import { EnviromentService } from "@common/enviroment";
import { LoggerService } from "@common/logger";
import { Knex } from "knex";
import { knex } from ".";
import * as path from "path";
import { existsSync } from "fs";
import { CsvLoaderService, CsvLoaderTransformerService } from "@infrastructure/csv-loader";
import { CreateMovieWithAssociationsModel } from "@domain/models/movie.model";
import pLimit from "p-limit";

const CONCURRENCY_LIMIT = 100;

@Injectable()
export class DatabaseInitService {
  private readonly database: Knex = knex;

  constructor(
    private readonly loader: CsvLoaderService,
    private readonly transformer: CsvLoaderTransformerService,
    private readonly env: EnviromentService,
    private readonly loggerService: LoggerService
  ) {
    this.loggerService.context = 'Database';
  }

  async init() {
    await this.resetDatabase();

    const filename = this.env.get("DB_BOOSTRAP_FILE");
    const filePath = path.join(process.cwd(), 'assets', filename);

    if (!existsSync(filePath)) {
      this.loggerService.error(`File ${filename} not found. Initialize with empty database`);
      return;
    }

    const limit = pLimit(CONCURRENCY_LIMIT);

    this.loggerService.log(`Loading data from ${filename}...`);

    await this.loader.load(filePath, async (rawRow) => {
      const dto = this.transformer.transform(rawRow);
      await limit(() => this.import(dto));
    });
  }

  private async resetDatabase() {
    await this.database('movies_studios').delete();
    await this.database('movies_producers').delete();
    await this.database('movies').delete();
    await this.database('studios').delete();
    await this.database('producers').delete();

    await this.database.raw("DELETE FROM sqlite_sequence WHERE name IN ('movie_studios', 'movie_producers', 'movies', 'studios', 'producers')");
    this.loggerService.log("Database reset successfully.");
  }

  async import(data: CreateMovieWithAssociationsModel) {
    await this.database.transaction(async (trx) => {
      const { producers, studios, ...movieData } = data;
      try {
        const [movie] = await trx('movies').insert({ ...movieData }).returning('*');

        await Promise.all([
          ...producers.map(name => this.upsertRelation(trx, 'producers', 'movies_producers', movie.id, name)),
          ...studios.map(name => this.upsertRelation(trx, 'studios', 'movies_studios', movie.id, name)),
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