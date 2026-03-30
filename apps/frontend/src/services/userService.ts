import { readCurrentUser, writeCurrentUser } from "../apis/userRepository";

export function getCurrentUser() {
  return readCurrentUser();
}

export function setCurrentUser(user: string) {
  writeCurrentUser(user);
}