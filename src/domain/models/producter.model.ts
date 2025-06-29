import { MovieModel } from "./movie.model";

export type ProducerModel = {
  id: number;
  name: string
};

export type CreateProducerModelInput = Omit<ProducerModel, 'id'>;

export type ProducerModelWithMovies = ProducerModel & {
  movies: MovieModel[];
}