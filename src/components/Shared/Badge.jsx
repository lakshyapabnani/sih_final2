const statusClass = {
  Critical: "badge-critical",
  Low: "badge-low",
  Adequate: "badge-adequate",
  Surplus: "badge-surplus",
  Gold: "badge-gold",
  Silver: "badge-silver",
  Bronze: "badge-bronze",
};

export default function Badge({ label }) {
  const cls = statusClass[label] || "badge-adequate";
  return <span className={`badge ${cls}`}>{label}</span>;
}
