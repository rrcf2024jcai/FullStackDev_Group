interface ClockFormProps {
  notes: string;
  setNotes: (value: string) => void;
  error: string;
  success: string;
  handleAction: (actionLabel: string) => void;
}

export default function ClockForm({
  notes,
  setNotes,
  error,
  success,
  handleAction
}: ClockFormProps) {
  return (
    <div className="AddForm" style={{ marginBottom: "1rem", width: "30%", border: "2px solid grey" }}>
      <label htmlFor="notes">Enter your location:</label>

      <input
        id="notes"
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
        <p style={{ color: "blue", marginTop: "4px", fontStyle: "italic" }}>
          {success}
        </p>
      )}

      <ul>
        <li>
          <button onClick={() => handleAction("Clock In")}>Clock In</button>
        </li>
        <li>
          <button onClick={() => handleAction("Clock Out")}>Clock Out</button>
        </li>
      </ul>
    </div>
  );
}