import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import * as userService from "../services/userService";

export async function syncUser(req: Request, res: Response) {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
    const user = await userService.syncUser(auth.userId);
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to sync user" });
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
    const user = await userService.getUserByClerkId(auth.userId);
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to get user" });
  }
}