import { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateEmployee } from "../middleware/validateEmployee";

const router = Router();

router.get("/", employeeController.getAll);
router.post("/", validateEmployee, employeeController.add);
router.delete("/:id", employeeController.remove);

export default router;