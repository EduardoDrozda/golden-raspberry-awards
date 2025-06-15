import { knex } from "@infrastructure/database";
import { configDotenv } from "dotenv";
import * as path from "node:path";

configDotenv({
  path: path.resolve(__dirname, "..", ".env.test"),
})

const database = knex;

export async function setupDatabase() {
  await database.migrate.rollback();
  await database.migrate.latest();
}

beforeAll(async () => {
  await setupDatabase();
})