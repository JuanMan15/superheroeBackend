import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("nombre", 120).notNullable();
    table.string("email", 150).notNullable().unique();
    table.string("password", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("cat_superheroes", (table) => {
    table.increments("id").primary();
    table.string("nombre_heroe", 120).notNullable();
    table.string("nombre_real", 120).notNullable();
    table.string("universo", 80).notNullable();
    table.string("poder_principal", 180).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("favorites", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("hero_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cat_superheroes")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.unique(["user_id", "hero_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("favorites");
  await knex.schema.dropTableIfExists("cat_superheroes");
  await knex.schema.dropTableIfExists("users");
}
