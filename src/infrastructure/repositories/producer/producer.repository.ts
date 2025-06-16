import { IProducersRepository } from "@application/repositories";
import { ProducerModel, ProducerModelWithMovies } from "@domain/models/producter.model";
import { DatabaseService } from "@infrastructure/database/database.service";

export class ProducerRepository extends DatabaseService implements IProducersRepository {
  async findProducersWithWinnersMovies(): Promise<ProducerModelWithMovies[]> {
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
      .where('movies.winner', true)
      .groupBy('producers.id', 'movies.id')
      .orderBy('movies.year', 'asc')
      .then((rows) => (
        rows.map(row => ({
          id: row.producer_id,
          name: row.producer_name,
          movies: [{
            id: row.movie_id,
            title: row.movie_title,
            year: row.year,
            winner: !!row.winner
          }]
        })) as ProducerModelWithMovies[]))
  }
}