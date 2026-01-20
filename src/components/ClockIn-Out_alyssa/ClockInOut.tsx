import { useState } from "react";

export default function ClockInOut() {
    const actions = [
        {id: 1, label: "Clock In"},
        {id: 2, label: "Clock Out"},
    ];

    // Components state
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [logs, setLogs] = useState<
        {id: number; action: String; time: string}[]
    >([]);

    // Handle button click
    const handleAction = (actionLabel: string) => {
        const timestamp = new Date().toLocaleTimeString();
    // Add log entry so setLogs is actually used
  setLogs(prev => [
    ...prev,
    {
      id: prev.length + 1,
      action: actionLabel,
      time: timestamp
    }
  ]);

  // Clock-in toggle
  if (actionLabel === "Clock In") setIsClockedIn(true);
  if (actionLabel === "Clock Out") setIsClockedIn(false);
};


    return (
        <section className="clock-in-out">
        <h2>Time & Attendance</h2>

        <p>
            Status:{" "}
            <strong>{isClockedIn ? "Currently Clocked In" : "Not Clocked In"}</strong>
        </p>

        <ul>
            {actions.map((action) => (
            <li key={action.id}>
                <button
                aria-label={action.label}
                disabled={
                    (action.label === "Clock In" && isClockedIn) ||
                    (action.label === "Clock Out" && !isClockedIn)
                }
                onClick={() => handleAction(action.label)}
                >
                {action.label}
                </button>
            </li>
            ))}
        </ul>

        <h3>Attendance Log</h3>
        <ul>
            {logs.map((log) => (
            <li key={log.id}>
                {log.action} at {log.time}
            </li>
            ))}
        </ul>
        </section>
  );
}

