import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Employee } from "../types/employee";
import * as employeeService from "../services/employeeService";

// This hook manages employee data for components
// It returns the employee list, search, add and delete functions
export function useEmployees() {
  const { getToken } = useAuth();
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
    const token = await getToken();
    if (!token) {
      setErrors(["You must be logged in to add an employee."]);
      return false;
    }
    const result = await employeeService.addEmployee(employee, token);
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
    const token = await getToken();
    if (!token) return;
    await employeeService.deleteEmployee(id, token);
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