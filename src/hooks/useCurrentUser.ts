import { useState } from "react";
import * as userService from "../services/userService";

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(userService.getCurrentUser());

  const switchUser = (newUser: string) => {
    userService.setCurrentUser(newUser);
    setCurrentUser(newUser);
  };

  return {
    currentUser,
    switchUser,
  };
}