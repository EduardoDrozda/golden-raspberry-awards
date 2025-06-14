import { IProducersRepository } from "@application/repositories";
import { CreateProducerModelInput, ProducerModel } from "@domain/models/producter.model";
import { knex } from "@infrastructure/database";
import { Knex } from "knex";

export class ProducerRepository implements IProducersRepository {
  constructor(private readonly database: Knex = knex) { }

  async create(data: CreateProducerModelInput): Promise<ProducerModel> {
    const [producer] = await this.database("producers")
      .insert(data)
      .returning('*');

    return producer;
  }
}