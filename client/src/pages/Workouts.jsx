import { useEffect, useMemo, useState } from "react";
import { Dumbbell, Plus, Search, Pencil, Trash2, Flame, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { workoutService } from "../services/workoutService";
import EmptyState from "../components/EmptyState";

export default function Workouts() {
  const [items,setItems]=useState([]),[search,setSearch]=useState(""),[type,setType]=useState("All"),[loading,setLoading]=useState(true),[error,setError]=useState("");
  async function load(){try{setLoading(true);setItems(await workoutService.list())}catch(e){setError(e.response?.data?.message||"Unable to load workouts.")}finally{setLoading(false)}}
  useEffect(()=>{load()},[]);
  async function remove(id){if(!confirm("Delete this workout?"))return;try{await workoutService.remove(id);setItems(items.filter(x=>x._id!==id))}catch(e){setError(e.response?.data?.message||"Delete failed.")}}
  const filtered=useMemo(()=>items.filter(x=>(type==="All"||x.type===type)&&x.name.toLowerCase().includes(search.toLowerCase())),[items,search,type]);
  return <div>
    <div className="page-heading"><div><span className="eyebrow">ACTIVITY</span><h1>Workouts</h1><p>Log and manage your training sessions.</p></div><Link className="btn btn-primary" to="/workouts/add"><Plus size={18}/> Add Workout</Link></div>
    {error&&<div className="alert error">{error}</div>}
    <div className="toolbar"><div className="search-box"><Search size={17}/><input placeholder="Search workouts..." value={search} onChange={e=>setSearch(e.target.value)}/></div><select value={type} onChange={e=>setType(e.target.value)}><option>All</option>{["Strength","Cardio","HIIT","Yoga","Running","Cycling","Swimming","Walking","Other"].map(x=><option key={x}>{x}</option>)}</select></div>
    {loading?<div className="screen-loader">Loading workouts...</div>:filtered.length?<div className="workout-grid">{filtered.map(w=><article className="workout-card" key={w._id}><div className="workout-card-top"><div className="workout-icon"><Dumbbell size={19}/></div><span className={`pill ${w.intensity.toLowerCase()}`}>{w.intensity}</span></div><h3>{w.name}</h3><p className="muted">{w.type} · {new Date(w.date).toLocaleDateString()}</p><div className="workout-metrics"><span><Clock3 size={15}/>{w.duration} min</span><span><Flame size={15}/>{w.caloriesBurned} kcal</span></div><div className="card-actions"><Link className="btn btn-light" to={`/workouts/${w._id}/edit`}><Pencil size={15}/> Edit</Link><button className="btn btn-danger" onClick={()=>remove(w._id)}><Trash2 size={15}/> Delete</button></div></article>)}</div>:<EmptyState title="No workouts found" text="Try another search or add your first workout." action={<Link className="btn btn-primary" to="/workouts/add">Add Workout</Link>}/>}
  </div>;
}