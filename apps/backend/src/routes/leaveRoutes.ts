import { Router } from "express";
import * as leaveController from "../controllers/leaveController";
import { validateLeave } from "../middleware/validateLeave";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-nodejs'

const router = Router();

// GET    /api/leave        
router.get("/", ClerkExpressRequireAuth(), leaveController.getAll);

// POST   /api/leave        
router.post("/", ClerkExpressRequireAuth(), validateLeave, leaveController.create);

// PATCH  /api/leave/:id/status
router.patch("/:id/status", ClerkExpressRequireAuth(), leaveController.updateStatus);

// DELETE /api/leave/:id 
router.delete("/:id", ClerkExpressRequireAuth(), leaveController.remove);

export default router;