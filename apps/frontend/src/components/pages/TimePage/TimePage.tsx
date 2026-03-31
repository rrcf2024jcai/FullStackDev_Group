// import { SharedStateProps } from "../../../types";
// import ClockInOut from "../../common/clock-in-out/ClockInOut";
import { useCurrentUser } from "../../../hooks";
import ClockInOut from "../../common/clock-in-out/Clock";
import "./TimePage.css";

export default function TimePage() {
  const { currentUser, switchUser } = useCurrentUser();

console.log("Rendering ClockInOut from:", ClockInOut);

  return (
    <section>
      <h2>Time Page</h2>

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

      {/* Attendance / Clock In-Out Component */}
      <ClockInOut employeeId={1} />
    </section>
  );
}