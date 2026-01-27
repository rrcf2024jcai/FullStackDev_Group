import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
import TimePage from "./pages/TimePage/TimePage";
import LeavePage from "./pages/LeavePage/LeavePage";

function App() {
  // T.3: Shared state - current logged in user
  const [currentUser, setCurrentUser] = useState("Admin");

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Main Dashboard Header */}
        <header className="main-header">
          <h1>PIXELL-River Financial Dashboard</h1>
          <span className="user-info">Logged in as: {currentUser}</span>
        </header>

        {/* Navigation */}
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/time">Time Tracking</Link>
          <Link to="/leave">Leave Requests</Link>
        </nav>

        {/* Routes */}
        <main className="dashboard-content">
          <Routes>
            <Route path="/" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/employees" element={<EmployeePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/time" element={<TimePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/leave" element={<LeavePage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="main-footer">
          <p>&copy; 2026 PIXELL-River Financial Systems. Internal Use Only.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
