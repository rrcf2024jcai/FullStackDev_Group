export interface SharedStateProps {
    currentUser: string;
    setCurrentUser: (user: string) => void;
  }

// Employee type for I.1, I.2, I.3
export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
}