import { SharedStateProps } from "../../types";
import EmployeeList from "../../components/component_chenyang/EmployeeList";

function EmployeePage({ currentUser, setCurrentUser }: SharedStateProps) {
  return (
    <section>
      <h2>Employee Directory</h2>
      
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

      <EmployeeList />
    </section>
  );
}

export default EmployeePage;