import { useState } from "react";
import "./LeaveRequests.css";

// Import our business logic service
import { validateLeaveRequest, createLeaveObject } from "../../../services/leaveService";
// Import our type definition
import { LeaveRequest } from "../../../types/leave";

/**
 * This component handles the presentation logic for leave requests.
 * Following the layered architecture, all business logic (like validation
 * and object creation) has been moved to the leaveService.
 * This keeps our component clean and focused only on rendering the UI
 * and managing local state.
 */
export default function LeaveRequests() {
    
    // State for the list of requests
    const [requests, setRequests] = useState<LeaveRequest[]>([
        { id: 1, type: "Vacation", date: "2026-02-15", reason: "Family trip" },
        { id: 2, type: "Sick Leave", date: "2026-01-20", reason: "Flu" }
    ]);

    // State for controlled inputs
    const [newType, setNewType] = useState<string>("Vacation");
    const [newDate, setNewDate] = useState<string>("");
    const [newReason, setNewReason] = useState<string>("");

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault(); 

        // Delegate business logic to the service layer
        const validation = validateLeaveRequest(newDate, newReason);
        
        if (!validation.isValid) {
            // Display the first error message returned from the service
            alert(validation.errors[0]); 
            return;
        }

        // Use the service to format the new data object
        const newItem: LeaveRequest = createLeaveObject(newType, newDate, newReason);

        // Update local state
        setRequests([...requests, newItem]);

        // Clear inputs after successful submission
        setNewDate("");
        setNewReason("");
    };

    const handleDelete = (idToDelete: number) => {
        setRequests(requests.filter((item) => item.id !== idToDelete));
    };

    // Annotate type as a list of JSX elements, similar to TermListDisplay
    // Map is the best means of creating a component array
    const requestListItems: JSX.Element[] = requests.map((item) => {
        return (
            <li key={item.id} className="request-item">
                <div className="info">
                    <strong>{item.type}</strong>
                    <span>{item.date} - {item.reason}</span>
                </div>
                <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Delete request for ${item.type} on ${item.date}`}
                >
                    Delete
                </button>
            </li>
        );
        // all iterated components should have a Key provided
    });

    return (
        <div className="leave-container">
            <h1>Leave Requests</h1>
            <div className="form-box">
                <h3>Submit a Request</h3>
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
                        {/*
                            This is an example of a "controlled input" in which the value
                            of the input is received from state -- the state is updated
                            when the user modifies field text.
                        */}
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

            <div className="list-box">
                <h3>My History</h3>
                <ol>
                    {requestListItems}
                </ol>
            </div>
        </div>
    );
}