export default function LandingPage({ onSelectPortal }) {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-brand">
          <img src="/assets/medsupply-logo.jpeg" alt="MedSupply Network logo" />
          <span>MedSupply Network</span>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-copy">
            <h1>MedSupply Network</h1>
            <p>
              Healthcare supply network connecting hospitals and medical suppliers,
              helping teams streamline procurement, availability, and urgent stock
              coordination.
            </p>
            <div className="landing-actions">
              <button className="btn btn-primary" onClick={() => onSelectPortal("hospital")}>
                As Hospital
              </button>
              <button className="btn" onClick={() => onSelectPortal("vendor")}>
                As Vendor
              </button>
            </div>
          </div>
          <div className="landing-summary" aria-label="Platform capabilities">
            <div>
              <strong>Inventory visibility</strong>
              <span>Track critical stock and medicine availability.</span>
            </div>
            <div>
              <strong>Supplier coordination</strong>
              <span>Connect hospitals with approved medical vendors.</span>
            </div>
            <div>
              <strong>Contingency network</strong>
              <span>Find nearby hospital support during shortages.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
