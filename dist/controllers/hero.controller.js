"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroController = exports.updateHeroController = exports.createHeroController = exports.getHero = exports.listHeroes = void 0;
const CatSuperheroe_1 = require("../models/CatSuperheroe");
const listHeroes = async (_req, res) => {
    try {
        const heroes = await (0, CatSuperheroe_1.getAllHeroes)();
        return res.json(heroes);
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al listar heroes", detalle: String(error) });
    }
};
exports.listHeroes = listHeroes;
const getHero = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const hero = await (0, CatSuperheroe_1.getHeroById)(id);
        if (!hero) {
            return res.status(404).json({ mensaje: "Heroe no encontrado" });
        }
        return res.json(hero);
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al obtener heroe", detalle: String(error) });
    }
};
exports.getHero = getHero;
const createHeroController = async (req, res) => {
    try {
        const { nombre_heroe, nombre_real, universo, poder_principal, fortaleza, resistencia, debilidad, imagen_url, } = req.body;
        if (!nombre_heroe || !nombre_real || !universo || !poder_principal) {
            return res
                .status(400)
                .json({ mensaje: "Todos los campos del heroe son requeridos" });
        }
        const id = await (0, CatSuperheroe_1.createHero)({
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
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al crear heroe", detalle: String(error) });
    }
};
exports.createHeroController = createHeroController;
const updateHeroController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedRows = await (0, CatSuperheroe_1.updateHero)(id, req.body);
        if (!updatedRows) {
            return res.status(404).json({ mensaje: "Heroe no encontrado" });
        }
        return res.json({ mensaje: "Heroe actualizado" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al actualizar heroe", detalle: String(error) });
    }
};
exports.updateHeroController = updateHeroController;
const deleteHeroController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const deletedRows = await (0, CatSuperheroe_1.deleteHero)(id);
        if (!deletedRows) {
            return res.status(404).json({ mensaje: "Heroe no encontrado" });
        }
        return res.json({ mensaje: "Heroe eliminado" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al eliminar heroe", detalle: String(error) });
    }
};
exports.deleteHeroController = deleteHeroController;
