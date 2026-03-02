import { useState, useEffect } from "react";
import ClockForm from "./ClockForm";
import { useClockInOut } from "../../../hooks/useClockInOut";

export default function ClockInOut() {
  // Cleaned UI state
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logs, setLogs] = useState<
    { id: number; action: string; time: string; location: string }[]
  >([]);

  // Hook - Service - Repository
  const {
    records,
    errors: repoErrors,
    success: repoSuccess,
    handleClockIn,
    handleClockOut
  } = useClockInOut();

  // Sync repository logs current UI logs
  useEffect(() => {
    setLogs(
      records.map((r) => ({
        id: r.id,
        action: r.action,
        time: r.time,
        location: r.location
      }))
    );
  }, [records]);

  // Sync repository errors/success to current UI messages
  useEffect(() => {
    if (repoErrors.length > 0) {
      setError(repoErrors[0]);
    }
  }, [repoErrors]);

  useEffect(() => {
    if (repoSuccess) {
      setSuccess(repoSuccess);
    }
  }, [repoSuccess]);


  const handleAction = (actionLabel: string) => {
    // ORIGINAL VALIDATION
    if (actionLabel === "Clock Out" && notes.trim() === "") {
      setError("Please enter your location to complete your clock-out.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");

    const timestamp = new Date().toLocaleTimeString();

    setLogs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        action: actionLabel,
        time: timestamp,
        location: notes.trim()
      }
    ]);

    // Writing to repository
    if (actionLabel === "Clock In") {
      handleClockIn(notes.trim());
      setIsClockedIn(true);
      setSuccess(
        "Clock-in recorded. Please remember to clock out at the end of your work period."
      );
    }

    if (actionLabel === "Clock Out") {
      const latest = logs[logs.length - 1];
      if (latest) {
        handleClockOut(latest.id, notes.trim());
      }
      setIsClockedIn(false);
      setSuccess(
        "Great work today! You’re clocked out. Your Attendance Log has been updated."
      );
    }

    setNotes("");
  };

  const removeLog = (id: number) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  return (
    <section>
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

      <h3>Attendance Log</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.action} at {log.time} - Location: {log.location}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => removeLog(log.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
