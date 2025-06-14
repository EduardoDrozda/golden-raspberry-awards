import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("movie_studios", (table) => {
    table.increments("id").primary();
    table.integer("movie_id").notNullable().references("id").inTable("movies").onDelete("CASCADE");
    table.integer("studio_id").notNullable().references("id").inTable("studios").onDelete("CASCADE");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movie_studios");
}

