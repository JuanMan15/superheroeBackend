"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHero = exports.updateHero = exports.createHero = exports.getHeroById = exports.getAllHeroes = void 0;
const database_1 = __importDefault(require("../database"));
const getAllHeroes = async () => {
    return (0, database_1.default)("cat_superheroes").select("*").orderBy("id", "asc");
};
exports.getAllHeroes = getAllHeroes;
const getHeroById = async (id) => {
    return (0, database_1.default)("cat_superheroes").where({ id }).first();
};
exports.getHeroById = getHeroById;
const createHero = async (payload) => {
    const [row] = await (0, database_1.default)("cat_superheroes").insert(payload).returning("id");
    const id = typeof row === "number" ? row : row.id;
    return Number(id);
};
exports.createHero = createHero;
const updateHero = async (id, payload) => {
    return (0, database_1.default)("cat_superheroes").where({ id }).update(payload);
};
exports.updateHero = updateHero;
const deleteHero = async (id) => {
    return (0, database_1.default)("cat_superheroes").where({ id }).del();
};
exports.deleteHero = deleteHero;
