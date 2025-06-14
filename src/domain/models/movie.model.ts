export type MovieModel = {
  id: number;
  year: number;
  title: string;
  winner: boolean;
}

export type CreateMovieModelInput = Omit<MovieModel, 'id'>;