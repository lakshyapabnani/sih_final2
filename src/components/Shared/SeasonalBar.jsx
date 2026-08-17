import { useState, useEffect } from "react";
import { seasons, seasonalAlerts } from "../../data/mockData.js";

export default function SeasonalBar({ season, setSeason }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(false);
  }, [season]);

  const alertText = seasonalAlerts[season];

  return (
    <>
      <div className="seasonal-bar">
        <label htmlFor="season-select">Calendar Simulation:</label>
        <select
          id="season-select"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          {seasons.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      {alertText && !dismissed && (
        <div className="alert-banner">
          <span> {alertText}</span>
          <button onClick={() => setDismissed(true)} aria-label="Dismiss alert">
            ×
          </button>
        </div>
      )}
    </>
  );
}
