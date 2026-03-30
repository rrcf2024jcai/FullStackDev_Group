let currentUser = "Admin";

export function readCurrentUser() {
  return currentUser;
}

export function writeCurrentUser(user: string) {
  currentUser = user;
}