import { useState } from "react";
import { initialSurgedRequests, seasonalAlerts } from "../../data/mockData.js";

const urgencyClass = {
  Critical: "urgency-critical",
  High: "urgency-high",
  Medium: "urgency-medium",
  Low: "urgency-low",
};

export default function SurgedRequestsTab({ season }) {
  const [requests, setRequests] = useState(initialSurgedRequests);
  const activeAlert = seasonalAlerts[season];

  function fulfill(id) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "In-Transit" } : r))
    );
  }

  return (
    <div>
      <h1>Surged & Requested Items</h1>

      {activeAlert && (
        <div className="summary-box" style={{ marginBottom: 16 }}>
          {activeAlert}
        </div>
      )}

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>Requested Drug</th>
              <th>Quantity</th>
              <th>Urgency</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.hospital}</td>
                <td>{r.item}</td>
                <td>{r.quantity}</td>
                <td className={urgencyClass[r.urgency]}>{r.urgency}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === "Pending" ? (
                    <button className="btn btn-primary" onClick={() => fulfill(r.id)}>
                      Fulfill Order & Move to In-Transit
                    </button>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
