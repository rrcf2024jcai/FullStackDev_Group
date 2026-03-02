import { useState } from "react";
import * as service from "../services/clockService";
import { ClockInOut } from "../types/clock-in-out";

export function useClockInOut() {
  const [records, setRecords] = useState<ClockInOut[]>(service.getAllRecords());
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");

  const handleClockIn = (location: string) => {
    const validation = service.validateClockAction("Clock In", location);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    service.recordClockIn(location);
    setRecords(service.getAllRecords());
    setSuccess(service.getClockSuccessMessage("Clock In"));
    setErrors([]);
  };

  const handleClockOut = (id: number, location: string) => {
    const validation = service.validateClockAction("Clock Out", location);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    service.recordClockOut(id, location);
    setRecords(service.getAllRecords());
    setSuccess(service.getClockSuccessMessage("Clock Out"));
    setErrors([]);
  };

  return { records, errors, success, handleClockIn, handleClockOut };
}