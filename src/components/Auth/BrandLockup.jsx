export default function BrandLockup({ compact = false }) {
  return (
    <div className={compact ? "brand-lockup brand-lockup-compact" : "brand-lockup"}>
      <img src="/assets/medsupply-logo.jpeg" alt="MedSupply Network logo" />
      <span>MedSupply Network</span>
    </div>
  );
}
