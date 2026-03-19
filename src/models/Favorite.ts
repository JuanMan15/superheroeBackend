import db from "../database";

export type FavoriteRecord = {
  id: number;
  user_id: number;
  hero_id: number;
  created_at: Date;
};

export type FavoriteHeroRecord = FavoriteRecord & {
  nombre_heroe: string;
  nombre_real: string;
  universo: string;
  poder_principal: string;
  fortaleza: string | null;
  resistencia: string | null;
  debilidad: string | null;
  imagen_url: string | null;
};

export const addFavorite = async (
  userId: number,
  heroId: number,
): Promise<number> => {
  const [row] = await db("favorites")
    .insert({ user_id: userId, hero_id: heroId })
    .returning("id");
  const id = typeof row === "number" ? row : row.id;
  return Number(id);
};

export const listFavoritesByUser = async (
  userId: number,
): Promise<FavoriteRecord[]> => {
  return db<FavoriteRecord>("favorites")
    .where({ user_id: userId })
    .orderBy("id", "asc");
};

export const listFavoriteHeroesByUser = async (
  userId: number,
): Promise<FavoriteHeroRecord[]> => {
  return db("favorites as f")
    .join("cat_superheroes as h", "h.id", "f.hero_id")
    .where("f.user_id", userId)
    .select(
      "f.id",
      "f.user_id",
      "f.hero_id",
      "f.created_at",
      "h.nombre_heroe",
      "h.nombre_real",
      "h.universo",
      "h.poder_principal",
      "h.fortaleza",
      "h.resistencia",
      "h.debilidad",
      "h.imagen_url",
    )
    .orderBy("f.id", "asc");
};

export const removeFavorite = async (
  userId: number,
  heroId: number,
): Promise<number> => {
  return db("favorites").where({ user_id: userId, hero_id: heroId }).del();
};
