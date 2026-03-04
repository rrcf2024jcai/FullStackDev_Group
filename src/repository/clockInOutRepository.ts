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


const STORAGE_KEY = "clock_records";

function loadFromStorage(): ClockInOut[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [...clockInOutData];
}

function saveToStorage(records: ClockInOut[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

let records: ClockInOut[] = loadFromStorage();

export function getByEmployee(employeeId: number): ClockInOut[] {
  return records.filter(r => r.employeeId === employeeId);
}

export function add(record: ClockInOut): void {
  records = [...records, record];
  saveToStorage(records);
}

export function update(updated: ClockInOut): void {
  records = records.map(r => (r.id === updated.id ? updated : r));
  saveToStorage(records);
}

export function remove(id: number): void {
  records = records.filter(r => r.id !== id);
  saveToStorage(records);
}

export function getNextId(): number {
  return records.length === 0 ? 1 : Math.max(...records.map(r => r.id)) + 1;
}