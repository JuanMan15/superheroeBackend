import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cat_superheroes", (table) => {
    table.string("fortaleza", 255).nullable();
    table.string("resistencia", 255).nullable();
    table.string("debilidad", 255).nullable();
    table.string("imagen_url", 255).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cat_superheroes", (table) => {
    table.dropColumn("imagen_url");
    table.dropColumn("debilidad");
    table.dropColumn("resistencia");
    table.dropColumn("fortaleza");
  });
}
