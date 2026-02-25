// import { useState } from "react";
import UserInfo from "./components/UserInfo/UserInfo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage/HomePage";
import EmployeePage from "./components/pages/EmployeePage/EmployeePage";
import TimePage from "./components/pages/TimePage/TimePage";
import LeavePage from "./components/pages/LeavePage/LeavePage";
import { useCurrentUser } from "./hooks"; // Replaced the useEmployees from hooks

function App() {
  // Shared state - current logged in user
  // Shared-page-state Refactor
  // const [currentUser, setCurrentUser] = useState("Admin");

  // T.3 Shared-page-state refactor
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

        
        {/* Navigation */}
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/time">Time Tracking</Link>
          <Link to="/leave">Leave Requests</Link>
        </nav>
    
        {/* Old Routes to be removed after T.3
        <main className="dashboard-content">
          <Routes>
            <Route path="/" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/employees" element={<EmployeePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/time" element={<TimePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/leave" element={<LeavePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          </Routes>
        </main>
        */}

        {/* New Routes */}
        <main className="dashboard-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/time" element={<TimePage />} />
            <Route path="/leave" element={<LeavePage />} />
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