import { Employee } from "../types/employee";
import { employeeData } from "../data/employeeData";

/**
 * Employee Repository
 * Handles all data access for Employee resources.
 * Currently uses test data, will be replaced with API calls in the next module.
 */

// Local copy of employee data (simulates a database)
let employees: Employee[] = [...employeeData];

// Get all employees
export function getAll(): Employee[] {
  return [...employees];
}

// Get a single employee by ID
export function getById(id: number): Employee | undefined {
  return employees.find((emp) => emp.id === id);
}

// Add a new employee
export function add(employee: Employee): Employee {
  employees.push(employee);
  return employee;
}

// Update an existing employee
export function update(id: number, updated: Employee): Employee | undefined {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return undefined;
  employees[index] = updated;
  return updated;
}

// Delete an employee by ID
export function remove(id: number): boolean {
  const lengthBefore = employees.length;
  employees = employees.filter((emp) => emp.id !== id);
  return employees.length < lengthBefore;
}