import React from "react"; 
import "./LeaveRequests.css";
import { validateLeaveRequest, createLeaveObject } from "../../../services/leaveService";
import { LeaveRequest } from "../../../types/leave";
import { useLeaveRequests } from "../../../hooks/useLeaveRequests";

/**
 * This component handles the presentation logic for leave requests.
 */
export default function LeaveRequests() {
    
    //Use the custom hook to access data and methods
    const { requests, addRequest, removeRequest } = useLeaveRequests();

    // Local State for controlled inputs 
    const [newType, setNewType] = useState<string>("Vacation");
    const [newDate, setNewDate] = useState<string>("");
    const [newReason, setNewReason] = useState<string>("");

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault(); 

        // Delegate validation logic to the Service
        const validation = validateLeaveRequest(newDate, newReason);
        
        if (!validation.isValid) {
            // Display error from service
            alert(validation.errors[0]); 
            return;
        }

        // Use the Service to create the formatted object
        const newItem: LeaveRequest = createLeaveObject(newType, newDate, newReason);

        // Use the Hook to save the data
        await addRequest(newItem);

        // Clear inputs after success
        setNewDate("");
        setNewReason("");
    };

    const handleDelete = async (idToDelete: number) => {
        // Use the Hook to delete data
        await removeRequest(idToDelete);
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
                            of the input is received from state.
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
                {requests.length === 0 ? (
                    <p>No leave requests found.</p>
                ) : (
                    <ol>
                        {requestListItems}
                    </ol>
                )}
            </div>
        </div>
    );
}