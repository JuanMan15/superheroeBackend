import dotenv from "dotenv";
import knex, { Knex } from "knex";

dotenv.config();

const { DATABASE_URL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } =
  process.env;

if (!DATABASE_URL && (!DB_HOST || !DB_USER || !DB_NAME)) {
  throw new Error(
    "Faltan variables de entorno de base de datos. Usa DATABASE_URL o DB_HOST/DB_USER/DB_NAME",
  );
}

const fallbackConnection = {
  host: DB_HOST as string,
  user: DB_USER as string,
  password: DB_PASSWORD || "",
  database: DB_NAME as string,
  port: Number(DB_PORT || 5432),
};

const config: Knex.Config = {
  client: "pg",
  connection: DATABASE_URL || fallbackConnection,
  pool: { min: 0, max: 10 },
};

const db = knex(config);

export default db;
