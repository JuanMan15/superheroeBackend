import db from "../database";

export type HeroRecord = {
  id: number;
  nombre_heroe: string;
  nombre_real: string;
  universo: string;
  poder_principal: string;
  fortaleza: string | null;
  resistencia: string | null;
  debilidad: string | null;
  imagen_url: string | null;
  created_at: Date;
};

export const getAllHeroes = async (): Promise<HeroRecord[]> => {
  return db<HeroRecord>("cat_superheroes").select("*").orderBy("id", "asc");
};

export const getHeroById = async (
  id: number,
): Promise<HeroRecord | undefined> => {
  return db<HeroRecord>("cat_superheroes").where({ id }).first();
};

export const createHero = async (payload: {
  nombre_heroe: string;
  nombre_real: string;
  universo: string;
  poder_principal: string;
  fortaleza?: string;
  resistencia?: string;
  debilidad?: string;
  imagen_url?: string;
}): Promise<number> => {
  const [row] = await db("cat_superheroes").insert(payload).returning("id");
  const id = typeof row === "number" ? row : row.id;
  return Number(id);
};

export const updateHero = async (
  id: number,
  payload: Partial<{
    nombre_heroe: string;
    nombre_real: string;
    universo: string;
    poder_principal: string;
    fortaleza: string;
    resistencia: string;
    debilidad: string;
    imagen_url: string;
  }>,
): Promise<number> => {
  return db("cat_superheroes").where({ id }).update(payload);
};

export const deleteHero = async (id: number): Promise<number> => {
  return db("cat_superheroes").where({ id }).del();
};
