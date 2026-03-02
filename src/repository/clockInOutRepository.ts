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