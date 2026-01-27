import { SharedStateProps } from "../../types";
import ClockInOut from "../../components/ClockIn-Out_alyssa/ClockInOut";

function TimePage({ currentUser, setCurrentUser }: SharedStateProps) {
  return (
    <section>
      <h2>Time Tracking</h2>
      
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