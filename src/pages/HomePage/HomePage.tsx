import { SharedStateProps } from "../../types";

function HomePage({ currentUser, setCurrentUser }: SharedStateProps) {
  return (
    <section>
      <h2>Welcome to PIXELL-River Financial Dashboard</h2>
      <p>Select a section from the navigation to get started.</p>
      
      {/* Display shared state */}
      <p>Current User: {currentUser}</p>
      
      {/* Modify shared state */}
      <div>
        <label>Switch User: </label>
        <select 
          value={currentUser} 
          onChange={(e) => setCurrentUser(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
    </section>
  );
}

export default HomePage;