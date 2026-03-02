import { useState } from "react";
import * as service from "../services/clockService";
import { ClockInOut } from "../types/clock-in-out";
import { useCurrentUser } from "./useCurrentUser";

export function useClockInOut() {
  const { currentUser } = useCurrentUser();
  const [records, setRecords] = useState<ClockInOut[]>(service.getAllRecords());
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");

  const handleClockIn = (location: string) => {
    const validation = service.validateClockAction("Clock In", location);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    service.recordClockIn(currentUser, location);

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

    // Pass BOTH id + userName + location
    service.recordClockOut(id, currentUser, location);

    setRecords(service.getAllRecords());
    setSuccess(service.getClockSuccessMessage("Clock Out"));
    setErrors([]);
  };

  return { records, errors, success, handleClockIn, handleClockOut };
}
