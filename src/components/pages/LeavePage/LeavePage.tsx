import { SharedStateProps } from "../../../types";
import LeaveRequests from "../../common/leave-requests/LeaveRequests";

function LeavePage({ currentUser, setCurrentUser }: SharedStateProps) {
  return (
    <section>
      <h2>Leave Management</h2>
      
      {/* Display shared state */}
      <p>Viewing as: {currentUser}</p>
      
      {/* Modify shared state */}
      <div>
        <label>Switch User: </label>
        <select 
          value={currentUser} 
          onChange={(e) => setCurrentUser(e.target.value)}
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

export default LeavePage;