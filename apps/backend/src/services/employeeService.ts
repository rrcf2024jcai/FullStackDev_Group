import * as employeeRepository from "../repositories/employeeRepository.js";

export async function getAllEmployees() {
  return await employeeRepository.getAll();
}

export async function getEmployeeById(id: number) {
  return await employeeRepository.getById(id);
}

export async function addEmployee(data: { firstName: string; lastName: string; email: string; role: string; department: string }) {
  return await employeeRepository.add(data);
}

export async function deleteEmployee(id: number) {
  return await employeeRepository.remove(id);
}