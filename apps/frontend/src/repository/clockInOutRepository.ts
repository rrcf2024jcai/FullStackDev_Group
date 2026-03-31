/**
 * Sprint 3 - I.3 New/Refactored Component
 * This repository will manage all the clock-in/out records for the Time Tracking page.
 * 
 * - Loads the test data (I.2 requirement).
 * - It will store all records in memory when submitting a time record.
 * - Provide CRUD operations for the sevice layer.  */

import { attendanceData } from "../data/attendanceData";
import { AttendanceRecord } from "../types/attendance";

const STORAGE_KEY = "clock_records";

function loadFromStorage(): AttendanceRecord[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [...attendanceData];
}

function saveToStorage(records: AttendanceRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

let records: AttendanceRecord[] = loadFromStorage();

export function getByEmployee(employeeId: number): AttendanceRecord[] {
  return records.filter(r => r.employee && r.employee.id === employeeId);
}

export function add(record: AttendanceRecord): void {
  records = [...records, record];
  saveToStorage(records);
}

export function update(updated: AttendanceRecord): void {
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

/** Sprint 4 I.3 API 

// src/repositories/clockRepository.ts
// FILE: apps/frontend/src/repositories/clockInOutRepository.ts
/**
import { AttendanceRecord } from "../types/attendance";

const API_URL = "http://127.0.0.1:3000/api/clock";

export async function clockIn(data: { employeeId: number; locationIn: string }) {
  const res = await fetch(`${API_URL}/in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function clockOut(data: { employeeId: number; locationOut: string }) {
  const res = await fetch(`${API_URL}/out`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getHistory(employeeId: number): Promise<AttendanceRecord[]> {
  const res = await fetch(`${API_URL}/${employeeId}`);
  return res.json();
}

import { AttendanceRecord } from "../types/attendance";

const API_URL = "http://127.0.0.1:3000/api/clock";

// CLOCK IN
export async function clockIn(employeeId: number) {
  const res = await fetch(`${API_URL}/in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employeeId }),
  });
  return res.json();
}

// CLOCK OUT
export async function clockOut(attendanceId: number) {
  const res = await fetch(`${API_URL}/out`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attendanceId }),
  });
  return res.json();
}

// GET LATEST HISTORY
export async function getHistory(employeeId: number): Promise<AttendanceRecord[]> {
  const res = await fetch(`${API_URL}/${employeeId}`);
  return res.json();
} */