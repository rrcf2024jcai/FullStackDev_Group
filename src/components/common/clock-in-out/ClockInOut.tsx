import { useState, useEffect } from "react";
import ClockForm from "./ClockForm";
import { useClockInOut } from "../../../hooks/useClockInOut";

export default function ClockInOut() {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    records,
    errors: repoErrors,
    success: repoSuccess,
    handleClockIn,
    handleClockOut,
    handleRemove
  } = useClockInOut();

  const isClockedIn =
    records.length > 0 && records[records.length - 1].action === "Clock In";

  useEffect(() => {
    if (repoErrors.length > 0) setError(repoErrors[0]);
  }, [repoErrors]);

  useEffect(() => {
    if (repoSuccess) setSuccess(repoSuccess);
  }, [repoSuccess]);

  const handleAction = (actionLabel: string) => {
    setError("");
    setSuccess("");

    const location = notes.trim();
    if (!location) {
      setError("Please enter your location.");
      return;
    }

    if (actionLabel === "Clock In") {
      handleClockIn(location);
    }

    if (actionLabel === "Clock Out") {
      const latest = records[records.length - 1];
      if (latest) handleClockOut(latest.id, location);
    }

    setNotes("");
  };

  return (
    <div className="time-tracking-container">
      <h3>Clock In / Out</h3>

      <p>
        Status:{" "}
        <strong>{isClockedIn ? "Currently Clocked In" : "Not Clocked In"}</strong>
      </p>

      <ClockForm
        notes={notes}
        setNotes={setNotes}
        error={error}
        success={success}
        handleAction={handleAction}
      />

      <h3>My Attendance History</h3>
      <ul className="history-list">
        {records.map((log) => (
          <li key={log.id} className="history-item">
            <div>
              <strong>{log.employeeName}</strong> — {log.employeeRole} ({log.employeeDepartment})
              <br />
              {log.action} at {log.time} — {log.location}
            </div>

            <button className="delete-btn" onClick={() => handleRemove(log.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}