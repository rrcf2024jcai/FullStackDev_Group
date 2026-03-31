import prisma from "../prisma/prisma";

export async function clockIn(data: {
  employeeId: number;
  locationIn: string;
}) {
  return prisma.attendance.create({
    data: {
      employeeId: data.employeeId,
      clockIn: new Date(),
      locationIn: data.locationIn,
    },
  });
}

export async function clockOut(data: {
  employeeId: number;
  locationOut: string;
}) {
  return prisma.attendance.updateMany({
    where: {
      employeeId: data.employeeId,
      clockOut: null,
    },
    data: {
      clockOut: new Date(),
      locationOut: data.locationOut,
    },
  });
}

export async function getLog(employeeId: number) {
  return prisma.attendance.findMany({
    where: { employeeId },
    include: {
      employee: true, // JOIN Employee table
    },
    orderBy: { clockIn: "desc" },
  });
}