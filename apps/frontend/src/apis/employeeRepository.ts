import { Employee } from "../types/employee";

const API_URL = "http://localhost:3000/api/employees";

// Get all employees
export async function getAll(): Promise<Employee[]> {
  const res = await fetch(API_URL);
  return res.json();
}

// Get a single employee by ID
export async function getById(id: number): Promise<Employee | undefined> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Add a new employee (requires auth token)
export async function add(employee: Omit<Employee, "id">, token: string): Promise<Employee> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(employee),
  });
  return res.json();
}

// Delete an employee by ID (requires auth token)
export async function remove(id: number, token: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return res.ok;
}