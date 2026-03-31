console.log(">>> CLOCK ROUTES LOADED <<<");

import { Router } from "express";
import * as clockController from "../controllers/clockController";

const router = Router();

router.post("/in", clockController.clockIn);
router.post("/out", clockController.clockOut);
router.get("/:employeeId", clockController.getLog);

export default router;