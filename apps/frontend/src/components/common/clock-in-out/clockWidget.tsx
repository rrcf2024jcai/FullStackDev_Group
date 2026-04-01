import { useState } from "react";
import { add, update, getNextId, getByEmployee } from "../../../repository/clockInOutRepository";

interface Props {
  employeeId: number;
}

export default function ClockWidget({ employeeId }: Props) {
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleClockIn() {
    try {
      const newRecord = {
        id: getNextId(),
        clockIn: new Date().toISOString(),
        clockOut: null,
        locationIn: location,
        locationOut: null,
        employee: getByEmployee(employeeId)[0]?.employee ?? {
          id: employeeId,
          name: "Unknown",
          department: "Unknown"
        }
      };

      add(newRecord);
      setSuccess("Clocked in successfully!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Clock-in failed.");
      setSuccess("");
    }
  }

  function handleClockOut() {
    try {
      const records = getByEmployee(employeeId);
      const latest = records[records.length - 1];

      if (!latest || latest.clockOut !== null) {
        setError("No active clock-in found.");
        return;
      }

      const updated = {
        ...latest,
        clockOut: new Date().toISOString(),
        locationOut: location
      };

      update(updated);
      setSuccess("Clocked out successfully!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Clock-out failed.");
      setSuccess("");
    }
  }

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Office / Home / Site"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <button onClick={handleClockIn} className="btn btn-primary w-full">
        Clock In
      </button>

      <button onClick={handleClockOut} className="btn btn-secondary w-full">
        Clock Out
      </button>
    </div>
  );
}