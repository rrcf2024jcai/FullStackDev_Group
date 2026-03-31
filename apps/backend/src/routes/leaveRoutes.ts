import { Router } from "express";
import * as leaveController from "../controllers/leaveController";
import { validateLeave } from "../middleware/validateLeave";

const router = Router();

// GET    /api/leave        
router.get("/", leaveController.getAll);

// POST   /api/leave        
router.post("/", validateLeave, leaveController.create);

// PATCH  /api/leave/:id/status
router.patch("/:id/status", leaveController.updateStatus);

// DELETE /api/leave/:id 
router.delete("/:id", leaveController.remove);

export default router;
