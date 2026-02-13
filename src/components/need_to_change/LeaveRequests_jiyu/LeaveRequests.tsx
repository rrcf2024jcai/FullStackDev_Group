import { useState } from "react";
import "./LeaveRequests.css";

interface LeaveRequest {
  id: number;
  type: string;
  date: string;
  reason: string;}

export default function LeaveRequests() {
  
  // List State
  const [requests, setRequests] = useState<LeaveRequest[]>([
    { id: 1, type: "Vacation", date: "2026-02-15", reason: "Family trip" },
    { id: 2, type: "Sick Leave", date: "2026-01-20", reason: "Flu" }
  ]);

  // Form State
  const [newType, setNewType] = useState("Vacation");
  const [newDate, setNewDate] = useState("");
  const [newReason, setNewReason] = useState("");

  // Updating State
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!newDate || !newReason) {
      alert("Please fill in the date and reason!");
      return;}
      

    const newItem: LeaveRequest = {
      id: Date.now(), 
      type: newType,
      date: newDate,
      reason: newReason};

    setRequests([...requests, newItem]);

    setNewDate("");
    setNewReason("");};

  // Removal
  const handleDelete = (idToDelete: number) => {
    setRequests(requests.filter(item => item.id !== idToDelete));};

  return (
    <div className="leave-container">
      <h1>Leave Requests</h1>

      {/*Form Component */}
      <div className="form-box">
        <h3>New Request</h3>
        <form onSubmit={handleAdd}>
          
          <div className="input-group">
            <label htmlFor="leave-type">Type:</label>
            <select 
              id="leave-type"
              value={newType} 
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value="Vacation">Vacation</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="leave-date">Date:</label>
            <input 
              id="leave-date"
              type="date" 
              value={newDate} 
              onChange={(e) => setNewDate(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <label htmlFor="leave-reason">Reason:</label>
            <input 
              id="leave-reason"
              type="text" 
              placeholder="Why?" 
              value={newReason} 
              onChange={(e) => setNewReason(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn-add">Submit</button>
        </form>
      </div>

      {/*Removal */}
      <div className="list-box">
        <h3>My History</h3>
        <ul>
          {requests.map((item) => (
            <li key={item.id} className="request-item">
              <div className="info">
                <strong>{item.type}</strong>
                <span>{item.date} - {item.reason}</span>
              </div>
              <button 
                className="btn-delete" 
                onClick={() => handleDelete(item.id)}
                // Add aria-label for screen readers
                aria-label={`Delete request for ${item.type} on ${item.date}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}