import { useState } from "react";
import { Employee } from "../../../types";

interface AddEmployeeFormProps {
  onAdd: (employee: Omit<Employee, "id">) => void;
}

function AddEmployeeForm({ onAdd }: AddEmployeeFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !role.trim() || !department.trim()) {
      alert("Please fill in all fields");
      return;
    }

    onAdd({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: role.trim(),
      department: department.trim(),
    });

    setFirstName("");
    setLastName("");
    setRole("");
    setDepartment("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-employee-form">
      <h3>Add New Employee</h3>
      <div>
        <label htmlFor="firstName">First Name: </label>
        <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name: </label>
        <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" />
      </div>
      <div>
        <label htmlFor="role">Role: </label>
        <input id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter role" />
      </div>
      <div>
        <label htmlFor="department">Department: </label>
        <input id="department" type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Enter department" />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default AddEmployeeForm;