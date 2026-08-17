import { useState } from "react";
import { initialIncomingRequests } from "../../data/mockData.js";

export default function IncomingRequestsTab() {
  const [requests, setRequests] = useState(initialIncomingRequests);

  function updateStatus(id, status) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <div>
      <h1>Incoming Requests</h1>
      <div className="panel">
        {requests.length === 0 ? (
          <div className="empty-state">No incoming requests.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.type}</td>
                  <td>{r.from}</td>
                  <td>{r.item}</td>
                  <td>{r.quantity}</td>
                  <td>{r.status}</td>
                  <td>
                    {r.status === "Pending" ? (
                      <>
                        <button
                          className="btn btn-primary"
                          style={{ marginRight: 6 }}
                          onClick={() => updateStatus(r.id, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => updateStatus(r.id, "Declined")}
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
