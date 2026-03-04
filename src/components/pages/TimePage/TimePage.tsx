// import { SharedStateProps } from "../../../types";
// import ClockInOut from "../../common/clock-in-out/ClockInOut";
import { useCurrentUser } from "../../../hooks";
import ClockInOut from "../../common/clock-in-out/ClockInOut";
import "./TimePage.css";

// function TimePage({ currentUser, setCurrentUser }: SharedStateProps) {

export default function TimePage() {
  const { currentUser, switchUser } = useCurrentUser();
  //const { records, errors, success, handleClockIn, handleClockOut } = useClockInOut();

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
          onChange={(e) => switchUser(e.target.value)} // Replaced setCurrentUser
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

