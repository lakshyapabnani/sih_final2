import BrandLockup from "./BrandLockup.jsx";

export default function LandingPage({ onSelectPortal }) {
  return (
    <div className="auth-shell">
      <main className="landing-panel">
        <BrandLockup />
        <div className="landing-copy">
          <h1>Medicine supply coordination for hospitals and vendors</h1>
          <p>
            Sign in to the correct portal to manage inventory, demand alerts,
            vendor coordination, and emergency contingency transfers.
          </p>
        </div>

        <div className="portal-choice-grid">
          <section className="portal-choice">
            <h2>Sign In as Hospital</h2>
            <p>Access medicine inventory, alerts, requests, and the contingency network.</p>
            <button className="btn btn-primary" onClick={() => onSelectPortal("hospital")}>
              Sign In as Hospital Portal
            </button>
          </section>

          <section className="portal-choice">
            <h2>Sign In as Vendor</h2>
            <p>Access vendor catalog, surged item requests, and delivery status.</p>
            <button className="btn btn-primary" onClick={() => onSelectPortal("vendor")}>
              Sign In as Vendor Portal
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
