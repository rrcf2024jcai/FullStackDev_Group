/**
 import * as repo from "../repository/clockInOutRepository";
import { ClockInOut } from "../types/clock-in-out";

export function getRecordsForEmployee(employeeId: number): ClockInOut[] {
  return repo.getByEmployee(employeeId);
}

export function clockIn(employeeId: number, location: string): void {
  const now = new Date();

  const record: ClockInOut = {
    id: repo.getNextId(),
    employeeId,
    action: "Clock In",
    time: now.toLocaleTimeString(),
    location,
    clockIn: now.toISOString(),
    clockOut: null
  };

  repo.add(record);
}

export function clockOut(id: number, employeeId: number, location: string): void {
  const existing = repo.getByEmployee(employeeId).find(r => r.id === id);
  if (!existing) return;

  const now = new Date();

  const updated: ClockInOut = {
    ...existing,
    action: "Clock Out",
    time: now.toLocaleTimeString(),
    location,
    clockOut: now.toISOString()
  };

  repo.update(updated);
}

export function removeRecord(id: number): void {
  repo.remove(id);
} **/