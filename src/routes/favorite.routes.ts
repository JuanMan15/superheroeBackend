import { Router } from "express";
import {
  addFavoriteController,
  listMyFavorites,
  removeFavoriteController,
} from "../controllers/favorite.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/my", authMiddleware, listMyFavorites);
router.post("/:heroId", authMiddleware, addFavoriteController);
router.delete("/:heroId", authMiddleware, removeFavoriteController);

export default router;
