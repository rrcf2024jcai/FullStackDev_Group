import prisma from "../prisma/prisma";

/**
 * Fetches all leave requests from the database, newest first.
 * Includes the related employee name for display purposes.
 */
export async function getAllLeaveRequests() {
    return await prisma.leaveRequest.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            employee: {
                select: { firstName: true, lastName: true },
            },
        },
    });
}

/**
 * Creates a new leave request record.
 * startDate / endDate arrive as ISO date strings from the request body
 * and are converted to Date objects for Prisma.
 */
export async function createLeaveRequest(data: {
    employeeId: number;
    startDate: string;
    endDate: string;
    type: string;
    reason: string;
}) {
    return await prisma.leaveRequest.create({
        data: {
            employeeId: data.employeeId,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            type: data.type,
            reason: data.reason,
            status: "Pending",
        },
    });
}

/**
 * Updates the approval status of a leave request (e.g. Pending → Approved / Rejected).
 */
export async function updateLeaveStatus(id: number, status: string) {
    return await prisma.leaveRequest.update({
        where: { id },
        data: { status },
    });
}

/**
 * Permanently removes a leave request by ID.
 */
export async function deleteLeaveRequest(id: number) {
    return await prisma.leaveRequest.delete({ where: { id } });
}
