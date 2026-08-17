import { useState } from "react";
import TopNav from "./components/Shared/TopNav.jsx";
import SeasonalBar from "./components/Shared/SeasonalBar.jsx";
import HospitalPortal from "./components/Hospital/HospitalPortal.jsx";
import VendorPortal from "./components/Vendor/VendorPortal.jsx";
import LandingPage from "./components/Landing/LandingPage.jsx";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [portal, setPortal] = useState("hospital");
  const [season, setSeason] = useState("normal");

  function enterPortal(nextPortal) {
    setPortal(nextPortal);
    setShowLanding(false);
  }

  if (showLanding) {
    return <LandingPage onSelectPortal={enterPortal} />;
  }

  return (
    <div className="app">
      <TopNav portal={portal} setPortal={setPortal} />
      <SeasonalBar season={season} setSeason={setSeason} />
      {portal === "hospital" ? (
        <HospitalPortal season={season} />
      ) : (
        <VendorPortal season={season} />
      )}
    </div>
  );
}
