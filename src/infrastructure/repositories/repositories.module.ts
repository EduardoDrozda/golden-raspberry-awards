import { MOVIES_REPOSITORY, PRODUCERS_REPOSITORY, STUDIO_REPOSITORY } from "@application/repositories";
import { Global, Module } from "@nestjs/common";
import { MovieRepository } from "./movie/movie.repository";
import { ProducerRepository } from "./producer/producer.repository";
import { StudioRepository } from "./studio/studio.repository";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: MOVIES_REPOSITORY,
      useClass: MovieRepository
    },
    {
      provide: PRODUCERS_REPOSITORY,
      useClass: ProducerRepository
    },
    {
      provide: STUDIO_REPOSITORY,
      useClass: StudioRepository
    }
  ],
  exports: [
    MOVIES_REPOSITORY,
    PRODUCERS_REPOSITORY,
    STUDIO_REPOSITORY
  ],
})
export class RepositoriesModule {
}