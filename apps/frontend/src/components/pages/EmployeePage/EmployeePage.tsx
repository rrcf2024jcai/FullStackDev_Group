/**
 * EmployeePage Component
 * 
 * Uses Clerk auth to control what users can do:
 * - Logged-in users can add and delete employees
 * - Guest users can only view the employee list
 */
import { useUser } from "@clerk/clerk-react";
import { useEmployees } from "../../../hooks";
import EmployeeList from "../../common/employee-list/EmployeeList";
import SearchForm from "../../common/employee-list/SearchForm";
import AddEmployeeForm from "../../common/employee-list/AddEmployeeForm";
import "./EmployeePage.css";

function EmployeePage() {
  const { isSignedIn } = useUser();
  const { employees, searchTerm, setSearchTerm, handleAdd, handleDelete, errors } = useEmployees();

  return (
    <section className="employee-page">
      <h2>Employee Directory</h2>

      {errors.length > 0 && (
        <div style={{ color: "red" }}>
          {errors.map((err, i) => <p key={i}>{err}</p>)}
        </div>
      )}

      {isSignedIn && <AddEmployeeForm onAdd={handleAdd} />}

      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <EmployeeList
        employees={employees}
        onDelete={handleDelete}
        showDelete={isSignedIn ?? false}
      />
    </section>
  );
}

export default EmployeePage;