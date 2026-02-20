import { SharedStateProps } from "../../../types";
import { useEmployees } from "../../../hooks";

function HomePage({ currentUser, setCurrentUser }: SharedStateProps) {
  const { employees } = useEmployees();

  return (
    <section>
      <h2>Welcome to PIXELL-River Financial Dashboard</h2>
      <p>Select a section from the navigation to get started.</p>
      
      {/* Display shared state */}
      <p>Current User: {currentUser}</p>
      
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

      {/* Show employee count using useEmployees hook */}
      <p>Total Employees: {employees.length}</p>
    </section>
  );
}

export default HomePage;