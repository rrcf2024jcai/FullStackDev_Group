import * as LeaveRepo from "../apis/leaveRepo";
import { LeaveRequest } from "../types/leave";

// As a service, validateLeaveRequest handles the business logic of leave forms.
// It determines if a request has valid dates and reasons.
export function validateLeaveRequest(date: string, reason: string): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    //Fields cannot be empty
    if (!date || !reason.trim()) {
        isValid = false;
        errors.push("Please fill in the date and reason!");
    }

    //Reason must be meaningful
    if (reason.trim().length > 0 && reason.trim().length < 4) {
        isValid = false;
        errors.push("Reason is too short. Please provide more details.");
    }

    return { isValid, errors };
}

//Format the data before sending it to Repository or State
export function createLeaveObject(type: string, date: string, reason: string): LeaveRequest {
    return {
        id: Date.now(), // Generate a simple ID
        type: type,
        date: date,
        reason: reason.trim()
    };
}

/**
 * Data Access Delegation
 * The Service layer acts as a bridge between the Controller and the Repository.
 */

export async function fetchAllLeaves(): Promise<LeaveRequest[]> {
    // Business logic could be added 
    const data = LeaveRepo.fetchLeaveRequests();
    return data;
}

export async function submitNewRequest(request: LeaveRequest): Promise<void> {
    // We could add check logic here before saving
    await LeaveRepo.addLeaveRequest(request);
}

export async function removeRequest(id: number): Promise<void> {
    await LeaveRepo.deleteLeaveRequest(id);
}