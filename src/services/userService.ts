let currentUser = "Admin";

export function getCurrentUser() {
  return currentUser;
}

export function setCurrentUser(user: string) {
  currentUser = user;
}