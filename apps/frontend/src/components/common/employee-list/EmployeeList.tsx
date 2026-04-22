import { Employee } from "../../../types";

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: number) => void;
  showDelete?: boolean;
}

function EmployeeList({ employees, onDelete, showDelete = true }: EmployeeListProps) {
  return (
    <section className="employee-list">
      <h3>Employee List</h3>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <span>{employee.firstName} {employee.lastName} - {employee.role} - {employee.department}</span>
              {showDelete && <button onClick={() => onDelete(employee.id)}>Delete</button>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default EmployeeList;