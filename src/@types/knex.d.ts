declare module "knex/types/tables" {
  interface Tables {
    movies: {
      id: number;
      year: number;
      title: string;
      winner: boolean;
    };
    studios: {
      id: number;
      name: string;
    };
    producers: {
      id: number;
      name: string;
    };
    movie_studios: {
      movie_id: number;
      studio_id: number;
    };
    movie_producers: {
      movie_id: number;
      producer_id: number;
    };
  }
}