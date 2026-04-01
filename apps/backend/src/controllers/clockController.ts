import { Request, Response } from "express";
import * as clockService from "../services/clockService";

export const clockIn = async (req: Request, res: Response) => {
  const result = await clockService.clockIn(req.body);
  res.json(result);
};

export const clockOut = async (req: Request, res: Response) => {
  const result = await clockService.clockOut(req.body);
  res.json(result);
};

export const getLog = async (req: Request, res: Response) => {
  const employeeId: number = Number(req.params.employeeId);
  const result = await clockService.getLog(employeeId);
  res.json(result);
};