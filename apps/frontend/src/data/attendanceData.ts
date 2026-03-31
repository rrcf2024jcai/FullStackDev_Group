import { AttendanceRecord } from "../types/attendance";

export const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    clockIn: "2026-03-01T09:00:00",
    clockOut: null,
    locationIn: "Office",
    locationOut: null,
    employee: {
      id: 3,
      name: "Alyssa Urquiola",
      department: "Financial Services"
    }
  },
  {
    id: 2,
    clockIn: null,
    clockOut: "2026-03-01T17:00:00",
    locationIn: null,
    locationOut: "Office",
    employee: {
      id: 3,
      name: "Alyssa Urquiola",
      department: "Financial Services"
    }
  }
];