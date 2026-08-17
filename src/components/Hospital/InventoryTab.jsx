import { useState } from "react";
import Badge from "../Shared/Badge.jsx";
import {
  inventory as initialInventory,
  nearbyHospitalsWithSurplus,
  approvedVendorsForDrug,
} from "../../data/mockData.js";

function SurgeModal({ item, onClose }) {
  const [sent, setSent] = useState(null);
  if (!item) return null;

  const surplusHospitals = nearbyHospitalsWithSurplus[item.id] || [];
  const approvedVendors = approvedVendorsForDrug[item.id] || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Ask for Surge — {item.name}</h2>
          <button onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          {sent && <div className="summary-box">Request sent to {sent}.</div>}

          <h3>Nearby Hospitals with Surplus Stock</h3>
          {surplusHospitals.length === 0 && (
            <p style={{ color: "var(--gray-600)", fontSize: 13 }}>No surplus found nearby.</p>
          )}
          <table className="data-table">
            <tbody>
              {surplusHospitals.map((h) => (
                <tr key={h.hospital}>
                  <td>{h.hospital}</td>
                  <td>{h.quantity} units available</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => setSent(h.hospital)}>
                      Send Transfer Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: 20 }}>Approved Vendors</h3>
          {approvedVendors.length === 0 && (
            <p style={{ color: "var(--gray-600)", fontSize: 13 }}>No approved vendors for this item.</p>
          )}
          <table className="data-table">
            <tbody>
              {approvedVendors.map((v) => (
                <tr key={v.id}>
                  <td>{v.name}</td>
                  <td><Badge label={v.tier} /></td>
                  <td>
                    <button className="btn btn-primary" onClick={() => setSent(v.name)}>
                      Send Purchase Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function InventoryTab() {
  const [inventory] = useState(initialInventory);
  const [surgeItem, setSurgeItem] = useState(null);

  return (
    <div>
      <h1>Medicine Inventory</h1>
      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Category</th>
              <th>Batch ID</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className={item.status === "Critical" ? "row-critical" : ""}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.batchId}</td>
                <td>{item.quantity}</td>
                <td>{item.expiry}</td>
                <td><Badge label={item.status} /></td>
                <td>
                  <button className="btn" onClick={() => setSurgeItem(item)}>
                    Ask for Surge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SurgeModal item={surgeItem} onClose={() => setSurgeItem(null)} />
    </div>
  );
}
