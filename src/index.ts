import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import exportRoutes from "./routes/export.routes";
import favoriteRoutes from "./routes/favorite.routes";
import heroRoutes from "./routes/hero.routes";
import userRoutes from "./routes/user.routes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.get("/home", (req, res) => {
  res.json({ mensaje: "entrando a la pagina!" });
});

app.get("/saludo", (req, res) => {
  const { nombre, edad } = req.query;
  res.json({ mensaje: `Hola, ${nombre}! Tienes ${edad} años.` });
});

app.use("/api/auth", authRoutes);
app.use("/api/heroes", heroRoutes);
app.use("/api/heroes/export", exportRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/users", userRoutes);

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
