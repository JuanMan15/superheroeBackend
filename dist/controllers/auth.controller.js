"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        if (!nombre || !email || !password) {
            return res
                .status(400)
                .json({ mensaje: "nombre, email y password son requeridos" });
        }
        const existingUser = await (0, users_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(409).json({ mensaje: "El correo ya esta registrado" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const userId = await (0, users_1.createUser)({
            nombre,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({ mensaje: "Usuario creado", id: userId });
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al registrar usuario", detalle: String(error) });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ mensaje: "email y password son requeridos" });
        }
        const user = await (0, users_1.findUserByEmail)(email);
        if (!user) {
            return res.status(401).json({ mensaje: "Credenciales invalidas" });
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ mensaje: "Credenciales invalidas" });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res
                .status(500)
                .json({ mensaje: "JWT_SECRET no esta configurado" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwtSecret, {
            expiresIn: "8h",
        });
        return res.json({
            token,
            user: { id: user.id, nombre: user.nombre, email: user.email },
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al iniciar sesion", detalle: String(error) });
    }
};
exports.login = login;
