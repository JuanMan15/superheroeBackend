import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type RequestWithUser = Request & {
  user?: { id: number; email: string };
};

const isAuthPayload = (
  value: unknown,
): value is { id: number; email: string } => {
  if (!value || typeof value !== "object") return false;
  const payload = value as { id?: unknown; email?: unknown };
  return typeof payload.id === "number" && typeof payload.email === "string";
};

export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ mensaje: "JWT_SECRET no esta configurado" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (!isAuthPayload(decoded)) {
      return res.status(401).json({ mensaje: "Token invalido" });
    }

    const payload = decoded;
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (_error) {
    return res.status(401).json({ mensaje: "Token invalido o expirado" });
  }
};
