import { Request, Response } from "express";
import {
  createHero,
  deleteHero,
  getAllHeroes,
  getHeroById,
  updateHero,
} from "../models/CatSuperheroe";

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
      fortaleza,
      resistencia,
      debilidad,
      imagen_url,
    } = req.body;

    if (!nombre_heroe || !nombre_real || !universo || !poder_principal) {
      return res
        .status(400)
        .json({ mensaje: "Todos los campos del heroe son requeridos" });
    }

    const id = await createHero({
      nombre_heroe,
      nombre_real,
      universo,
      poder_principal,
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
