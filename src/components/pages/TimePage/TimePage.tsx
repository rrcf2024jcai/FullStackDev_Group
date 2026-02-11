import { SharedStateProps } from "../../../types";
import ClockInOut from "../../need_to_change/ClockIn-Out_alyssa/ClockInOut";
import "./TimePage.css";

function TimePage({ currentUser, setCurrentUser }: SharedStateProps) {
  return (
    <section>
      <h2>Time Page</h2>
      
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

      <ClockInOut />
    </section>
  );
}

export default TimePage;