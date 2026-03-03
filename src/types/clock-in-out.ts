/**
 * Defines the structure for Clockin and Clock-Out.
 */
export interface ClockInOut {
    id: number;
    employeeId: number;
    action: string;
    time: string;
    location: string;
    clockIn: string | null;
    clockOut: string | null;
  }

  export interface ClockInOutWithEmployee extends ClockInOut {
  employeeName: string;
  employeeRole: string;
  employeeDepartment: string;
}
