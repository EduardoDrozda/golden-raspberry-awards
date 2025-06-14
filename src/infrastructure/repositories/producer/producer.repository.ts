import { IProducersRepository } from "@application/repositories";
import { CreateProducerModelInput, ProducerModel, ProducerModelWithMovies } from "@domain/models/producter.model";
import { knex } from "@infrastructure/database";
import { Knex } from "knex";

export class ProducerRepository implements IProducersRepository {
  constructor(private readonly database: Knex = knex) { }

  async findProducersWithMovies(): Promise<ProducerModelWithMovies[]> {
    return this.database('producers')
      .select(
        'producers.id as producer_id',
        'producers.name as producer_name',
        'movies.id as movie_id',
        'movies.title as movie_title',
        'movies.year',
        'movies.winner'
      )
      .join('movies_producers', 'producers.id', 'movies_producers.producer_id')
      .join('movies', 'movies.id', 'movies_producers.movie_id')
      .then((rows) => {
        return rows.map(row => ({
          id: row.id,
          name: row.name,
          movies: [{
            id: row.movie_id,
            title: row.title,
            year: row.year,
            winner: row.winner
          }]
        })) as ProducerModelWithMovies[];
      })
  }
}