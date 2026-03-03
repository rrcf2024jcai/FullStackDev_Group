/**
 * Sprint 3 - I.3 New/Refactored Component
 * This repository will manage all the clock-in/out records for the Time Tracking page.
 * 
 * - Loads the test data (I.2 requirement).
 * - It will store all records in memory when submitting a time record.
 * - Provide CRUD operations for the sevice layer.
 */

import { clockInOutData } from "../data/clock-in-outData";
import { ClockInOut } from "../types/clock-in-out";

let records = [...clockInOutData];

export function getAll(): ClockInOut[] {
  return records;
}

export function add(record: ClockInOut): void {
  records.push(record);
}

export function update(id: number, updates: Partial<ClockInOut>): void {
  records = records.map(r => (r.id === id ? { ...r, ...updates } : r));
}

export function remove(id: number): void {
  records = records.filter(r => r.id !== id);
}