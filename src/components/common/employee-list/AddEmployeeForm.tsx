import { useState } from "react";
import { Employee } from "../../../types";

interface AddEmployeeFormProps {
  onAdd: (employee: Employee) => void;
}

function AddEmployeeForm({ onAdd }: AddEmployeeFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !role.trim() || !department.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Create new employee with unique id
    const newEmployee: Employee = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim(),
      department: department.trim(),
    };

    onAdd(newEmployee);

    // Clear form
    setName("");
    setRole("");
    setDepartment("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-employee-form">
      <h3>Add New Employee</h3>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div>
        <label htmlFor="role">Role: </label>
        <input
          id="role"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter role"
        />
      </div>
      <div>
        <label htmlFor="department">Department: </label>
        <input
          id="department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Enter department"
        />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default AddEmployeeForm;