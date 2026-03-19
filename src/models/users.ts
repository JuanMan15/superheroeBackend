import db from "../database";

export type UserRecord = {
  id: number;
  nombre: string;
  email: string;
  password: string;
  created_at: Date;
};

export const findUserByEmail = async (
  email: string,
): Promise<UserRecord | undefined> => {
  return db<UserRecord>("users").where({ email }).first();
};

export const findUserById = async (
  id: number,
): Promise<UserRecord | undefined> => {
  return db<UserRecord>("users").where({ id }).first();
};

export const createUser = async (payload: {
  nombre: string;
  email: string;
  password: string;
}): Promise<number> => {
  const [row] = await db("users").insert(payload).returning("id");
  const id = typeof row === "number" ? row : row.id;
  return Number(id);
};
