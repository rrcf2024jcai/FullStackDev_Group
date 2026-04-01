import { useCurrentUser } from "../../../hooks";
import LeaveRequests from "../../common/leave-requests/LeaveRequests";

export default function LeavePage() {
  const { currentUser, switchUser } = useCurrentUser();

  return (
    <section>
      <h2>Leave Management</h2>

      <p>Viewing as: {currentUser}</p>

      <div>
        <label>Switch User: </label>
        <select
          value={currentUser}
          onChange={(e) => switchUser(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

      <LeaveRequests />
    </section>
  );
}
