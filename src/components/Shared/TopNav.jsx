import BrandLockup from "../Auth/BrandLockup.jsx";

export default function TopNav({ portal, setPortal, onLogout }) {
  return (
    <div className="top-nav">
      <BrandLockup compact />
      <div className="portal-switch">
        {setPortal && (
          <>
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
          </>
        )}
        {!setPortal && (
          <button className="active" type="button">
            {portal === "hospital" ? "Hospital Portal" : "Vendor Portal"}
          </button>
        )}
        {onLogout && (
          <button onClick={onLogout} type="button">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
