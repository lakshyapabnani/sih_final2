import { useState } from "react";
import CatalogTab from "./CatalogTab.jsx";
import SurgedRequestsTab from "./SurgedRequestsTab.jsx";
import DeliveryStatusTab from "./DeliveryStatusTab.jsx";

const TABS = [
  { id: "catalog", label: "Inventory Catalog" },
  { id: "surged", label: "Surged & Requested Items" },
  { id: "delivery", label: "Delivery Status" },
];

export default function VendorPortal({ season }) {
  const [tab, setTab] = useState("catalog");

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
        {tab === "catalog" && <CatalogTab />}
        {tab === "surged" && <SurgedRequestsTab season={season} />}
        {tab === "delivery" && <DeliveryStatusTab />}
      </div>
    </>
  );
}
