import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("movies_studios", (table) => {
    table.increments("id").primary();
    
    table.integer("movie_id").unsigned().notNullable();
    table.foreign("movie_id").references("id").inTable("movies").onDelete("CASCADE");

    table.integer("studio_id").unsigned().notNullable();
    table.foreign("studio_id").references("id").inTable("studios").onDelete("CASCADE");

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("movies_studios");
}

