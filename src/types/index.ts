export interface SharedStateProps {
    currentUser: string;
    setCurrentUser: (user: string) => void;
  }

// Employee type  
export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
}