import BrandLockup from "./BrandLockup.jsx";

export default function RoleSelectionPage({ error, isLoading, onLogout, onSelectRole }) {
  return (
    <div className="auth-shell">
      <main className="landing-panel">
        <BrandLockup />
        <div className="landing-copy">
          <h1>Choose your portal role</h1>
          <p>
            Select the portal this account should use. This is saved to your profile
            and will be used for future sign-ins.
          </p>
        </div>

        {error && <div className="summary-box auth-error">{error}</div>}

        <div className="portal-choice-grid">
          <section className="portal-choice">
            <h2>Continue as Hospital</h2>
            <p>Use hospital inventory, alerts, requests, and contingency workflows.</p>
            <button
              className="btn btn-primary"
              disabled={isLoading}
              onClick={() => onSelectRole("hospital")}
              type="button"
            >
              Continue as Hospital
            </button>
          </section>

          <section className="portal-choice">
            <h2>Continue as Vendor</h2>
            <p>Use vendor catalog, surged request, and delivery workflows.</p>
            <button
              className="btn btn-primary"
              disabled={isLoading}
              onClick={() => onSelectRole("vendor")}
              type="button"
            >
              Continue as Vendor
            </button>
          </section>
        </div>

        <button className="btn auth-secondary" onClick={onLogout} type="button">
          Logout
        </button>
      </main>
    </div>
  );
}
