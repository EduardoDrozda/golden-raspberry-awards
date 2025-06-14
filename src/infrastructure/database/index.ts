import * as dotenv from 'dotenv';
import { Knex, knex as setupKnex } from 'knex';
import { join } from 'path';

dotenv.config();

export const config: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    filename: process.env.DB_CONNECTION || './database.sqlite',
  },
  migrations: {
    directory: join(__dirname, 'migrations'),
  },
  seeds: {
    directory: join(__dirname, 'seeds'),
  },
};

export const knex = setupKnex(config);
