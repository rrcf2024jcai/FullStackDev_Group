import { ClockInOut } from "../types/clock-in-out";

export const clockInOutData: ClockInOut[] = [
  {
    id: 1,
    employeeId: 3,
    action: "Clock In",
    time: "09:00",
    location: "Office",
    clockIn: "2026-03-01T09:00:00",
    clockOut: null
  },
  {
    id: 2,
    employeeId: 3,
    action: "Clock Out",
    time: "17:00",
    location: "Office",
    clockIn: null,
    clockOut: "2026-03-01T17:00:00"
  }
];

