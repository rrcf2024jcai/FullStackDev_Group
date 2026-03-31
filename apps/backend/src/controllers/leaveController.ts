import { Request, Response, NextFunction } from "express";
import * as leaveService from "../services/leaveService";

/**
 * GET /api/leave
 * Returns all leave requests, newest first.
 */
export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const leaves = await leaveService.getAllLeaveRequests();
        res.json(leaves);
    } catch (err) {
        next(err);
    }
}

/**
 * POST /api/leave
 * Creates a new leave request. Body is validated by validateLeave middleware.
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { employeeId, startDate, endDate, type, reason } = req.body;
        const leave = await leaveService.createLeaveRequest({
            employeeId: Number(employeeId),
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
 * Updates only the status field of an existing leave request.
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
 * Removes a leave request permanently.
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id);
        await leaveService.deleteLeaveRequest(id);
        res.json({ message: "Leave request deleted." });
    } catch (err) {
        next(err);
    }
}
