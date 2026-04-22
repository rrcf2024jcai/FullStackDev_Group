import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Nav() {
  return (
    <nav className="main-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#e2e8f0' }}>
      
      {/* Left side: Navigation Links */}
      <div className="nav-links" style={{ display: 'flex', gap: '15px' }}>
        <Link to="/">Home</Link>
        
        {/* Only show these links to logged-in users */}
        <SignedIn>
          <Link to="/employees">Employees</Link>
          <Link to="/time">Time Tracking</Link>
          <Link to="/leave">Leave Requests</Link>
        </SignedIn>
      </div>

      {/* Right side: Login / User Profile */}
      <div className="auth-buttons">
        <SignedOut>
          {/* Clerk's built-in login button */}
          <SignInButton mode="modal">
            <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Log In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {/* Clerk's built-in user avatar and settings */}
          <UserButton />
        </SignedIn>
      </div>

    </nav>
  );
}