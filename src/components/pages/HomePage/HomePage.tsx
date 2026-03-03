// Old import
// import { SharedStateProps } from "../../../types";
// import { useEmployees } from "../../../hooks";
import { useEmployees, useCurrentUser } from "../../../hooks";

export default function HomePage() {
  const { currentUser, switchUser } = useCurrentUser();
  const { employees } = useEmployees();

// function HomePage({ currentUser, setCurrentUser }: SharedStateProps) {
  //const { employees } = useEmployees();

  return (
    <section>
      <h2>Welcome to PIXELL-River Financial Dashboard</h2>
      <p>Select a section from the navigation to get started.</p>
      <p>Current User: {currentUser}</p>
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
      <p>Total Employees: {employees.length}</p>
    </section>
  );
}
