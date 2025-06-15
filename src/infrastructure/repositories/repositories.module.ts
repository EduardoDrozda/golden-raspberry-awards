import { PRODUCERS_REPOSITORY } from "@application/repositories";
import { Global, Module } from "@nestjs/common";
import { ProducerRepository } from "./producer/producer.repository";

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: PRODUCERS_REPOSITORY,
      useClass: ProducerRepository
    }
  ],
  exports: [
    PRODUCERS_REPOSITORY,
  ],
})
export class RepositoriesModule {
}