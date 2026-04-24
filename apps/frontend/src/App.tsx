import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "./App.css";
import Nav from "./components/layout/nav/Nav";
import HomePage from "./components/pages/HomePage/HomePage";
import EmployeePage from "./components/pages/EmployeePage/EmployeePage";
import TimePage from "./components/pages/TimePage/TimePage";
import LeavePage from "./components/pages/LeavePage/LeavePage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Persistent left sidebar */}
        <Nav />

        {/* Scrollable main content */}
        <main className="main-content">
          <div className="main-content-inner">
            <Routes>
              {/* Public */}
              <Route path="/" element={<HomePage />} />

              {/* Protected: Employees */}
              <Route path="/employees" element={
                <>
                  <SignedIn><EmployeePage /></SignedIn>
                  <SignedOut><RedirectToSignIn /></SignedOut>
                </>
              } />

              {/* Protected: Time Tracking */}
              <Route path="/time" element={
                <>
                  <SignedIn><TimePage /></SignedIn>
                  <SignedOut><RedirectToSignIn /></SignedOut>
                </>
              } />

              {/* Protected: Leave */}
              <Route path="/leave" element={
                <>
                  <SignedIn><LeavePage /></SignedIn>
                  <SignedOut><RedirectToSignIn /></SignedOut>
                </>
              } />
            </Routes>
          </div>

          <footer className="app-footer">
            &copy; 2026 Developed by: <strong>Chenyang Ma, Alyssa Urquiola, Jiyu Cai</strong>
          </footer>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
