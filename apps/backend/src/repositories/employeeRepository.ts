import prisma from "../prisma/prisma";

// Get all employees
export async function getAll() {
  return await prisma.employee.findMany();
}

// Get employee by id
export async function getById(id: number) {
  return await prisma.employee.findUnique({ where: { id } });
}

// Add a new employee
export async function add(data: { firstName: string; lastName: string; role: string; department: string }) {
  return await prisma.employee.create({ data });
}


// Delete an employee by id
export async function remove(id: number) {
  return await prisma.employee.delete({ where: { id } });
}