"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserById = exports.findUserByEmail = void 0;
const database_1 = __importDefault(require("../database"));
const findUserByEmail = async (email) => {
    return (0, database_1.default)("users").where({ email }).first();
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    return (0, database_1.default)("users").where({ id }).first();
};
exports.findUserById = findUserById;
const createUser = async (payload) => {
    const [row] = await (0, database_1.default)("users").insert(payload).returning("id");
    const id = typeof row === "number" ? row : row.id;
    return Number(id);
};
exports.createUser = createUser;
