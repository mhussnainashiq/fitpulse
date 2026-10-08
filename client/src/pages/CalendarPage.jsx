import { CalendarDays, CheckCircle2 } from "lucide-react";

export default function CalendarPage(){
 const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
 const cells=Array.from({length:35},(_,i)=>({n:i-2,active:[5,9,14,18,21,27,31].includes(i)}));
 return <div><div className="page-heading"><div><span className="eyebrow">CONSISTENCY</span><h1>Calendar</h1><p>See your activity rhythm at a glance.</p></div></div><section className="panel calendar-panel"><div className="calendar-head"><button className="btn btn-light">‹</button><h2>May 2026</h2><button className="btn btn-light">›</button></div><div className="calendar-week">{days.map(d=><strong key={d}>{d}</strong>)}</div><div className="calendar-grid">{cells.map((x,i)=><div className={`calendar-cell ${x.n<1||x.n>31?"muted-cell":""}`} key={i}><span>{x.n>0&&x.n<=31?x.n:""}</span>{x.active&&<CheckCircle2 size={15}/>}</div>)}</div><div className="calendar-legend"><span><i/> Workout completed</span><span><i className="empty-dot"/> Rest / no activity</span></div></section></div>;
}