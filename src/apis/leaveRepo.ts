import { LeaveRequest } from "../types/leave";
import { leaveData } from "./mockLeaveData";

// Get all leave requests
export function fetchLeaveRequests(): LeaveRequest[] {
    return leaveData;}

// Add a new leave request
export async function addLeaveRequest(request: LeaveRequest): Promise<LeaveRequest> {
    leaveData.push(request);
    return request;
}

// Delete a leave request by ID
export async function deleteLeaveRequest(id: number): Promise<void> {
    const index = leaveData.findIndex(item => item.id === id);
    if (index !== -1) {
        leaveData.splice(index, 1);
    } else {
        throw new Error(`Failed to delete request with id ${id}: Not found.`);
    }
}