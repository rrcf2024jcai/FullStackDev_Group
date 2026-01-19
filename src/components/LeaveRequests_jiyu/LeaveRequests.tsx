import React from "react";
import "./LeaveRequests.css";

interface LeaveRequest {id: number; employeeName: string; department: string;
  type: string; dates: string; status: "Pending" | "Approved" | "Rejected";
  reason: string;}

const LeaveRequests: React.FC = () => {
  // Mock data representing leave requests
  const requests: LeaveRequest[] = [
    {id: 101, employeeName: "Zoë Robins",department: "Administration",type: "Vacation",
    dates: "Feb 10 - Feb 15, 2026",status: "Pending",reason: "Annual family trip",},
    {id: 102,employeeName: "Graham Greene",department: "Information Technology",
    type: "Sick Leave",dates: "Jan 18, 2026",status: "Approved",
    reason: "Medical appointment",},
    {id: 103,employeeName: "Priyanka Bose",department: "Banking Operations",
    type: "Personal",dates: "Jan 20, 2026",status: "Rejected",
    reason: "High volume period, staffing required",},
    {id: 104,employeeName: "Jennifer Rodriguez",department: "Information Technology",
    type: "Vacation",dates: "Mar 01 - Mar 05, 2026",status: "Pending",
    reason: "Trip to Vancouver branch",},
  ];

  return (
    <section className="leave-requests-panel">
      <header className="panel-header">
        <h2>Leave Requests</h2>
        <span className="pending-count">
          {requests.filter((r) => r.status === "Pending").length} Pending
        </span>
      </header>

      <div className="requests-list">
        {requests.map((request) => (
          <div key={request.id} className="request-card">
            <div className="card-top">
              <div className="user-info">
                <h3>{request.employeeName}</h3>
                <span className="dept-label">{request.department}</span>
              </div>
              <div className={`status-badge ${request.status.toLowerCase()}`}>
                {request.status}
              </div>
            </div>

            <div className="card-details">
              <p>
                <strong>Type:</strong> {request.type}
              </p>
              <p>
                <strong>Dates:</strong> {request.dates}
              </p>
              <p className="reason">"{request.reason}"</p>
            </div>

            <div className="card-actions">
              <button
                className="btn-approve"
                disabled={request.status !== "Pending"}
                title="Approve this request"
              >
                Approve
              </button>
              <button
                className="btn-reject"
                disabled={request.status !== "Pending"}
                title="Reject this request"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeaveRequests;
