console.log(">>> CLOCK ROUTES LOADED <<<");

import { Router } from "express";
import prisma from "../prisma/prisma";

const router = Router();

/**
 * GET full attendance history for an employee
 * Returns an ARRAY (frontend expects this)
 */
router.get("/:employeeId", async (req, res) => {
  const employeeId = parseInt(req.params.employeeId);

  const history = await prisma.attendance.findMany({
    where: { employeeId },
    orderBy: { clockIn: "desc" },
  });

  res.json(history);
});

/**
 * CLOCK IN
 * Body: { employeeId, locationIn }
 */
router.post("/in", async (req, res) => {
  const { employeeId, locationIn } = req.body;

  const entry = await prisma.attendance.create({
    data: {
      employeeId,
      locationIn,
      clockIn: new Date(),
    },
  });

  res.json(entry);
});

/**
 * CLOCK OUT
 * Body: { employeeId, locationOut }
 * Finds the latest open attendance record (clockOut = null)
 */
router.post("/out", async (req, res) => {
  const { employeeId, locationOut } = req.body;

  // Find the latest open attendance record
  const latest = await prisma.attendance.findFirst({
    where: {
      employeeId,
      clockOut: null,
    },
    orderBy: { clockIn: "desc" },
  });

  if (!latest) {
    return res.status(400).json({ error: "No active clock-in found." });
  }

  const updated = await prisma.attendance.update({
    where: { id: latest.id },
    data: {
      locationOut,
      clockOut: new Date(),
    },
  });

  res.json(updated);
});

export default router;