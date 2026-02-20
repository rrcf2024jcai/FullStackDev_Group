import { useState } from "react";
import { Employee } from "../types/employee";
import * as employeeRepository from "../apis/employeeRepository";
import { filterEmployees, validateNewEmployee } from "../services/employeeService";

// useEmployees hook - handles employee state and actions for components
// Returns: employees (filtered list), searchTerm, setSearchTerm, handleAdd, handleDelete, errors
export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(employeeRepository.getAll());
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // Filter employees based on search
  const filteredEmployees = filterEmployees(employees, searchTerm);

  // Validate and add a new employee
  const handleAdd = (name: string, role: string, department: string) => {
    const validation = validateNewEmployee(name, role, department);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    const newEmployee: Employee = {
      id: Date.now(),
      name: name.trim(),
      role: role.trim(),
      department: department.trim(),
    };

    employeeRepository.add(newEmployee);
    setEmployees(employeeRepository.getAll());
    setErrors([]);
    return true;
  };

  // Delete an employee
  const handleDelete = (id: number) => {
    employeeRepository.remove(id);
    setEmployees(employeeRepository.getAll());
  };

  return {
    employees: filteredEmployees,
    searchTerm,
    setSearchTerm,
    handleAdd,
    handleDelete,
    errors,
  };
}