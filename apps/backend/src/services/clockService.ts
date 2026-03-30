import prisma from "../prisma/prisma.js";
import { ClockInData, ClockOutData } from "../types/clockType.js";

export const clockIn = async (data: ClockInData) => {
  const openEntry = await prisma.attendance.findFirst({
    where: { employeeId: data.employeeId, clockOut: null },
  });

  if (openEntry) throw new Error("Employee is already clocked in.");

  return prisma.attendance.create({
    data: {
      employeeId: data.employeeId,
      clockIn: new Date(),
      locationIn: data.locationIn,
    },
  });
};

export const clockOut = async (data: ClockOutData) => {
  const openEntry = await prisma.attendance.findFirst({
    where: { employeeId: data.employeeId, clockOut: null },
  });

  if (!openEntry) throw new Error("Employee is not clocked in.");

  return prisma.attendance.update({
    where: { id: openEntry.id },
    data: {
      clockOut: new Date(),
      locationOut: data.locationOut,
    },
  });
};

export const getLog = async (employeeId: number) => {
  return prisma.attendance.findMany({
    where: { employeeId },
    orderBy: { createdAt: "desc" },
  });
};