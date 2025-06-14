import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("movies", (table) => {
    table.increments("id").primary();
    table.integer("year").notNullable();
    table.string("title").notNullable();
    table.boolean("winner").notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("movies");
}

