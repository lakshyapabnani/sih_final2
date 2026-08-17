import { useState } from "react";
import Badge from "../Shared/Badge.jsx";
import VendorScorecardModal from "../Shared/VendorScorecardModal.jsx";
import { vendors } from "../../data/mockData.js";

export default function VendorRankingsTab() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h1>Vendor Directory</h1>
      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Tier / Score</th>
              <th>Active Contracts</th>
              <th>Primary Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                <td>{v.name}</td>
                <td>
                  <Badge label={v.tier} /> <span style={{ marginLeft: 6 }}>{v.score}/100</span>
                </td>
                <td>{v.activeContracts}</td>
                <td>{v.category}</td>
                <td>
                  <button className="btn" onClick={() => setSelected(v)}>
                    Trust Score
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <VendorScorecardModal vendor={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
