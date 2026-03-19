"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.listFavoriteHeroesByUser = exports.listFavoritesByUser = exports.addFavorite = void 0;
const database_1 = __importDefault(require("../database"));
const addFavorite = async (userId, heroId) => {
    const [row] = await (0, database_1.default)("favorites")
        .insert({ user_id: userId, hero_id: heroId })
        .returning("id");
    const id = typeof row === "number" ? row : row.id;
    return Number(id);
};
exports.addFavorite = addFavorite;
const listFavoritesByUser = async (userId) => {
    return (0, database_1.default)("favorites")
        .where({ user_id: userId })
        .orderBy("id", "asc");
};
exports.listFavoritesByUser = listFavoritesByUser;
const listFavoriteHeroesByUser = async (userId) => {
    return (0, database_1.default)("favorites as f")
        .join("cat_superheroes as h", "h.id", "f.hero_id")
        .where("f.user_id", userId)
        .select("f.id", "f.user_id", "f.hero_id", "f.created_at", "h.nombre_heroe", "h.nombre_real", "h.universo", "h.poder_principal", "h.fortaleza", "h.resistencia", "h.debilidad", "h.imagen_url")
        .orderBy("f.id", "asc");
};
exports.listFavoriteHeroesByUser = listFavoriteHeroesByUser;
const removeFavorite = async (userId, heroId) => {
    return (0, database_1.default)("favorites").where({ user_id: userId, hero_id: heroId }).del();
};
exports.removeFavorite = removeFavorite;
