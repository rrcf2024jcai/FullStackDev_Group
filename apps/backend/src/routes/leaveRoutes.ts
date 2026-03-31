import { Router } from "express";
import * as leaveController from "../controllers/leaveController";
import { validateLeave } from "../middleware/validateLeave";

const router = Router();

// GET    /api/leave           — fetch all leave requests
router.get("/", leaveController.getAll);

// POST   /api/leave           — submit a new leave request (validated)
router.post("/", validateLeave, leaveController.create);

// PATCH  /api/leave/:id/status — approve or reject a request
router.patch("/:id/status", leaveController.updateStatus);

// DELETE /api/leave/:id       — remove a leave request
router.delete("/:id", leaveController.remove);

export default router;
