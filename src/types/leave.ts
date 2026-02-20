/**
 * Defines the structure for a Leave Request.
 */
export interface LeaveRequest {
    id: number;
    type: string;
    date: string;
    reason: string;
}