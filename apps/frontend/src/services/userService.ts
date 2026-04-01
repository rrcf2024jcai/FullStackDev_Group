import { readCurrentUser, writeCurrentUser } from "../apis/userRepository";

/**export function getCurrentUser() {
  return readCurrentUser();
} **/

export function getCurrentUser(): string {
  return readCurrentUser() ?? "Employee".trim();
}  

export function setCurrentUser(user: string) {
  writeCurrentUser(user);
}