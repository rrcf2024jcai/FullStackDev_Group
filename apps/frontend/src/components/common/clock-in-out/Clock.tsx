import { useState } from "react";
import ClockForm from "../../../components/common/clock-in-out/ClockForm";
import AttendanceHistory from "../clock-in-out/AttendanceHistory";
import {
  add,
  update,
  getNextId,
  getByEmployee
} from "../../../repository/clockInOutRepository";

export default function ClockInOut({ employeeId }: { employeeId: number }) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleAction(actionLabel: string) {
    try {
      setError("");
      setSuccess("");

      const employeeInfo =
        getByEmployee(employeeId)[0]?.employee ?? {
          id: employeeId,
          name: "Unknown",
          department: "Unknown"
        };

      if (actionLabel === "Clock In") {
        const newRecord = {
          id: getNextId(),
          clockIn: new Date().toISOString(),
          clockOut: null,
          locationIn: notes,
          locationOut: null,
          employee: employeeInfo
        };

        add(newRecord);
        setSuccess("Clocked in successfully!");
      } else {
        const records = getByEmployee(employeeId);
        const latest = records[records.length - 1];

        if (!latest || latest.clockOut !== null) {
          setError("No active clock-in found.");
          return;
        }

        const updated = {
          ...latest,
          clockOut: new Date().toISOString(),
          locationOut: notes
        };

        update(updated);
        setSuccess("Clocked out successfully!");
      }

      setNotes("");
    } catch (err) {
      console.error(err);
      setError("Action failed");
    }
  }

  return (
    <>
      <ClockForm
        notes={notes}
        setNotes={setNotes}
        error={error}
        success={success}
        handleAction={handleAction}
      />

      <AttendanceHistory employeeId={employeeId} />
    </>
  );
}