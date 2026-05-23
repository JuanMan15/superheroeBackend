import { Router } from "express";
import { exportHeroesToExcel } from "../controllers/export.controller";

const router = Router();

router.get("/excel", exportHeroesToExcel);

export default router;
