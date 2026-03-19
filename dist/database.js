"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const knex_1 = __importDefault(require("knex"));
dotenv_1.default.config();
const { DATABASE_URL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;
if (!DATABASE_URL && (!DB_HOST || !DB_USER || !DB_NAME)) {
    throw new Error("Faltan variables de entorno de base de datos. Usa DATABASE_URL o DB_HOST/DB_USER/DB_NAME");
}
const fallbackConnection = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD || "",
    database: DB_NAME,
    port: Number(DB_PORT || 5432),
};
const config = {
    client: "pg",
    connection: DATABASE_URL || fallbackConnection,
    pool: { min: 0, max: 10 },
};
const db = (0, knex_1.default)(config);
exports.default = db;
