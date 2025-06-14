import { IStudioRepository } from "@application/repositories";
import { CreateStudioModelInput, StudioModel } from "@domain/models/studio.model";
import { knex } from "@infrastructure/database";
import { Knex } from "knex";

export class StudioRepository implements IStudioRepository {
  constructor(private readonly database: Knex = knex) { }

  async create(data: CreateStudioModelInput): Promise<StudioModel> {
    const [studio] = await this.database("studios")
      .insert(data)
      .returning('*');

    return studio;
  }
}