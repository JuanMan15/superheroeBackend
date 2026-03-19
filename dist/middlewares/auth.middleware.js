"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthPayload = (value) => {
    if (!value || typeof value !== "object")
        return false;
    const payload = value;
    return typeof payload.id === "number" && typeof payload.email === "string";
};
const authMiddleware = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!isAuthPayload(decoded)) {
            return res.status(401).json({ mensaje: "Token invalido" });
        }
        const payload = decoded;
        req.user = { id: payload.id, email: payload.email };
        next();
    }
    catch (_error) {
        return res.status(401).json({ mensaje: "Token invalido o expirado" });
    }
};
exports.authMiddleware = authMiddleware;
