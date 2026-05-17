import { Router } from "express";
import {
  catalogController,
  createHeroController,
  deleteHeroController,
  getHero,
  listHeroes,
  updateHeroController,
} from "../controllers/hero.controller";
import {
  addFavoriteController,
  listMyFavorites,
  removeFavoriteController,
} from "../controllers/favorite.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/catalog", catalogController);
router.get("/", listHeroes);

router.get("/favorites", authMiddleware, listMyFavorites);
router.post("/favorites", authMiddleware, addFavoriteController);
router.delete("/favorites/:heroeId", authMiddleware, removeFavoriteController);

router.get("/:id", getHero);
router.post("/", authMiddleware, createHeroController);
router.put("/:id", authMiddleware, updateHeroController);
router.delete("/:id", authMiddleware, deleteHeroController);

export default router;
