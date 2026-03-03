import { createContext, useContext, useState, ReactNode } from "react";
import * as userService from "../services/userService";

type UserContextType = {
  currentUser: string;
  switchUser: (newUser: string) => void;
};

const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<string>(
    userService.getCurrentUser()
  );

  const switchUser = (newUser: string) => {
    userService.setCurrentUser(newUser);
    setCurrentUser(newUser);
  };

  return (
    <UserContext.Provider value={{ currentUser, switchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used inside a UserProvider");
  }
  return ctx;
}