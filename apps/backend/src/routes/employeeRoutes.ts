import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as employeeController from "../controllers/employeeController";
import { validateEmployee } from "../middleware/validateEmployee";

const router = Router();

router.get("/", employeeController.getAll);
router.post("/", requireAuth(), validateEmployee, employeeController.add);
router.delete("/:id", requireAuth(), employeeController.remove);

export default router;