import { useState } from "react";

export default function ClockInOut() {
    const actions = [
        {id: 1, label: "Clock In"},
        {id: 2, label: "Clock Out"},
    ];

    // Components state
    const [isClockedIn, setIsClockedIn] = useState(false);
    // NotesForm component
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [logs, setLogs] = useState<
        {id: number; action: String; time: string; location: string}[]
    >([]);

    // Handle button click
    const handleAction = (actionLabel: string) => {
        // I.2 Form - Validation notes for Clock Out. Use strict comparison
        if (actionLabel === "Clock Out" && notes.trim() === "") {
            setError("Please enter your location.");
            setSuccess("");
            return;
        } 

        setError("");
        setSuccess("");

        const timestamp = new Date().toLocaleTimeString();
    // Add log entry so setLogs is actually used
    setLogs(prev => [
        ...prev,
        {
        id: prev.length + 1,
        action: actionLabel,
        time: timestamp,
        location: notes.trim() // I.2 Form - Added user-text area
        }
    ]);

    // I.2 Form - Add Clocked-In success message
    if (actionLabel === "Clock In") {
        setIsClockedIn(true);
        setSuccess("Successfully clocked in!");
    }

    if (actionLabel === "Clock Out") {
        setIsClockedIn(false);
        setSuccess("Successfully clocked out! Please check Attendance Log.")
    }

    // Clearing notes
    setNotes("");
    };

    // Removing log entry
    const removeLog = (id: number) => {
        setLogs((prev) => prev.filter((log) => log.id !== id));
    };

    return (
        <section className="clock-in-out">
        <h2>Time & Attendance</h2>

        <p>
            Status:{" "}
            <strong>{isClockedIn ? "Currently Clocked In" : "Not Clocked In"}</strong>
        </p>
        
        <div className="AddForm" style={{ marginBottom: "1rem" }}>
            <label htmlFor="info">Enter your location:</label>

            <input
                id="info"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Office/Home/Site"
            />

            {error && (
                <p style={{ color: "red", marginTop: "4px", fontStyle: "italic" }}>
                {error}
                </p>
            )}

            {success && (
                <p style={{ color: "blue", marginTop: "4px", fontStyle: "italic"}}>
                    {success}
                </p>
            )}
        </div>

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
                {log.action} at {log.time} - Location: {log.location}
                <button
                    style={{ marginLeft: "10px"}}
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
