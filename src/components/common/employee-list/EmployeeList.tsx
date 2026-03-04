import { Employee } from "../../../types";

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: number) => void;
}

function EmployeeList({ employees, onDelete }: EmployeeListProps) {
  return (
    <section className="employee-list">
      <h3>Employee List</h3>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <span>{employee.name} - {employee.role} - {employee.department}</span>
              <button onClick={() => onDelete(employee.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default EmployeeList;