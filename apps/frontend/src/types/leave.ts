/**
 * Mirrors the LeaveRequest model in the Prisma schema.
 * startDate / endDate are ISO strings when received from the API.
 */
export interface LeaveRequest {
    id: number;
    employeeId: number;
    startDate: string;
    endDate: string;
    type: string;
    reason: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    employee?: { firstName: string; lastName: string };
}