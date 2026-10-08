import { useState } from "react";
import { Activity, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login.");
    } finally { setSaving(false); }
  }

  return <div className="auth-page">
    <div className="auth-card">
      <Link to="/" className="brand auth-brand"><span className="brand-mark"><Activity size={20}/></span>FitPulse</Link>
      <h1>Welcome back</h1><p className="muted">Sign in to continue tracking your fitness.</p>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={submit} className="form-stack">
        <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
        <label>Password<div className="password-field"><input type={show?"text":"password"} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••"/><button type="button" className="icon-btn" onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
        <button className="btn btn-primary full" disabled={saving}>{saving ? "Signing in..." : "Sign In"}</button>
      </form>
      <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
    </div>
  </div>;
}