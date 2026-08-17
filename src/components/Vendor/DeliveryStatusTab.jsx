import { useState } from "react";
import {
  vendorCatalog,
  initialInTransit,
  initialDelivered,
} from "../../data/mockData.js";

const SUBTABS = [
  { id: "catalog", label: "Catalog" },
  { id: "transit", label: "Delivering (In-Transit)" },
  { id: "delivered", label: "Delivered" },
];

export default function DeliveryStatusTab() {
  const [sub, setSub] = useState("transit");

  return (
    <div>
      <h1>Delivery Status</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {SUBTABS.map((s) => (
          <button
            key={s.id}
            className={`btn ${sub === s.id ? "btn-primary" : ""}`}
            onClick={() => setSub(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {sub === "catalog" && (
        <div className="panel">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Batch ID</th>
                <th>Unit Price</th>
                <th>Stock Available</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {vendorCatalog.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.batchId}</td>
                  <td>₹{c.unitPrice}</td>
                  <td>{c.stock}</td>
                  <td>{c.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sub === "transit" && (
        <div className="panel">
          {initialInTransit.length === 0 ? (
            <div className="empty-state">No active shipments.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Destination</th>
                  <th>ETA</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                </tr>
              </thead>
              <tbody>
                {initialInTransit.map((t) => (
                  <tr key={t.id}>
                    <td>{t.trackingId}</td>
                    <td>{t.destination}</td>
                    <td>{t.eta}</td>
                    <td>{t.temperature}</td>
                    <td>{t.humidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {sub === "delivered" && (
        <div className="panel">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Destination</th>
                <th>Completed At</th>
                <th>Quality Sign-Off</th>
              </tr>
            </thead>
            <tbody>
              {initialDelivered.map((d) => (
                <tr key={d.id}>
                  <td>{d.trackingId}</td>
                  <td>{d.destination}</td>
                  <td>{d.completedAt}</td>
                  <td>{d.signOff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
