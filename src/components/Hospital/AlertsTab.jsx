import { initialSurgeAlerts, seasonalAlerts } from "../../data/mockData.js";

export default function AlertsTab({ season }) {
  const active = seasonalAlerts[season];

  return (
    <div>
      <h1>Surge & Emergency Alerts</h1>

      {active && (
        <div className="panel">
          <div className="panel-header">Alert</div>
          <div style={{ padding: 16 }}>
            <div className="summary-box">{active}</div>
          </div>
        </div>
      )}

      <div className="panel">
        <div className="panel-header">Recommended Actions</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Alert</th>
              <th>Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {initialSurgeAlerts.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
