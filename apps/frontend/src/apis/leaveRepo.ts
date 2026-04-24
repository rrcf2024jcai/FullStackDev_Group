import { LeaveRequest } from "../types/leave";

const API_URL = "http://localhost:3000/api/leave";

/**
 * GET /api/leave
 * Fetches all leave requests from the backend database.
 * requires a Clerk session token.
 */
export async function fetchLeaveRequests(token: string): Promise<LeaveRequest[]> {
    const res = await fetch(API_URL, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // This passes the Clerk token to the backend
        }
    });
    if (!res.ok) throw new Error("Failed to fetch leave requests.");
    return res.json();
}

/**
 * POST /api/leave
 * Sends a new leave request to the backend.
 * Added token parameter.
 */
export async function addLeaveRequest(
    request: Omit<LeaveRequest, "id" | "status" | "createdAt" | "updatedAt" | "employeeId">,
    token: string
): Promise<LeaveRequest> {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(request),
    });
    if (!res.ok) {
        const body = await res.json();
        // backend returns { errors: string[] } from middleware or { error: string } from service
        const msg = body.errors?.[0] ?? body.error ?? "Failed to submit leave request.";
        throw new Error(msg);
    }
    return res.json();
}

/**
 * DELETE /api/leave/:id
 * Permanently removes a leave request from the database.
 * Added token parameter.
 */
export async function deleteLeaveRequest(id: number, token: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { 
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error(`Failed to delete leave request with id ${id}.`);
}