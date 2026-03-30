import { Request, Response, NextFunction } from "express";

export function validateEmployee(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, role, department } = req.body;

  const errors: string[] = [];

  if (!firstName || !firstName.trim()) {
    errors.push("First name is required");
  }
  if (!lastName || !lastName.trim()) {
    errors.push("Last name is required");
  }
  if (!role || !role.trim()) {
    errors.push("Role is required");
  }
  if (!department || !department.trim()) {
    errors.push("Department is required");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
}