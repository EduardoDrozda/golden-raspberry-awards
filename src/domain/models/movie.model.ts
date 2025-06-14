export type MovieModel = {
  id: number;
  year: number;
  title: string;
  winner: boolean;
}

export type CreateMovieModelInput = Omit<MovieModel, 'id'>;

export type CreateMovieWithAssociationsModel = CreateMovieModelInput & {
  producers: string[];
  studios: string[];
}