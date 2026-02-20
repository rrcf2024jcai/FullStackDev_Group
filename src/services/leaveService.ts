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