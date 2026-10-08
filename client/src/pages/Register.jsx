import { useState } from "react";
import { Activity, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirmPassword:"" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setSaving(true);
    try { await register(form); navigate("/dashboard"); }
    catch (err) { setError(err.response?.data?.message || "Unable to create account."); }
    finally { setSaving(false); }
  }

  return <div className="auth-page">
    <div className="auth-card">
      <Link to="/" className="brand auth-brand"><span className="brand-mark"><Activity size={20}/></span>FitPulse</Link>
      <h1>Create your account</h1><p className="muted">Start building consistent fitness habits.</p>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={submit} className="form-stack">
        <label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Alex Johnson"/></label>
        <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>
        <label>Password<div className="password-field"><input type={show?"text":"password"} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="At least 6 characters"/><button type="button" className="icon-btn" onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
        <label>Confirm password<input type={show?"text":"password"} required value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})}/></label>
        <button className="btn btn-primary full" disabled={saving}>{saving ? "Creating account..." : "Create Account"}</button>
      </form>
      <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  </div>;
}