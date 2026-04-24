import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

export async function getAll(req: Request, res: Response) {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (error) { 
    console.error("Database error:", error); 
    res.status(500).json({ error: "Failed to get employees" });
  }
}

export async function add(req: Request, res: Response) {
  try {
    const employee = await employeeService.addEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to add employee" });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params["id"] as string);
    await employeeService.deleteEmployee(id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
}