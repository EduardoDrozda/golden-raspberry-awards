import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("movie_producers", (table) => {
    table.increments("id").primary();
    table.integer("movie_id").notNullable().references("id").inTable("movies").onDelete("CASCADE");
    table.integer("producer_id").notNullable().references("id").inTable("producers").onDelete("CASCADE");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movies_producers");
}

