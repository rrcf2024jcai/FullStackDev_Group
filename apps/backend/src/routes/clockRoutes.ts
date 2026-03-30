import { Router } from "express";
import { validate } from "../middleware/validateClock.js";
import { clockInSchema, clockOutSchema } from "../validation/clock.schema.js";
import * as clockController from "../controllers/clockController.js";

const router = Router();

router.post("/clock-in", validate(clockInSchema), clockController.clockIn);
router.post("/clock-out", validate(clockOutSchema), clockController.clockOut);
router.get("/log/:employeeId", clockController.getLog);

export default router;