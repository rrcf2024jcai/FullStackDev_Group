import React, { useState } from "react";
import "./LeaveRequests.css";
import { validateLeaveRequest, createLeaveObject } from "../../../services/leaveService";
import { useLeaveRequests } from "../../../hooks/useLeaveRequests";

/**
 * Presentation layer for the Leave Requests feature.
 * Data is persisted to the backend database via the API.
 * The backend determines the employee from the Clerk session — the frontend
 * does not need to send or select an employeeId.
 */
export default function LeaveRequests() {

    const { requests, error, addRequest, removeRequest } = useLeaveRequests();

    const [newType, setNewType]           = useState<string>("Vacation");
    const [newStartDate, setNewStartDate] = useState<string>("");
    const [newEndDate, setNewEndDate]     = useState<string>("");
    const [newReason, setNewReason]       = useState<string>("");

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateLeaveRequest(newStartDate, newEndDate, newReason);
        if (!validation.isValid) {
            alert(validation.errors[0]);
            return;
        }

        const newItem = createLeaveObject(newType, newStartDate, newEndDate, newReason);

        await addRequest(newItem);

        setNewStartDate("");
        setNewEndDate("");
        setNewReason("");
    };

    const handleDelete = async (idToDelete: number) => {
        await removeRequest(idToDelete);
    };

    const requestListItems = requests.map((item) => {
        const name = item.employee
            ? `${item.employee.firstName} ${item.employee.lastName}`
            : `Employee #${item.employeeId}`;

        return (
            <li key={item.id} className="request-item">
                <div className="info">
                    <strong>{item.type}</strong>
                    <span className="request-employee">{name}</span>
                    <span>
                        {item.startDate.slice(0, 10)}
                        {" → "}
                        {item.endDate.slice(0, 10)}
                    </span>
                    <span>{item.reason}</span>
                    <span className={"status status-" + item.status.toLowerCase()}>
                        {item.status}
                    </span>
                </div>
                <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                    aria-label={"Delete " + item.type + " request"}
                >
                    Delete
                </button>
            </li>
        );
    });

    return (
        <div className="leave-container">
            <h1>Leave Requests</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

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
                        <label htmlFor="leave-start">Start Date:</label>
                        <input
                            id="leave-start"
                            type="date"
                            value={newStartDate}
                            onChange={(e) => setNewStartDate(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="leave-end">End Date:</label>
                        <input
                            id="leave-end"
                            type="date"
                            value={newEndDate}
                            onChange={(e) => setNewEndDate(e.target.value)}
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
                    <ol>{requestListItems}</ol>
                )}
            </div>
        </div>
    );
}
