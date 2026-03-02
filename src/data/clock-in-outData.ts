import { ClockInOut } from "../types/clock-in-out";

export const clockInOutData: ClockInOut[] = [
  { id: 1, employeeId: 1, action: "Clock In", time: "09:00", location: "Office", clockIn: "09:00", clockOut: null },
  { id: 2, employeeId: 1, action: "Clock Out", time: "17:00", location: "Office", clockIn: null, clockOut: "17:00" },
  { id: 3, employeeId: 2, action: "Clock In", time: "08:45", location: "Remote", clockIn: "08:45", clockOut: null },
  { id: 4, employeeId: 2, action: "Clock Out", time: "16:30", location: "Remote", clockIn: null, clockOut: "16:30" },
  { id: 5, employeeId: 3, action: "Clock In", time: "09:10", location: "Office", clockIn: "09:10", clockOut: null },
  { id: 6, employeeId: 3, action: "Clock Out", time: "17:05", location: "Office", clockIn: null, clockOut: "17:05" },
  { id: 7, employeeId: 4, action: "Clock In", time: "09:05", location: "Office", clockIn: "09:05", clockOut: null },
  { id: 8, employeeId: 4, action: "Clock Out", time: "17:10", location: "Office", clockIn: null, clockOut: "17:10" },
  { id: 9, employeeId: 5, action: "Clock In", time: "09:20", location: "Remote", clockIn: "09:20", clockOut: null },
  { id: 10, employeeId: 5, action: "Clock Out", time: "17:00", location: "Remote", clockIn: null, clockOut: "17:00" }
];
