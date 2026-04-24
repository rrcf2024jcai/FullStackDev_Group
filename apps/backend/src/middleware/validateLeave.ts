import { Request, Response, NextFunction } from "express";

/**
 * Middleware that validates the request body before creating a leave request.
 * Mirrors the pattern used in validateEmployee.ts.
 */
export function validateLeave(req: Request, res: Response, next: NextFunction) {
    const { startDate, endDate, type, reason } = req.body;
    const errors: string[] = [];

    // employeeId is intentionally NOT validated here — the controller resolves
    // it from the Clerk session token so the client never needs to send it.

    if (!startDate) {
        errors.push("startDate is required.");
    }

    if (!endDate) {
        errors.push("endDate is required.");
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        errors.push("startDate must not be after endDate.");
    }

    const allowedTypes = ["Vacation", "Sick Leave", "Personal"];
    if (!type || !allowedTypes.includes(type)) {
        errors.push(`type must be one of: ${allowedTypes.join(", ")}.`);
    }

    if (!reason || reason.trim().length < 4) {
        errors.push("reason must be at least 4 characters.");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    next();
}
