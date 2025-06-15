import { CreateProducerModelInput, ProducerModel, ProducerModelWithMovies } from "@domain/models/producter.model";

export const PRODUCERS_REPOSITORY = "IProducersRepository";

export interface IProducersRepository {
  findProducersWithWinnersMovies(): Promise<ProducerModelWithMovies[]>;
  findAllProducers(): Promise<ProducerModel[]>
}