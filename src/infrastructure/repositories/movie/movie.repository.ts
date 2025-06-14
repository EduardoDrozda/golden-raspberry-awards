import { IMoviesRepository } from "@application/repositories";
import { CreateMovieModelInput, MovieModel } from "@domain/models/movie.model";
import { knex } from "@infrastructure/database";
import { Knex } from "knex";

export class MovieRepository implements IMoviesRepository {
  constructor(private readonly database: Knex = knex) { }

  async create(data: CreateMovieModelInput): Promise<MovieModel> {
    const [movie] = await this.database("movies")
      .insert(data)
      .returning('*');

    return movie;
  }
}