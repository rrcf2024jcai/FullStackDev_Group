import { Employee } from "../types";

// validateNewEmployee handles the business logic for adding employees.
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

// Filter the employee list based on a search term
export function filterEmployees(employees: Employee[], searchTerm: string): Employee[] {
    if (!searchTerm) {
        return employees;
    }
    
    const term = searchTerm.toLowerCase();
    return employees.filter((emp) =>
        emp.name.toLowerCase().includes(term)
    );
}