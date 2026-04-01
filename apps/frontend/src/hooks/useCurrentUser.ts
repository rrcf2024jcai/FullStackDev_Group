import { useUserContext } from "../context/userContext";

export function useCurrentUser() {
  return useUserContext();
}
