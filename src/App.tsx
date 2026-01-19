import "./App.css";
import ClockInOut from "./components/ClockIn-Out_alyssa/ClockInOut";
import EmployeeList from "./components/component_chenyang/EmployeeList";
import LeaveRequests from "./components/LeaveRequests_jiyu/LeaveRequests";

function App() {
  return (
    <div className="app-container">
      {/* Main Dashboard Header */}
      <header className="main-header">
        <h1>PIXELL-River Financial Dashboard</h1>
        <span className="user-info">Admin View</span>
      </header>

      <main className="dashboard-content">
        {/* Widget 1: Time Tracking */}
        <div className="widget-container">
          <ClockInOut />
        </div>

        {/* Widget 2: Employee Directory */}
        <div className="widget-container">
          <EmployeeList />
        </div>

        {/* Widget 3: Leave Management */}
        <div className="widget-container">
          <LeaveRequests />
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <p>&copy; 2026 PIXELL-River Financial Systems. Internal Use Only.</p>
      </footer>
    </div>
  );
}

export default App;
