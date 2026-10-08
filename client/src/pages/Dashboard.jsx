import { useEffect, useState } from "react";
import { Activity, Clock3, Dumbbell, Flame, Footprints, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { dashboardService } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";

const fallback = {
  stats:{caloriesBurned:0,activeMinutes:0,steps:0,workouts:0},
  recentWorkouts:[],
  weeklyCalories:[]
};

export default function Dashboard() {
  const { user } = useAuth();
  const [data,setData] = useState(fallback);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{ dashboardService.summary().then(setData).catch(e=>setError(e.response?.data?.message||"Could not load dashboard.")).finally(()=>setLoading(false)); },[]);

  if (loading) return <div className="screen-loader">Loading your dashboard...</div>;

  return <div>
    <div className="page-heading"><div><span className="eyebrow">ACTIVITY DASHBOARD</span><h1>Welcome back, {user?.name?.split(" ")[0] || "Alex"}!</h1><p>Keep pushing forward. Small wins become strong habits.</p></div><Link className="btn btn-primary" to="/workouts/add"><Dumbbell size={17}/> Log Workout</Link></div>
    {error && <div className="alert error">{error}</div>}

    <div className="stats-grid">
      <StatCard icon={Flame} label="Calories Burned" value={data.stats.caloriesBurned.toLocaleString()} unit="kcal" trend="+12.5% this week"/>
      <StatCard icon={Clock3} label="Active Minutes" value={data.stats.activeMinutes.toLocaleString()} unit="min" trend="+8.2% this week"/>
      <StatCard icon={Footprints} label="Steps" value={data.stats.steps.toLocaleString()} unit="" trend="+5.7% this week"/>
      <StatCard icon={Dumbbell} label="Workouts" value={data.stats.workouts} unit="" trend="This week"/>
    </div>

    <div className="dashboard-grid">
      <section className="panel chart-panel">
        <div className="panel-heading"><div><h2>Progress Overview</h2><p className="muted">Calories burned this week</p></div><span className="select-like">Calories Burned</span></div>
        <div className="chart"><ResponsiveContainer width="100%" height={280}><LineChart data={data.weeklyCalories}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day"/><YAxis/><Tooltip/><Line type="monotone" dataKey="calories" strokeWidth={3} dot={{r:4}}/></LineChart></ResponsiveContainer></div>
      </section>

      <section className="panel">
        <div className="panel-heading"><div><h2>Goal Progress</h2><p className="muted">Your weekly targets</p></div><Link to="/goals"><ArrowUpRight size={18}/></Link></div>
        <div className="goal-summary"><div><span>Weekly Goal</span><strong>{data.stats.workouts} of {user?.weeklyWorkoutGoal || 6} Workouts</strong><div className="progress-track"><i style={{width:`${Math.min(100,(data.stats.workouts/(user?.weeklyWorkoutGoal||6))*100)}%`}}/></div></div><div className="goal-big">{Math.round((data.stats.workouts/(user?.weeklyWorkoutGoal||6))*100)}%</div></div>
        <div className="nutrition-mini"><div><span>Protein</span><strong>83g</strong></div><div><span>Carbs</span><strong>210g</strong></div><div><span>Fats</span><strong>65g</strong></div></div>
      </section>
    </div>

    <div className="dashboard-grid lower">
      <section className="panel"><div className="panel-heading"><div><h2>Recent Workouts</h2><p className="muted">Your latest activity</p></div><Link to="/workouts" className="text-link">View all</Link></div>
        {data.recentWorkouts.length ? data.recentWorkouts.map(w=><div className="workout-row" key={w._id}><div className="workout-icon"><Activity size={18}/></div><div className="row-main"><strong>{w.name}</strong><span>{w.type} · {w.duration} min · {w.caloriesBurned} kcal</span></div><small>{new Date(w.date).toLocaleDateString()}</small></div>) : <EmptyState title="No workouts yet" text="Log your first workout to start seeing your activity here." action={<Link className="btn btn-primary" to="/workouts/add">Add Workout</Link>}/>}
      </section>

      <section className="panel"><div className="panel-heading"><div><h2>Weekly Activity</h2><p className="muted">Workout frequency</p></div></div>
        <div className="chart"><ResponsiveContainer width="100%" height={230}><BarChart data={data.weeklyCalories}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day"/><YAxis/><Tooltip/><Bar dataKey="workouts" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div>
      </section>
    </div>
  </div>;
}