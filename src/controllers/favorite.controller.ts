import { Request, Response } from "express";
import { RequestWithUser } from "../middlewares/auth.middleware";
import {
  addFavorite,
  listFavoriteHeroesByUser,
  removeFavorite,
} from "../models/Favorite";
import { getHeroById } from "../models/CatSuperheroe";

export const listMyFavorites = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    const favorites = await listFavoriteHeroesByUser(req.user.id);
    const mapped = favorites.map((f) => ({
      id: f.hero_id,
      nombre: f.nombre_heroe,
      poder: f.poder_principal,
      fortaleza: f.fortaleza,
      resistencia: f.resistencia,
      debilidad: f.debilidad,
      imagen_url: f.imagen_url,
      esFavorito: true,
    }));
    return res.json(mapped);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al listar favoritos", detalle: String(error) });
  }
};

export const addFavoriteController = async (
  req: RequestWithUser,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    const heroId = Number(req.params.heroId ?? req.body.heroId ?? req.body.heroeId);

    if (!Number.isInteger(heroId) || heroId <= 0) {
      return res.status(400).json({ mensaje: "heroId invalido" });
    }

    const hero = await getHeroById(heroId);
    if (!hero) {
      return res.status(404).json({ mensaje: "Heroe no encontrado" });
    }

    const id = await addFavorite(req.user.id, heroId);
    return res.status(201).json({ mensaje: "Favorito agregado", id });
  } catch (error) {
    const message = String(error);
    if (message.includes("favorites_user_id_hero_id_unique")) {
      return res
        .status(409)
        .json({ mensaje: "Ese heroe ya esta en favoritos" });
    }

    return res
      .status(500)
      .json({ mensaje: "Error al agregar favorito", detalle: message });
  }
};

export const removeFavoriteController = async (
  req: RequestWithUser,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    const heroId = Number(req.params.heroId ?? req.params.heroeId);

    if (!Number.isInteger(heroId) || heroId <= 0) {
      return res.status(400).json({ mensaje: "heroId invalido" });
    }

    const deletedRows = await removeFavorite(req.user.id, heroId);

    if (!deletedRows) {
      return res.status(404).json({ mensaje: "Favorito no encontrado" });
    }

    return res.json({ mensaje: "Favorito eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al eliminar favorito", detalle: String(error) });
  }
};
