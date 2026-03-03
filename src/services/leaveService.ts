import * as LeaveRepo from "../apis/leaveRepo";
import { LeaveRequest } from "../types/leave";

/**
 * handles the business logic of the Leave Requests feature.
 * It acts as a bridge between the UI/Hook and the Data Repository.
 */

// validateLeaveRequest handles the business logic of form validation.
export function validateLeaveRequest(date: string, reason: string): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    // Business Logic: Fields cannot be empty
    if (!date || !reason.trim()) {
        isValid = false;
        errors.push("Please fill in the date and reason!");
    }

    // Business Logic: Reason must be meaningful
    if (reason.trim().length > 0 && reason.trim().length < 4) {
        isValid = false;
        errors.push("Reason is too short. Please provide more details.");
    }

    return { isValid, errors };
}

// Business Logic: Format the data before sending it to Repository
export function createLeaveObject(type: string, date: string, reason: string): LeaveRequest {
    return {
        id: Date.now(), // Simple ID generation
        type: type,
        date: date,
        reason: reason.trim()
    };
}

/**
 * Fetches all leave requests from the repository.
 * @returns Promise<LeaveRequest[]>
 */
export async function fetchAllLeaves(): Promise<LeaveRequest[]> {
    // We could add logic here (e.g. sorting by date) before returning
    const data = LeaveRepo.fetchLeaveRequests();
    return data;
}

/**
 * Submits a new leave request to the repository.
 */
export async function submitNewRequest(request: LeaveRequest): Promise<void> {
    // We simply delegate to the repo, but in a real app we might check for duplicates here
    await LeaveRepo.addLeaveRequest(request);
}

/**
 * Removes a request by ID.
 */
export async function removeRequest(id: number): Promise<void> {
    await LeaveRepo.deleteLeaveRequest(id);
}