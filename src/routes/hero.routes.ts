import { Router } from "express";
import {
  createHeroController,
  deleteHeroController,
  getHero,
  listHeroes,
  updateHeroController,
} from "../controllers/hero.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", listHeroes);
router.get("/:id", getHero);
router.post("/", authMiddleware, createHeroController);
router.put("/:id", authMiddleware, updateHeroController);
router.delete("/:id", authMiddleware, deleteHeroController);

export default router;
