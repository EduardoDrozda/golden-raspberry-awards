import { configDotenv } from 'dotenv';
import { Knex, knex as setupKnex } from 'knex';
import { join } from 'path';

configDotenv({
  path: process.env.NODE_ENV !== 'test' ? '.env' : '.env.test'
})

export const config: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    filename: process.env.DB_CONNECTION!,
  },
  migrations: {
    directory: join(__dirname, 'migrations'),
  },
  seeds: {
    directory: join(__dirname, 'seeds'),
  },
};

export const knex = setupKnex(config);
