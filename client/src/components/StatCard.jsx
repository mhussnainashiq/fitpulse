export default function StatCard({ icon: Icon, label, value, unit, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={20} /></div>
      <div>
        <p className="muted">{label}</p>
        <h3>{value} <span>{unit}</span></h3>
        {trend && <small className="trend">{trend}</small>}
      </div>
    </div>
  );
}