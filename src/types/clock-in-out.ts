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