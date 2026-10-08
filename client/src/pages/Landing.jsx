import { Activity, ArrowRight, BarChart3, Dumbbell, ShieldCheck, Target, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <Link to="/" className="brand"><span className="brand-mark"><Activity size={20}/></span>FitPulse</Link>
        <div><Link className="text-link" to="/login">Login</Link><Link className="btn btn-primary" to="/register">Get Started</Link></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">FULL-STACK FITNESS PLATFORM</span>
          <h1>Track your fitness.<br/><em>Build better habits.</em></h1>
          <p>FitPulse brings workouts, nutrition, goals and progress analytics together in one focused fitness dashboard.</p>
          <div className="hero-actions"><Link className="btn btn-primary btn-lg" to="/register">Start Tracking <ArrowRight size={18}/></Link><Link className="btn btn-light btn-lg" to="/login">Sign In</Link></div>
          <div className="hero-proof"><ShieldCheck size={18}/> Secure account & private fitness data</div>
        </div>
        <div className="hero-dashboard">
          <div className="mini-header"><span>Activity Dashboard</span><span className="status-dot">● Live</span></div>
          <p className="muted">Welcome back, Alex!</p>
          <div className="mini-stats">
            <div><strong>2,345</strong><span>Calories</span></div>
            <div><strong>320</strong><span>Active min</span></div>
            <div><strong>8,420</strong><span>Steps</span></div>
          </div>
          <div className="mini-chart"><div className="chart-bars"><i/><i/><i/><i/><i/><i/><i/></div><span>Weekly activity</span></div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading"><span className="eyebrow">EVERYTHING IN ONE PLACE</span><h2>Your fitness, organized.</h2><p>Make consistent progress with tools designed around the habits that matter.</p></div>
        <div className="feature-grid">
          {[
            [Dumbbell,"Workout Tracking","Log workouts, duration, intensity and calories burned."],
            [BarChart3,"Progress Analytics","Understand trends with clear charts and weekly insights."],
            [Target,"Smart Goals","Set targets for workouts, steps, calories and more."],
            [Utensils,"Nutrition Log","Keep your daily calories and macros visible."]
          ].map(([Icon,title,text]) => <div className="feature-card" key={title}><div className="feature-icon"><Icon size={21}/></div><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </section>

      <footer className="landing-footer">© 2026 FitPulse · Track your fitness, one day at a time.</footer>
    </div>
  );
}