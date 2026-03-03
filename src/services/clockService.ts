// Sprint 3 imports
import * as repo from "../repository/clockInOutRepository";
import { ClockInOut } from "../types/clock-in-out";
import { employeeData } from "../data/employeeData";

// Add getEmployees to map current user
export function getEmployeeIdByName(name: string): number | null {
  const emp = employeeData.find(e => e.name === name);
  return emp ? emp.id : null;
}

// validateClockAction handles the business logic for clocking in/out.
export function validateClockAction(actionLabel: string, location: string): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    // Location is mandatory for Clock Out
    if (actionLabel === "Clock Out" && location.trim() === "") {
        isValid = false;
        errors.push("Please enter your location to complete your clock-out.");
    }

    return { isValid, errors };
}

// Determines the correct success message based on the action
export function getClockSuccessMessage(actionLabel: string): string {
    if (actionLabel === "Clock In") {
        return "Clock-in recorded. Please remember to clock out at the end of your work period.";
    }
    return "Great work today! You're clocked out. Your Attendance Log has been updated.";
}

// Repository calls and fect all records
export function getAllRecords(): ClockInOut[] {
  return repo.getAll();
}

// Record a clock-in
export function recordClockIn(userName: string, location: string): void {
  const employeeId = getEmployeeIdByName(userName);
  if (!employeeId) return;

  const now = new Date().toLocaleTimeString();

  const entry: ClockInOut = {
    id: Date.now(),
    employeeId,
    action: "Clock In",
    time: now,
    location,
    clockIn: now,
    clockOut: null
  };

  repo.add(entry);
}

// Record a clock-out
export function recordClockOut(id: number, userName: string, location: string): void {
  const employeeId = getEmployeeIdByName(userName);
  if (!employeeId) return;

  const now = new Date().toLocaleTimeString();

  repo.update(id, {
    employeeId,
    action: "Clock Out",
    time: now,
    location,
    clockOut: now
  });
}

