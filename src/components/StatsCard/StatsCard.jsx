import './StatsCard.css';

function StatsCard({ label, value, color }) {
  return (
    <div className="stats-card">
      <div className="stats-card-indicator" style={{ backgroundColor: color }} />
      <div className="stats-card-value" style={{ color }}>{value}</div>
      <div className="stats-card-label">{label}</div>
    </div>
  );
}

export default StatsCard;
