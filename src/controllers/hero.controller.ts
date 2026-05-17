import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  createHero,
  deleteHero,
  getAllHeroes,
  getHeroById,
  updateHero,
} from "../models/CatSuperheroe";
import { listFavoritesByUser } from "../models/Favorite";

const extractUserId = (req: Request): number | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  if (!token) return null;
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;
  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: number };
    return decoded.id ?? null;
  } catch {
    return null;
  }
};

export const catalogController = async (req: Request, res: Response) => {
  try {
    const heroes = await getAllHeroes();
    const userId = extractUserId(req);

    let favoriteIds: Set<number> = new Set();
    if (userId) {
      const favorites = await listFavoritesByUser(userId);
      favoriteIds = new Set(favorites.map((f) => f.hero_id));
    }

    const mapped = heroes.map((h) => ({
      id: h.id,
      nombre: h.nombre_heroe,
      poder: h.poder_principal,
      fortaleza: h.fortaleza,
      resistencia: h.resistencia,
      debilidad: h.debilidad,
      imagen_url: h.imagen_url,
      esFavorito: favoriteIds.has(h.id),
    }));
    return res.json(mapped);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al listar catalogo", detalle: String(error) });
  }
};

export const listHeroes = async (_req: Request, res: Response) => {
  try {
    const heroes = await getAllHeroes();
    return res.json(heroes);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al listar heroes", detalle: String(error) });
  }
};

export const getHero = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const hero = await getHeroById(id);

    if (!hero) {
      return res.status(404).json({ mensaje: "Heroe no encontrado" });
    }

    return res.json(hero);
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al obtener heroe", detalle: String(error) });
  }
};

export const createHeroController = async (req: Request, res: Response) => {
  try {
    const {
      nombre_heroe,
      nombre_real,
      universo,
      poder_principal,
      nombre,
      poder,
      fortaleza,
      resistencia,
      debilidad,
      imagen_url,
    } = req.body;

    const heroName = nombre_heroe || nombre;
    const power = poder_principal || poder;

    if (!heroName || !power) {
      return res
        .status(400)
        .json({ mensaje: "nombre y poder son requeridos" });
    }

    const id = await createHero({
      nombre_heroe: heroName,
      nombre_real: nombre_real || heroName,
      universo: universo || "General",
      poder_principal: power,
      fortaleza,
      resistencia,
      debilidad,
      imagen_url,
    });
    return res.status(201).json({ mensaje: "Heroe creado", id });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al crear heroe", detalle: String(error) });
  }
};

export const updateHeroController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedRows = await updateHero(id, req.body);

    if (!updatedRows) {
      return res.status(404).json({ mensaje: "Heroe no encontrado" });
    }

    return res.json({ mensaje: "Heroe actualizado" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al actualizar heroe", detalle: String(error) });
  }
};

export const deleteHeroController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedRows = await deleteHero(id);

    if (!deletedRows) {
      return res.status(404).json({ mensaje: "Heroe no encontrado" });
    }

    return res.json({ mensaje: "Heroe eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al eliminar heroe", detalle: String(error) });
  }
};
