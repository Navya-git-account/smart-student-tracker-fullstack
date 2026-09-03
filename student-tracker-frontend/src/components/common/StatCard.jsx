export default function StatCard({value,label,helper}) {
  return <article className="stat-card">
    <strong className="stat-value">{value}</strong>
    <span className="stat-label">{label}</span>
    {helper && <span className="stat-helper">{helper}</span>}
  </article>;
}
