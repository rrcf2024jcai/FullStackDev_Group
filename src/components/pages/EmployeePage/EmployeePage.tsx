// import { SharedStateProps } from "../../../types";
import { useEmployees, useCurrentUser } from "../../../hooks";
import EmployeeList from "../../common/employee-list/EmployeeList";
import SearchForm from "../../common/employee-list/SearchForm";
import AddEmployeeForm from "../../common/employee-list/AddEmployeeForm";
import "./EmployeePage.css";

//function EmployeePage({ currentUser, setCurrentUser }: SharedStateProps) {
  //const { employees, searchTerm, setSearchTerm, handleAdd, handleDelete, errors } = useEmployees();

// T.3 implementation for global context
function EmployeePage() {
  const { currentUser, switchUser } = useCurrentUser();
  const { employees, searchTerm, setSearchTerm, handleAdd, handleDelete, errors } = useEmployees();

  return (
    <section className="employee-page">
      <h2>Employee Directory</h2>

      <div className="user-switch">
        <p>Viewing as: {currentUser}</p>
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

      {errors.length > 0 && (
        <div style={{ color: "red" }}>
          {errors.map((err, i) => <p key={i}>{err}</p>)}
        </div>
      )}

      <AddEmployeeForm onAdd={handleAdd} />
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <EmployeeList employees={employees} onDelete={handleDelete} />
    </section>
  );
}

export default EmployeePage;