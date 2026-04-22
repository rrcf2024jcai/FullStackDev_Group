import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "./App.css";
import UserInfo from "./components/UserInfo/UserInfo";
// Import Pages
import HomePage from "./components/pages/HomePage/HomePage";
import EmployeePage from "./components/pages/EmployeePage/EmployeePage";
import TimePage from "./components/pages/TimePage/TimePage";
import LeavePage from "./components/pages/LeavePage/LeavePage";
import { useCurrentUser } from "./hooks";  
import Nav from "./components/layout/nav/Nav";

function App() {
  const {currentUser} = useCurrentUser();

  return (
    <BrowserRouter>
      <div className="app-container">

        {/* Old Header with Application Title
        <header className="main-header" style={{ backgroundColor: '#1E3A8A', color: 'white' }}>
          <h1>TimePilot</h1>
          <span className="user-info" style={{ opacity: 0.9 }}>Logged in as: {currentUser}</span>
        </header>
        */}

        {/* New Header with Application Title */}
        <header className="main-header">
          <h1>TimePilot</h1>
          <UserInfo currentUser={currentUser} />
        </header>

{/* Our new navigation bar with Clerk Auth */}
        <Nav />

        <main className="dashboard-content">
          <Routes>
            {/* Public Route: Anyone can see the Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Protected Route: Employees */}
            <Route path="/employees" element={
              <>
                <SignedIn><EmployeePage /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />

            {/* Protected Route: Time */}
            <Route path="/time" element={
              <>
                <SignedIn><TimePage /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />

            {/* Protected Route: Leave */}
            <Route path="/leave" element={
              <>
                <SignedIn><LeavePage /></SignedIn>
                <SignedOut><RedirectToSignIn /></SignedOut>
              </>
            } />
          </Routes>
        </main>

        {/* Footer with Group Member Names */}
        <footer className="main-footer" style={{ backgroundColor: '#F1F5F9', color: '#333', borderTop: '1px solid #ccc'}}>
          <p>
            &copy; 2026 Developed by: <strong>Chenyang Ma, Alyssa Urquiola, Jiyu Cai</strong>
          </p>
        </footer>
        
      </div>
    </BrowserRouter>
  );
}

export default App;