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
    movies_studios: {
      movie_id: number;
      studio_id: number;
    };
    movies_producers: {
      movie_id: number;
      producer_id: number;
    };
  }
}