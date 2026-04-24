import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { useRole } from "../../../context/RoleContext";

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

type NavTile = {
  label: string;
  desc: string;
  to: string;
  icon: ReactNode;
  adminOnly?: boolean;
};

const TILES: NavTile[] = [
  {
    label: "Employees",
    desc: "Browse the employee directory and manage team members.",
    to: "/employees",
    icon: <UsersIcon />,
    adminOnly: true,
  },
  {
    label: "Clock In & Out",
    desc: "Clock in and out, view attendance history, and manage your work hours.",
    to: "/time",
    icon: <ClockIcon />,
  },
  {
    label: "Leave Requests",
    desc: "Submit, track, and manage time-off requests in one place.",
    to: "/leave",
    icon: <CalendarIcon />,
  },
];

export default function HomePage() {
  const { user } = useUser();
  const { role } = useRole();

  const visibleTiles = TILES.filter(
    (tile) => !tile.adminOnly || role === "Admin" || role === "Manager"
  );

  return (
    <div className="dashboard-container">

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Dashboard
        </div>
        <h1>Welcome to TimePilot</h1>
        <p>Your central hub for workforce management, time tracking, and leave operations.</p>
      </div>

      {/* Guest View */}
      <SignedOut>
        <div className="guest-card">
          <h3>Welcome, Guest!</h3>
          <p>
            Please log in using the sidebar to access the employee directory,
            track time, and manage leave requests.
          </p>
        </div>
      </SignedOut>

      {/* Signed-In View */}
      <SignedIn>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--text-muted)" }}>
          Hello, <strong style={{ color: "var(--text-main)" }}>{user?.firstName || "Team Member"}</strong>!
          Select a section below to get started.
        </p>

        <div className="role-badge-card">
          <span className="role-label">Access Level</span>
          <span className="role-value">{role}</span>
        </div>

        <div className="nav-tiles-grid">
          {visibleTiles.map((tile) => (
            <NavLink key={tile.to} to={tile.to} className="nav-tile">
              <div className="nav-tile-icon">{tile.icon}</div>
              <div className="nav-tile-title">{tile.label}</div>
              <div className="nav-tile-desc">{tile.desc}</div>
            </NavLink>
          ))}
        </div>
      </SignedIn>

    </div>
  );
}
