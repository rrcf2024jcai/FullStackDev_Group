import { useEffect, useState } from "react";
import { AttendanceRecord } from "../../../types/attendance";
import { getByEmployee, remove } from "../../../repository/clockInOutRepository";

export default function AttendanceHistory({ employeeId }: { employeeId: number }) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const data = getByEmployee(employeeId);
    setRecords(data);
  }, [employeeId]);

  function formatTime(iso: string | null) {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function handleDelete(id: number) {
    remove(id);
    setRecords(prev => prev.filter(r => r.id !== id));
  }

  if (records.length === 0) {
    return <p>No attendance records found.</p>;
  }

  return (
    <div>
      <h3 className="font-bold mb-2">Attendance History</h3>
      <ul className="space-y-2">
        {records.map((r) => (
          <li key={r.id} className="border p-2 rounded flex justify-between items-start gap-4">
            <div>
              <p><strong>Employee:</strong> {r.employee?.name ?? "Unknown"}</p>
              <p><strong>Clock In:</strong> {formatTime(r.clockIn)}</p>
              <p><strong>Clock Out:</strong> {formatTime(r.clockOut)}</p>
              <p><strong>Location In:</strong> {r.locationIn ?? "—"}</p>
              <p><strong>Location Out:</strong> {r.locationOut ?? "—"}</p>
            </div>

            <button
              className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50"
              onClick={() => handleDelete(r.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}