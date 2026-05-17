import { Router } from "express";
import { getProfile } from "../controllers/user.controller";
import { register } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", register);
router.get("/profile", authMiddleware, getProfile);

export default router;
