/**
 * Defines the structure for Clockin and Clock-Out.

export interface ClockInOut {
    id: number;
    employeeId: number;
    action: "Clock In" | "Clock Out";
    time: string;
    location: string;
    clockIn: string | null;
    clockOut: string | null;
  }
  export interface ClockInOutWithEmployee extends ClockInOut {
  employeeName: string;
  employeeRole: string;
  employeeDepartment: string;
}**/
/**
// Sprint 4 I.3
export interface ClockInOut {
  id: number;
  employeeId: number;
  name: string;
  clockIn: string | null;
  clockOut: string | null;
  locationIn: string;
  locationOut: string | null;
  createdAt: string;
} */
