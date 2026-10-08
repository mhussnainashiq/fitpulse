import { Bell, Menu, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onMenu }) {
  const { user } = useAuth();
  return (
    <header className="topbar">
      <button className="mobile-menu icon-btn" onClick={onMenu}><Menu size={22} /></button>
      <div className="topbar-search"><Search size={18} /><input placeholder="Search workouts, goals..." /></div>
      <div className="topbar-actions">
        <button className="icon-btn notification"><Bell size={19} /><span /></button>
        <div className="topbar-user">
          <div className="avatar">{user?.name?.charAt(0)?.toUpperCase() || "A"}</div>
          <div><strong>{user?.name || "Alex Johnson"}</strong><small>Fitness Member</small></div>
        </div>
      </div>
    </header>
  );
}