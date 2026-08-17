import { useState } from "react";
import InventoryTab from "./InventoryTab.jsx";
import VendorRankingsTab from "./VendorRankingsTab.jsx";
import IncomingRequestsTab from "./IncomingRequestsTab.jsx";
import AlertsTab from "./AlertsTab.jsx";
import ContingencyNetworkTab from "./ContingencyNetworkTab.jsx";

const TABS = [
  { id: "inventory", label: "Inventory" },
  { id: "rankings", label: "Vendor Rankings" },
  { id: "requests", label: "Incoming Requests" },
  { id: "alerts", label: "Surge Alerts" },
  { id: "contingency", label: "Contingency Network" },
];

export default function HospitalPortal({ season }) {
  const [tab, setTab] = useState("inventory");

  return (
    <>
      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? "active" : ""}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="content">
        {tab === "inventory" && <InventoryTab />}
        {tab === "rankings" && <VendorRankingsTab />}
        {tab === "requests" && <IncomingRequestsTab />}
        {tab === "alerts" && <AlertsTab season={season} />}
        {tab === "contingency" && <ContingencyNetworkTab />}
      </div>
    </>
  );
}
