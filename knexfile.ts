import dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL?.trim();
const dbPassword = process.env.DB_PASSWORD;

if (!databaseUrl && (!dbPassword || dbPassword.trim() === "")) {
  throw new Error(
    "Falta DB_PASSWORD en .env (o define DATABASE_URL completa). PostgreSQL con SCRAM requiere password no vacio.",
  );
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: databaseUrl
      ? databaseUrl
      : {
          host: process.env.DB_HOST || "localhost",
          user: process.env.DB_USER || "postgres",
          password: String(process.env.DB_PASSWORD || ""),
          database: process.env.DB_NAME || "superheroedb",
          port: Number(process.env.DB_PORT || 5432),
        },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./db/seeds",
      extension: "ts",
    },
  },
  production: {
    client: "pg",
    connection: (databaseUrl || process.env.DATABASE_URL) as string,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./db/seeds",
      extension: "ts",
    },
  },
};

module.exports = config;
