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
    <div className="clock-page">
      <div className="clock-container">
        <div className="form-box">
          <div className="input-group">
            <label htmlFor="notes">Enter your location:</label>
            <input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Office / Home / Site"
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <div className="button-row">
            <button className="btn-add" onClick={() => handleAction("Clock In")}>
              Clock In
            </button>
            <button className="btn-add" onClick={() => handleAction("Clock Out")}>
              Clock Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
