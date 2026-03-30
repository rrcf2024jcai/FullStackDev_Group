import { useState, useEffect } from "react";
import { Employee } from "../types/employee";
import * as employeeService from "../services/employeeService";

// This hook manages employee data for components
// It returns the employee list, search, add and delete functions
export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  // Load employees from backend on first render
  const loadEmployees = async () => {
    const data = await employeeService.getAllEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Get filtered employees based on search input
  const filteredEmployees = employeeService.filterEmployees(employees, searchTerm);

  // Add a new employee through service
  const handleAdd = async (employee: Omit<Employee, "id">) => {
    const result = await employeeService.addEmployee(employee);
    if (!result.success) {
      setErrors(result.errors);
      return false;
    }
    await loadEmployees();
    setErrors([]);
    return true;
  };

  // Remove an employee through service
  const handleDelete = async (id: number) => {
    await employeeService.deleteEmployee(id);
    await loadEmployees();
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