import { useState } from "react";
import { Employee } from "../types/employee";
import * as employeeService from "../services/employeeService";

// This hook manages employee data for components
// It returns the employee list, search, add and delete functions
export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(employeeService.getAllEmployees());
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // Get filtered employees based on search input
  const filteredEmployees = employeeService.filterEmployees(employees, searchTerm);

  // Add a new employee through service
  const handleAdd = (employee: Employee) => {
    const result = employeeService.addEmployee(employee);
    if (!result.success) {
      setErrors(result.errors);
      return false;
    }
    setEmployees(employeeService.getAllEmployees());
    setErrors([]);
    return true;
  };

  // Remove an employee through service
  const handleDelete = (id: number) => {
    employeeService.deleteEmployee(id);
    setEmployees(employeeService.getAllEmployees());
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