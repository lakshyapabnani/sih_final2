export default function TopNav({ portal, setPortal }) {
  return (
    <div className="top-nav">
      <div className="brand">MedSupply Network</div>
      <div className="portal-switch">
        <button
          className={portal === "hospital" ? "active" : ""}
          onClick={() => setPortal("hospital")}
        >
          Hospital Portal
        </button>
        <button
          className={portal === "vendor" ? "active" : ""}
          onClick={() => setPortal("vendor")}
        >
          Vendor Portal
        </button>
      </div>
    </div>
  );
}
