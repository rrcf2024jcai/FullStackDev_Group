import { Request, Response, NextFunction } from "express";
import * as leaveService from "../services/leaveService";
import { getAuth } from "@clerk/express"; 

/**
 * GET /api/leave
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = getAuth(req); 
        
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const leaves = await leaveService.getAllLeaveRequests(userId);
        res.json(leaves);
    } catch (err) {
        next(err);
    }
}

/**
 * POST /api/leave
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = getAuth(req); 
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        console.log("My Clerk is :", userId);

        const { startDate, endDate, type, reason } = req.body; 
        
        const leave = await leaveService.createLeaveRequest({
            clerkUserId: userId, 
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
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const id = parseInt(req.params.id);
        
        await leaveService.deleteLeaveRequest(id, userId); 
        res.json({ message: "Leave request deleted." });
    } catch (err) {
        next(err);
    }
}