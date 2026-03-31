export interface ClockInData {
  employeeId: number;
  locationIn?: string;
}

export interface ClockOutData {
  employeeId: number;
  locationOut: string;
}