import { CreateProducerModelInput, ProducerModel } from "@domain/models/producter.model";

export const PRODUCERS_REPOSITORY = "IProducersRepository";

export interface IProducersRepository {
  create(data: CreateProducerModelInput): Promise<ProducerModel>;
}