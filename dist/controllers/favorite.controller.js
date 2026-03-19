"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteController = exports.addFavoriteController = exports.listMyFavorites = void 0;
const Favorite_1 = require("../models/Favorite");
const CatSuperheroe_1 = require("../models/CatSuperheroe");
const listMyFavorites = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ mensaje: "No autenticado" });
        }
        const favorites = await (0, Favorite_1.listFavoriteHeroesByUser)(req.user.id);
        return res.json(favorites);
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al listar favoritos", detalle: String(error) });
    }
};
exports.listMyFavorites = listMyFavorites;
const addFavoriteController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ mensaje: "No autenticado" });
        }
        const heroId = Number(req.params.heroId);
        if (!Number.isInteger(heroId) || heroId <= 0) {
            return res.status(400).json({ mensaje: "heroId invalido" });
        }
        const hero = await (0, CatSuperheroe_1.getHeroById)(heroId);
        if (!hero) {
            return res.status(404).json({ mensaje: "Heroe no encontrado" });
        }
        const id = await (0, Favorite_1.addFavorite)(req.user.id, heroId);
        return res.status(201).json({ mensaje: "Favorito agregado", id });
    }
    catch (error) {
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
exports.addFavoriteController = addFavoriteController;
const removeFavoriteController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ mensaje: "No autenticado" });
        }
        const heroId = Number(req.params.heroId);
        if (!Number.isInteger(heroId) || heroId <= 0) {
            return res.status(400).json({ mensaje: "heroId invalido" });
        }
        const deletedRows = await (0, Favorite_1.removeFavorite)(req.user.id, heroId);
        if (!deletedRows) {
            return res.status(404).json({ mensaje: "Favorito no encontrado" });
        }
        return res.json({ mensaje: "Favorito eliminado" });
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al eliminar favorito", detalle: String(error) });
    }
};
exports.removeFavoriteController = removeFavoriteController;
