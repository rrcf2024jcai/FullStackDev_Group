import { Employee } from "../types/employee";
import * as employeeRepository from "../apis/employeeRepository";

// Check if employee input is valid
export function validateNewEmployee(firstName: string, lastName: string, role: string, department: string): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    if (!firstName.trim() || !lastName.trim() || !role.trim() || !department.trim()) {
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
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term)
    );
}

// Get all employees from repository
export async function getAllEmployees(): Promise<Employee[]> {
    return await employeeRepository.getAll();
}

// Add employee - validate first, then save to repository
export async function addEmployee(employee: Omit<Employee, "id">, token: string): Promise<{ success: boolean; errors: string[] }> {
    const validation = validateNewEmployee(employee.firstName, employee.lastName, employee.role, employee.department);
    if (!validation.isValid) {
        return { success: false, errors: validation.errors };
    }
    await employeeRepository.add(employee, token);
    return { success: true, errors: [] };
}

// Delete employee from repository
export async function deleteEmployee(id: number, token: string): Promise<boolean> {
    return await employeeRepository.remove(id, token);
}