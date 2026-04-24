import prisma from "../prisma/prisma";

/**
 * Fetches leave requests for ONLY the logged-in user.
 */
export async function getAllLeaveRequests(clerkUserId: string) {
    // 1. Find the local user using the Clerk ID
    const user = await prisma.user.findUnique({
        where: { clerkId: clerkUserId },
    });

    // If no user is found, or they don't have an employeeId yet, return empty array
    if (!user || !user.employeeId) {
        return [];
    }

    // 2. Fetch only the leaves belonging to this specific employee
    return await prisma.leaveRequest.findMany({
        where: { employeeId: user.employeeId },
        orderBy: { createdAt: "desc" },
        include: {
            employee: {
                select: { firstName: true, lastName: true },
            },
        },
    });
}

/**
 * Creates a new leave request record for the logged-in user.
 * Updated for Sprint 5 I.1
 */
export async function createLeaveRequest(data: {
    clerkUserId: string;
    startDate: string;
    endDate: string;
    type: string;
    reason: string;
}) {
    // 1. Find the employee ID linked to this Clerk account
    const user = await prisma.user.findUnique({
        where: { clerkId: data.clerkUserId },
    });

    if (!user || !user.employeeId) {
        throw new Error("Unauthorized: Your account is not linked to an employee profile.");
    }

    // 2. Create the request using their verified employeeId
    return await prisma.leaveRequest.create({
        data: {
            employeeId: user.employeeId, // Safely determined by backend, not frontend
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            type: data.type,
            reason: data.reason,
            status: "Pending",
        },
    });
}

/**
 * Updates the approval status of a leave request.
 */
export async function updateLeaveStatus(id: number, status: string) {
    return await prisma.leaveRequest.update({
        where: { id },
        data: { status },
    });
}

/**
 * Permanently removes a leave request by ID, ensuring the user owns it.
 * Updated for Sprint 5 I.1
 */
export async function deleteLeaveRequest(id: number, clerkUserId: string) {
    // 1. Find the logged-in user
    const user = await prisma.user.findUnique({
        where: { clerkId: clerkUserId },
    });

    if (!user || !user.employeeId) {
        throw new Error("Unauthorized");
    }

    // 2. Verify the leave request actually belongs to them before deleting
    const existingRequest = await prisma.leaveRequest.findUnique({
        where: { id }
    });

    if (!existingRequest || existingRequest.employeeId !== user.employeeId) {
        throw new Error("Forbidden: You cannot delete someone else's leave request.");
    }

    // 3. Safe to delete
    return await prisma.leaveRequest.delete({ where: { id } });
}