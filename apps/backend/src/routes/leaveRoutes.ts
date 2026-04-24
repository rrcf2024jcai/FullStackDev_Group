import { Router } from "express";
import * as leaveController from "../controllers/leaveController";
import { validateLeave } from "../middleware/validateLeave";
import { requireAuth } from '@clerk/express';

const router = Router();

// GET    /api/leave        
router.get("/", requireAuth(), leaveController.getAll);

// POST   /api/leave        
router.post("/", requireAuth(), validateLeave, leaveController.create);

// PATCH  /api/leave/:id/status
router.patch("/:id/status", requireAuth(), leaveController.updateStatus);

// DELETE /api/leave/:id 
router.delete("/:id", requireAuth(), leaveController.remove);

export default router;