import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useRole, Role } from "../../../context/RoleContext";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

type NavItem = {
  label: string;
  to: string;
  icon: ReactNode;
  adminOnly?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/", icon: <HomeIcon /> },
  { label: "Employees", to: "/employees", icon: <UsersIcon />, adminOnly: true },
  { label: "Clock In & Out", to: "/time", icon: <ClockIcon /> },
  { label: "Leave Requests", to: "/leave", icon: <CalendarIcon /> },
];

export default function Nav() {
  const { role, setRole } = useRole();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || role === "Admin" || role === "Manager"
  );

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-dot" />
        <h2>TimePilot</h2>
      </div>

      {/* Nav Links */}
      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Navigation</span>
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        <span className="sidebar-section-label">Account</span>
        <div style={{ padding: "0.55rem var(--space-md)", display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Log In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Role Switcher Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-label">Viewing as</div>
        <select
          className="role-dropdown"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
    </aside>
  );
}
