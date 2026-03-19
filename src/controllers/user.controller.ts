import { Response } from "express";
import { RequestWithUser } from "../middlewares/auth.middleware";
import { findUserById } from "../models/users";

export const getProfile = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      created_at: user.created_at,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al obtener perfil", detalle: String(error) });
  }
};
