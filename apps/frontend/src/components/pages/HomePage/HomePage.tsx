import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useEmployees } from "../../../hooks";

export default function HomePage() {
  const { employees } = useEmployees();
  const { user } = useUser();

  return (
    <section style={{ padding: '20px' }}>
      <h2>Welcome to PIXELL-River Financial Dashboard</h2>
      
      {/* What a Guest sees */}
      <SignedOut>
        <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '5px', marginTop: '20px' }}>
          <p>Welcome, Guest!</p>
          <p>Please log in using the navigation bar above to access the employee directory, track time, and manage leave requests.</p>
        </div>
      </SignedOut>

      {/* What a Logged-in User sees */}
      <SignedIn>
        <p>Hello, {user?.firstName || 'Team Member'}!</p>
        <p>Select a section from the navigation to get started.</p>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e2e8f0', borderRadius: '8px' }}>
          <h3>Company Overview</h3>
          <p>Total Employees in System: {employees.length}</p>
        </div>
      </SignedIn>
    </section>
  );
}