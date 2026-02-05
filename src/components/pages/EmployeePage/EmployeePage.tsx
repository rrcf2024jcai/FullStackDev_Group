import { useState } from "react";
import { SharedStateProps, Employee } from "../../../types";
import EmployeeList from "../../component_chenyang/EmployeeList";
import SearchForm from "../../component_chenyang/SearchForm";
import AddEmployeeForm from "../../component_chenyang/AddEmployeeForm";
import "./EmployeePage.css";

// Initial employee data
const initialEmployees: Employee[] = [
  { id: 1, name: "Chenyang Ma", role: "Manager", department: "Human Resources" },
  { id: 2, name: "Jiyu Cai", role: "Manager", department: "Information Technology" },
  { id: 3, name: "Alyssa Urquiola", role: "Manager", department: "Financial Services" },
  { id: 4, name: "Kate Fleetwood", role: "Auditor", department: "Audit" },
  { id: 5, name: "Priyanka Bose", role: "Analyst", department: "Banking Operations" },
  { id: 6, name: "Gil Cardinal", role: "Specialist", department: "Communications" },
  { id: 7, name: "Randy Bradshaw", role: "Coordinator", department: "Corporate Services" },
  { id: 8, name: "Dakota House", role: "Technician", department: "Facilities" },
  { id: 9, name: "Selina Hanusa", role: "Analyst", department: "Financial Services" },
  { id: 10, name: "Jesse Ed Azure", role: "Coordinator", department: "Human Resources" },
  { id: 11, name: "Graham Greene", role: "Developer", department: "Information Technology" },
  { id: 12, name: "Jennifer Rodriguez", role: "Software Developer", department: "Information Technology" },
  { id: 13, name: "Aiyana Littlebear", role: "IT Technician", department: "Information Technology" },
  { id: 14, name: "Tala Braveheart", role: "IT Technician", department: "Information Technology" },
  { id: 15, name: "Onatah Redhawk", role: "IT Technician", department: "Information Technology" },
];

function EmployeePage({ currentUser, setCurrentUser }: SharedStateProps) {
  // State for employee list
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  // State for search 
  const [searchTerm, setSearchTerm] = useState("");

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete employee function
  const handleDelete = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // Add employee function 
  const handleAdd = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
  };

  return (
    <section className="employee-page">
      <h2>Employee Directory</h2>

      {/* Display shared state */}
      <div className="user-switch">
        <p>Viewing as: {currentUser}</p>
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

      {/* Add Employee Form */}
      <AddEmployeeForm onAdd={handleAdd} />

      {/* Search Form */}
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Employee List - shows filtered results with delete */}
      <EmployeeList employees={filteredEmployees} onDelete={handleDelete} />
    </section>
  );
}

export default EmployeePage;