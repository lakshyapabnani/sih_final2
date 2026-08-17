import Badge from "./Badge.jsx";

function Pillar({ label, value }) {
  return (
    <div className="pillar">
      <div className="pillar-label">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>
      <div className="pillar-bar-bg">
        <div className="pillar-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function VendorScorecardModal({ vendor, onClose }) {
  if (!vendor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{vendor.name}</h2>
          <button onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span className="score-badge">{vendor.tier} Tier — {vendor.score}/100</span>
          </div>

          <h3>Pillar Breakdown</h3>
          <Pillar label="Cost Competitiveness" value={vendor.pillars.cost} />
          <Pillar label="On-Time Delivery Rate" value={vendor.pillars.delivery} />
          <Pillar label="Quality Compliance" value={vendor.pillars.quality} />

          <h3>Strengths & Weaknesses</h3>
          <div className="summary-box">{vendor.summary}</div>

          <h3>Historical Order Log</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Destination</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vendor.history.map((h) => (
                <tr key={h.id}>
                  <td>{h.date}</td>
                  <td>{h.hospital}</td>
                  <td>{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
