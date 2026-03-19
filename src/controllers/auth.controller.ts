import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/users";

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ mensaje: "nombre, email y password son requeridos" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ mensaje: "El correo ya esta registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser({
      nombre,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ mensaje: "Usuario creado", id: userId });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al registrar usuario", detalle: String(error) });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ mensaje: "email y password son requeridos" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ mensaje: "Credenciales invalidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ mensaje: "Credenciales invalidas" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res
        .status(500)
        .json({ mensaje: "JWT_SECRET no esta configurado" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "8h",
    });

    return res.json({
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ mensaje: "Error al iniciar sesion", detalle: String(error) });
  }
};
