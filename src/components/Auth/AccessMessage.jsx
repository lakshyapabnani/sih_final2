import BrandLockup from "./BrandLockup.jsx";

export default function AccessMessage({ title, message, onBack, onLogout }) {
  return (
    <div className="auth-shell">
      <main className="auth-panel">
        <BrandLockup compact />
        <h1>{title}</h1>
        <div className="summary-box">{message}</div>
        <button className="btn btn-primary auth-submit" onClick={onBack} type="button">
          Back to Portal Selection
        </button>
        {onLogout && (
          <button className="btn auth-secondary" onClick={onLogout} type="button">
            Logout
          </button>
        )}
      </main>
    </div>
  );
}
