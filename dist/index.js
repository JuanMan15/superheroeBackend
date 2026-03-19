"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const favorite_routes_1 = __importDefault(require("./routes/favorite.routes"));
const hero_routes_1 = __importDefault(require("./routes/hero.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.get("/home", (req, res) => {
    res.json({ mensaje: "entrando a la pagina!" });
});
app.get("/saludo", (req, res) => {
    const { nombre, edad } = req.query;
    res.json({ mensaje: `Hola, ${nombre}! Tienes ${edad} años.` });
});
app.use("/auth", auth_routes_1.default);
app.use("/heroes", hero_routes_1.default);
app.use("/favorites", favorite_routes_1.default);
app.use("/users", user_routes_1.default);
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
