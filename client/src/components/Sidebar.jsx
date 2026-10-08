import { NavLink } from "react-router-dom";
import { Activity, BarChart3, CalendarDays, CircleUserRound, Dumbbell, Flag, LayoutDashboard, LogOut, Settings, Utensils, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  ["/dashboard", LayoutDashboard, "Dashboard"],
  ["/workouts", Dumbbell, "Workouts"],
  ["/progress", BarChart3, "Progress"],
  ["/goals", Flag, "Goals"],
  ["/nutrition", Utensils, "Nutrition"],
  ["/calendar", CalendarDays, "Calendar"],
  ["/settings", Settings, "Settings"]
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth();

  return (
    <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-mark"><Activity size={21} /></div>
        <span>FitPulse</span>
        <button className="icon-btn sidebar-close" onClick={onClose}><X size={20} /></button>
      </div>

      <p className="nav-label">WORKSPACE</p>
      <nav>
        {links.map(([to, Icon, label]) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="avatar"><CircleUserRound size={19} /></div>
        <div className="user-mini">
          <strong>{user?.name || "Alex Johnson"}</strong>
          <span>Level {user?.fitnessLevel || 12}</span>
        </div>
        <button className="icon-btn" onClick={logout} title="Logout"><LogOut size={17} /></button>
      </div>
    </aside>
  );
}