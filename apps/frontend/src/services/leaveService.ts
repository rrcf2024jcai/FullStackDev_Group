import * as LeaveRepo from "../apis/leaveRepo";
import { LeaveRequest } from "../types/leave";

/**
 * Handles the business logic of the Leave Requests feature.
 * Acts as a bridge between the UI/Hook and the Data Repository.
 */

/**
 * validateLeaveRequest checks all form fields before a network call is made.
 */
export function validateLeaveRequest(
    startDate: string,
    endDate: string,
    reason: string
): { isValid: boolean; errors: string[] } {
    let isValid = true;
    const errors: string[] = [];

    if (!startDate || !endDate) {
        isValid = false;
        errors.push("Please fill in both the start date and end date.");
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        isValid = false;
        errors.push("Start date must not be after end date.");
    }

    if (reason.trim().length === 0) {
        isValid = false;
        errors.push("Please provide a reason.");
    } else if (reason.trim().length < 4) {
        isValid = false;
        errors.push("Reason is too short. Please provide more details.");
    }

    return { isValid, errors };
}

/**
 * Builds the leave request payload that will be sent to the repository.
 */
export function createLeaveObject(
    type: string,
    startDate: string,
    endDate: string,
    reason: string
): Omit<LeaveRequest, "id" | "status" | "createdAt" | "updatedAt" | "employeeId"> {
    return {
        type,
        startDate,
        endDate,
        reason: reason.trim(),
    };
}

/**
 * Fetches all leave requests from the backend.
 * Updated to accept and pass the token
 */
export async function fetchAllLeaves(token: string): Promise<LeaveRequest[]> {
    return await LeaveRepo.fetchLeaveRequests(token);
}

/**
 * Submits a new leave request to the backend.
 * Updated to accept and pass the token
 */
export async function submitNewRequest(
    request: Omit<LeaveRequest, "id" | "status" | "createdAt" | "updatedAt" | "employeeId">,
    token: string
): Promise<void> {
    await LeaveRepo.addLeaveRequest(request, token);
}

/**
 * Removes a request by ID.
 * Updated to accept and pass the token
 */
export async function removeRequest(id: number, token: string): Promise<void> {
    await LeaveRepo.deleteLeaveRequest(id, token);
}
