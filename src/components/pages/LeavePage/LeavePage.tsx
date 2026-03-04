//import { SharedStateProps } from "../../../types";
import { useCurrentUser } from "../../../hooks";
import LeaveRequests from "../../common/leave-requests/LeaveRequests";

//function LeavePage({ currentUser, setCurrentUser }: SharedStateProps) {
export default function LeavePage() {
  const { currentUser, switchUser } = useCurrentUser();

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
          onChange={(e) => switchUser(e.target.value)} // Replaced setCurrentUser
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
