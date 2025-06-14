import { CreateMovieModelInput, MovieModel } from "@domain/models/movie.model";

export const MOVIES_REPOSITORY = "IMoviesRepository";

export interface IMoviesRepository {
  create(data: CreateMovieModelInput): Promise<MovieModel>;
}