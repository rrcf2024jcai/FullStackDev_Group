//import { useState } from "react";
//import * as service from "../services/clockService";
//import { ClockInOut } from "../types/clock-in-out";
//import { useCurrentUser } from "./useCurrentUser";

import { useEffect, useState } from "react";
import { useCurrentUser } from "./index";
import * as service from "../services/clockService";
import { ClockInOutWithEmployee } from "../types/clock-in-out";
import { employeeData } from "../data/employeeData";

function mapUserToEmployeeId(user: string): number {
  if (user === "Admin") return 1;
  if (user === "Manager") return 2;
  return 3;
}

export function useClockInOut() {
  const { currentUser } = useCurrentUser();
  const [records, setRecords] = useState<ClockInOutWithEmployee[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  const employeeId = mapUserToEmployeeId(currentUser);

  const load = () => {
    const data = service.getRecordsForEmployee(employeeId);

    const enriched: ClockInOutWithEmployee[] = data.map(record => {
      const emp = employeeData.find(e => e.id === record.employeeId);

      return {
        ...record,
        employeeName: emp?.name ?? "Unknown",
        employeeRole: emp?.role ?? "Unknown",
        employeeDepartment: emp?.department ?? "Unknown"
      };
    });

    setRecords(enriched);
  };

  useEffect(() => {
    load();
  }, [employeeId]);

  const handleClockIn = (location: string) => {
    try {
      service.clockIn(employeeId, location);
      setSuccess("Clock-in recorded.");
      setErrors([]);
      load();
    } catch {
      setErrors(["Failed to clock in."]);
    }
  };

  const handleClockOut = (id: number, location: string) => {
    try {
      service.clockOut(id, employeeId, location);
      setSuccess("Clock-out recorded.");
      setErrors([]);
      load();
    } catch {
      setErrors(["Failed to clock out."]);
    }
  };

  const handleRemove = (id: number) => {
    try {
      service.removeRecord(id);
      setSuccess("Entry removed.");
      setErrors([]);
      load();
    } catch {
      setErrors(["Failed to remove entry."]);
    }
  };

  return {
    records,
    errors,
    success,
    handleClockIn,
    handleClockOut,
    handleRemove
  };
}