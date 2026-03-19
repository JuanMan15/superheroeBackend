import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("cat_superheroes").del();

  await knex("cat_superheroes").insert([
    {
      nombre_heroe: "Spider-Man",
      nombre_real: "Peter Parker",
      universo: "Marvel",
      poder_principal: "Sentido aracnido y agilidad sobrehumana",
      fortaleza: "Su reflejo y sentido aracnido",
      resistencia: "Alta",
      debilidad: "Ondas sonicas de alta frecuencia",
      imagen_url: "Spider-Man.png",
    },
    {
      nombre_heroe: "Batman",
      nombre_real: "Bruce Wayne",
      universo: "DC",
      poder_principal: "Estrategia, tecnologia y combate",
      fortaleza: "Disciplina y preparacion",
      resistencia: "Humana maxima",
      debilidad: "Mortalidad",
      imagen_url: "Batman.png",
    },
    {
      nombre_heroe: "Wonder Woman",
      nombre_real: "Diana Prince",
      universo: "DC",
      poder_principal: "Fuerza y resistencia sobrenaturales",
      fortaleza: "Entrenamiento amazonico",
      resistencia: "Muy alta",
      debilidad: "Vulnerable a armas perforantes",
      imagen_url: "Wonder-Woman.png",
    },
  ]);
}
