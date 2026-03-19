"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const users_1 = require("../models/users");
const getProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ mensaje: "No autenticado" });
        }
        const user = await (0, users_1.findUserById)(req.user.id);
        if (!user) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        return res.json({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            created_at: user.created_at,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ mensaje: "Error al obtener perfil", detalle: String(error) });
    }
};
exports.getProfile = getProfile;
