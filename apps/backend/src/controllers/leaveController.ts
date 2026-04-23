import { Request, Response, NextFunction } from "express";
import * as leaveService from "../services/leaveService";

/**
 * GET /api/leave
 * 🛡️ Updated for Sprint 5: Only return leaves for the logged-in user.
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const clerkUserId = (req as any).auth.userId; 

        const leaves = await leaveService.getAllLeaveRequests(clerkUserId);
        res.json(leaves);
    } catch (err) {
        next(err);
    }
}

/**
 * POST /api/leave
 * Updated for Sprint 5: Create request tied to the logged-in user.
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const clerkUserId = (req as any).auth.userId;
        const { startDate, endDate, type, reason } = req.body; 
        
        const leave = await leaveService.createLeaveRequest({
            clerkUserId, 
            startDate,
            endDate,
            type,
            reason,
        });
        res.status(201).json(leave);
    } catch (err) {
        next(err);
    }
}

/**
 * PATCH /api/leave/:id/status
 */
export async function updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;
        const updated = await leaveService.updateLeaveStatus(id, status);
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

/**
 * DELETE /api/leave/:id
 * 🛡️ Updated for Sprint 5: Ensure only the user who created it can delete it.
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const clerkUserId = (req as any).auth.userId;
        const id = parseInt(req.params.id);
        
        await leaveService.deleteLeaveRequest(id, clerkUserId); 
        res.json({ message: "Leave request deleted." });
    } catch (err) {
        next(err);
    }
}