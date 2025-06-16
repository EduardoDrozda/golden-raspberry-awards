import { OnApplicationShutdown } from "@nestjs/common";
import { Knex } from "knex";
import { knex } from ".";

export class DatabaseService implements OnApplicationShutdown {
  private readonly client: Knex = knex;

  get database(): Knex {
    return this.client;
  }

  async onApplicationShutdown(signal?: string) {
    if (signal) {
      console.log(`Received shutdown signal: ${signal}`);
    }

    await this.client.destroy();
  }
}