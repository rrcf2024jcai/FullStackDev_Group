export interface AttendanceRecord {
  id: number;
  clockIn: string | null;
  clockOut: string | null;
  locationIn: string | null;
  locationOut: string | null;
  employee: {
    id: number;
    name: string;
    department: string;
  };
}