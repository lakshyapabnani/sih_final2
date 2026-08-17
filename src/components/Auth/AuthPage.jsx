import { useState } from "react";
import BrandLockup from "./BrandLockup.jsx";

const portalLabel = {
  hospital: "Hospital Portal",
  vendor: "Vendor Portal",
};

export default function AuthPage({ portal, error, isLoading, onBack, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  function submit(event) {
    event.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Enter both email and password.");
      return;
    }

    onSubmit({ email, password });
  }

  return (
    <div className="auth-shell">
      <main className="auth-panel">
        <BrandLockup compact />
        <h1>{portalLabel[portal]} Sign In</h1>

        <form onSubmit={submit}>
          <div className="form-row auth-form-row">
            <input
              autoComplete="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-row auth-form-row">
            <input
              autoComplete="current-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {(formError || error) && <div className="summary-box auth-error">{formError || error}</div>}

          <button className="btn btn-primary auth-submit" disabled={isLoading} type="submit">
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <button className="btn auth-secondary" onClick={onBack} type="button">
          Back to Portal Selection
        </button>
      </main>
    </div>
  );
}
