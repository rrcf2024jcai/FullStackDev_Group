import { LeaveRequest } from "../types/leave";

/**
 * This array serves as the placeholder database for Leave Requests.
 * It contains at least 10 items as required.
 */
export const leaveData: LeaveRequest[] = [
    { id: 101, type: "Vacation", date: "2025-03-01", reason: "Annual family trip" },
    { id: 102, type: "Sick Leave", date: "2025-03-10", reason: "Flu symptoms" },
    { id: 103, type: "Personal", date: "2025-03-15", reason: "Attending a wedding" },
    { id: 104, type: "Vacation", date: "2025-04-02", reason: "Long weekend getaway" },
    { id: 105, type: "Sick Leave", date: "2025-04-05", reason: "Migraine headache" },
    { id: 106, type: "Personal", date: "2025-04-12", reason: "Moving to a new apartment" },
    { id: 107, type: "Vacation", date: "2025-05-20", reason: "Camping trip with friends" },
    { id: 108, type: "Sick Leave", date: "2025-06-01", reason: "Dental surgery recovery" },
    { id: 109, type: "Personal", date: "2025-06-15", reason: "Renewing passport and license" },
    { id: 110, type: "Vacation", date: "2025-07-04", reason: "Summer break with family" }
];