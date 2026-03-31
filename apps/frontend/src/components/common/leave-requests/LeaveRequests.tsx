import React, { useState, useEffect } from "react";
import "./LeaveRequests.css";
import { validateLeaveRequest, createLeaveObject } from "../../../services/leaveService";
import { useLeaveRequests } from "../../../hooks/useLeaveRequests";

interface EmployeeOption {
    id: number;
    firstName: string;
    lastName: string;
}

/**
 * Presentation layer for the Leave Requests feature.
 * Data is persisted to the backend database via the API.
 */
export default function LeaveRequests() {

    const { requests, error, addRequest, removeRequest } = useLeaveRequests();

    const [employees, setEmployees] = useState<EmployeeOption[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/employees")
            .then((r) => r.json())
            .then((data: EmployeeOption[]) => setEmployees(data))
            .catch(() => {});
    }, []);

    const [newEmployeeId, setNewEmployeeId] = useState<string>("");
    const [newType, setNewType]             = useState<string>("Vacation");
    const [newStartDate, setNewStartDate]   = useState<string>("");
    const [newEndDate, setNewEndDate]       = useState<string>("");
    const [newReason, setNewReason]         = useState<string>("");

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = validateLeaveRequest(newEmployeeId, newStartDate, newEndDate, newReason);
        if (!validation.isValid) {
            alert(validation.errors[0]);
            return;
        }

        const newItem = createLeaveObject(
            Number(newEmployeeId),
            newType,
            newStartDate,
            newEndDate,
            newReason
        );

        await addRequest(newItem);

        setNewEmployeeId("");
        setNewStartDate("");
        setNewEndDate("");
        setNewReason("");
    };

    const handleDelete = async (idToDelete: number) => {
        await removeRequest(idToDelete);
    };

    const requestListItems = requests.map((item) => (
        <li key={item.id} className="request-item">
            <div className="info">
                <strong>{item.type}</strong>
                <span>
                    {item.startDate.slice(0, 10)}
                    {" \u2192 "}
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
    ));

    return (
        <div className="leave-container">
            <h1>Leave Requests</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="form-box">
                <h3>Submit a Request</h3>
                <form onSubmit={handleAdd}>
                    <div className="input-group">
                        <label htmlFor="employee-id">Employee:</label>
                        <select
                            id="employee-id"
                            value={newEmployeeId}
                            onChange={(e) => setNewEmployeeId(e.target.value)}
                        >
                            <option value="">-- Select Employee --</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={String(emp.id)}>
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

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
