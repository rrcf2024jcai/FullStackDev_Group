import { Employee } from "../types/employee";
import * as employeeRepository from "../apis/employeeRepository";

// Check if employee input is valid
export function validateNewEmployee(name: string, role: string, department: string): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    if (!name.trim() || !role.trim() || !department.trim()) {
        isValid = false;
        errors.push("Please fill in all fields.");
    }

    return { isValid, errors };
}

// Filter employees by search term
export function filterEmployees(employees: Employee[], searchTerm: string): Employee[] {
    if (!searchTerm) {
        return employees;
    }
    
    const term = searchTerm.toLowerCase();
    return employees.filter((emp) =>
        emp.name.toLowerCase().includes(term)
    );
}

// Get all employees from repository
export function getAllEmployees(): Employee[] {
    return employeeRepository.getAll();
}

// Add employee - validate first, then save to repository
export function addEmployee(employee: Employee): { success: boolean; errors: string[] } {
    const validation = validateNewEmployee(employee.name, employee.role, employee.department);
    if (!validation.isValid) {
        return { success: false, errors: validation.errors };
    }
    employeeRepository.add(employee);
    return { success: true, errors: [] };
}

// Delete employee from repository
export function deleteEmployee(id: number): boolean {
    return employeeRepository.remove(id);
}