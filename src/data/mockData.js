// Mock data for MedSupply Network

export const seasons = [
  { id: "normal", label: "Normal" },
  { id: "monsoon", label: "Monsoon (June – Sep)" },
  { id: "winter", label: "Winter (Nov – Feb)" },
  { id: "summer", label: "Summer (Apr – Jun)" },
  { id: "festival", label: "Mass Gatherings" },
];

export const seasonalAlerts = {
  normal: null,
  monsoon:
    "Monsoon Alert. High demand expected for ORS, Anti-malarials, and IV fluids. Hospitals and vendors notified.",
  winter:
    "Winter Alert. High demand expected for cold and flu medication, respiratory inhalers, and thermal blankets.",
  summer:
    "Summer Alert. High demand expected for ORS, IV fluids, and heatstroke management kits.",
  festival:
    "Mass gathering nearby. High demand expected for first-aid kits, antiseptics, and trauma supplies.",
};

export const vendors = [
  {
    id: "v1",
    name: "Sunrise Pharma Distributors",
    tier: "Gold",
    score: 92,
    activeContracts: 14,
    category: "Pharmaceuticals",
    pillars: {
      cost: 88,
      delivery: 95,
      quality: 93,
    },
    summary:
      "Strong on cost competitiveness and bulk supply pricing, but prone to minor delivery delays and quality flags during peak monsoon seasons.",
    history: [
      { id: "o1", date: "2026-08-01", hospital: "City General Hospital", status: "Delivered" },
      { id: "o2", date: "2026-08-05", hospital: "Lakeside Medical Center", status: "Delivered" },
      { id: "o3", date: "2026-08-12", hospital: "St. Mary's Hospital", status: "In-Transit" },
    ],
  },
  {
    id: "v2",
    name: "Apex MedSupplies Co.",
    tier: "Silver",
    score: 78,
    activeContracts: 9,
    category: "Medical Devices",
    pillars: {
      cost: 70,
      delivery: 80,
      quality: 84,
    },
    summary:
      "Reliable quality compliance and device calibration, though pricing runs slightly above government benchmarks on bulk orders.",
    history: [
      { id: "o4", date: "2026-07-28", hospital: "City General Hospital", status: "Delivered" },
      { id: "o5", date: "2026-08-09", hospital: "Riverside Clinic", status: "Delivered" },
    ],
  },
  {
    id: "v3",
    name: "Nirvana Life Sciences",
    tier: "Gold",
    score: 89,
    activeContracts: 11,
    category: "Pharmaceuticals",
    pillars: {
      cost: 91,
      delivery: 87,
      quality: 90,
    },
    summary:
      "Consistently strong across all pillars, with a slight edge in cost competitiveness for generic drug lines.",
    history: [
      { id: "o6", date: "2026-08-03", hospital: "Lakeside Medical Center", status: "Delivered" },
      { id: "o7", date: "2026-08-14", hospital: "St. Mary's Hospital", status: "Delivered" },
    ],
  },
  {
    id: "v4",
    name: "Kavya Healthcare Traders",
    tier: "Bronze",
    score: 61,
    activeContracts: 5,
    category: "Consumables",
    pillars: {
      cost: 75,
      delivery: 55,
      quality: 58,
    },
    summary:
      "Competitive on price for consumables, but has recurring on-time delivery issues and occasional batch quality flags.",
    history: [
      { id: "o8", date: "2026-07-20", hospital: "Riverside Clinic", status: "Delivered" },
      { id: "o9", date: "2026-08-11", hospital: "City General Hospital", status: "In-Transit" },
    ],
  },
];

export const hospitals = [
  {
    id: "h1",
    name: "City General Hospital",
    address: "Fort, Mumbai, Maharashtra",
    latitude: 18.9388,
    longitude: 72.8354,
  },
  {
    id: "h2",
    name: "Lakeside Medical Center",
    address: "Marine Lines, Mumbai, Maharashtra",
    latitude: 18.9442,
    longitude: 72.8244,
  },
  {
    id: "h3",
    name: "St. Mary's Hospital",
    address: "Byculla, Mumbai, Maharashtra",
    latitude: 18.9777,
    longitude: 72.8336,
  },
  {
    id: "h4",
    name: "Riverside Clinic",
    address: "Worli, Mumbai, Maharashtra",
    latitude: 19.0176,
    longitude: 72.8179,
  },
];

export const currentHospital = "City General Hospital";

function statusFor(quantity, expiryDaysAway) {
  if (expiryDaysAway <= 60 || quantity <= 20) return "Critical";
  if (quantity <= 60) return "Low";
  if (quantity > 300) return "Surplus";
  return "Adequate";
}

export const inventory = [
  {
    id: "m1",
    name: "ORS Sachets",
    category: "Rehydration",
    batchId: "ORS-2201",
    quantity: 15,
    expiry: "2026-09-10",
    expiryDaysAway: 24,
  },
  {
    id: "m2",
    name: "Anti-Malarial Tablets (ACT)",
    category: "Antimalarial",
    batchId: "AMT-1187",
    quantity: 340,
    expiry: "2027-03-01",
    expiryDaysAway: 195,
  },
  {
    id: "m3",
    name: "IV Fluid (Normal Saline 500ml)",
    category: "IV Fluids",
    batchId: "IVF-3390",
    quantity: 48,
    expiry: "2026-10-02",
    expiryDaysAway: 46,
  },
  {
    id: "m4",
    name: "Paracetamol 500mg",
    category: "Analgesic",
    batchId: "PCM-8820",
    quantity: 520,
    expiry: "2027-06-15",
    expiryDaysAway: 302,
  },
  {
    id: "m5",
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    batchId: "AMX-4471",
    quantity: 90,
    expiry: "2026-12-20",
    expiryDaysAway: 125,
  },
  {
    id: "m6",
    name: "Cold and Flu Relief Syrup",
    category: "Respiratory",
    batchId: "CFR-5502",
    quantity: 12,
    expiry: "2026-09-01",
    expiryDaysAway: 15,
  },
  {
    id: "m7",
    name: "Surgical Gloves (Box of 100)",
    category: "Consumables",
    batchId: "SGL-9012",
    quantity: 410,
    expiry: "2028-01-01",
    expiryDaysAway: 500,
  },
  {
    id: "m8",
    name: "Insulin Vials",
    category: "Endocrine",
    batchId: "INS-2298",
    quantity: 55,
    expiry: "2026-11-05",
    expiryDaysAway: 80,
  },
].map((item) => ({
  ...item,
  status: statusFor(item.quantity, item.expiryDaysAway),
}));

export const nearbyHospitalsWithSurplus = {
  m1: [{ hospital: "Lakeside Medical Center", quantity: 180 }],
  m3: [{ hospital: "St. Mary's Hospital", quantity: 260 }],
  m6: [{ hospital: "Riverside Clinic", quantity: 90 }],
};

export const hospitalMedicineInventory = [
  { hospitalId: "h1", medicineId: "m1", quantity: 15 },
  { hospitalId: "h1", medicineId: "m2", quantity: 340 },
  { hospitalId: "h1", medicineId: "m3", quantity: 48 },
  { hospitalId: "h1", medicineId: "m4", quantity: 520 },
  { hospitalId: "h1", medicineId: "m5", quantity: 90 },
  { hospitalId: "h1", medicineId: "m6", quantity: 12 },
  { hospitalId: "h1", medicineId: "m7", quantity: 410 },
  { hospitalId: "h1", medicineId: "m8", quantity: 55 },
  { hospitalId: "h2", medicineId: "m1", quantity: 180 },
  { hospitalId: "h2", medicineId: "m2", quantity: 75 },
  { hospitalId: "h2", medicineId: "m3", quantity: 85 },
  { hospitalId: "h2", medicineId: "m4", quantity: 240 },
  { hospitalId: "h2", medicineId: "m5", quantity: 35 },
  { hospitalId: "h2", medicineId: "m6", quantity: 28 },
  { hospitalId: "h2", medicineId: "m7", quantity: 160 },
  { hospitalId: "h2", medicineId: "m8", quantity: 18 },
  { hospitalId: "h3", medicineId: "m1", quantity: 70 },
  { hospitalId: "h3", medicineId: "m2", quantity: 145 },
  { hospitalId: "h3", medicineId: "m3", quantity: 260 },
  { hospitalId: "h3", medicineId: "m4", quantity: 90 },
  { hospitalId: "h3", medicineId: "m5", quantity: 110 },
  { hospitalId: "h3", medicineId: "m6", quantity: 35 },
  { hospitalId: "h3", medicineId: "m7", quantity: 95 },
  { hospitalId: "h3", medicineId: "m8", quantity: 44 },
  { hospitalId: "h4", medicineId: "m1", quantity: 55 },
  { hospitalId: "h4", medicineId: "m2", quantity: 40 },
  { hospitalId: "h4", medicineId: "m3", quantity: 65 },
  { hospitalId: "h4", medicineId: "m4", quantity: 130 },
  { hospitalId: "h4", medicineId: "m5", quantity: 70 },
  { hospitalId: "h4", medicineId: "m6", quantity: 90 },
  { hospitalId: "h4", medicineId: "m7", quantity: 210 },
  { hospitalId: "h4", medicineId: "m8", quantity: 12 },
];

export const approvedVendorsForDrug = {
  m1: [vendors[0], vendors[2]],
  m3: [vendors[1], vendors[2]],
  m6: [vendors[0], vendors[3]],
};

export const initialIncomingRequests = [
  {
    id: "r1",
    type: "Transfer Request",
    from: "Riverside Clinic",
    item: "Amoxicillin 250mg",
    quantity: 40,
    status: "Pending",
  },
  {
    id: "r2",
    type: "Vendor Response",
    from: "Apex MedSupplies Co.",
    item: "IV Fluid (Normal Saline 500ml)",
    quantity: 100,
    status: "Pending",
  },
];

export const initialSurgeAlerts = [
  {
    id: "sa1",
    title: "ORS stock projected to run low within 5 days",
    recommendation: "Initiate surge request to Lakeside Medical Center",
  },
  {
    id: "sa2",
    title: "IV Fluid demand rising in surrounding district",
    recommendation: "Approve purchase order with Nirvana Life Sciences",
  },
];

export const vendorCatalog = [
  {
    id: "c1",
    name: "ORS Sachets",
    batchId: "ORS-3301",
    unitPrice: 2.5,
    stock: 5000,
    grade: "A",
  },
  {
    id: "c2",
    name: "IV Fluid (Normal Saline 500ml)",
    batchId: "IVF-4410",
    unitPrice: 45,
    stock: 2200,
    grade: "A",
  },
  {
    id: "c3",
    name: "Anti-Malarial Tablets (ACT)",
    batchId: "AMT-2290",
    unitPrice: 12,
    stock: 3100,
    grade: "B",
  },
  {
    id: "c4",
    name: "Cold and Flu Relief Syrup",
    batchId: "CFR-6603",
    unitPrice: 60,
    stock: 900,
    grade: "A",
  },
];

export const initialSurgedRequests = [
  {
    id: "sr1",
    hospital: "City General Hospital",
    item: "ORS Sachets",
    quantity: 500,
    urgency: "High",
    status: "Pending",
  },
  {
    id: "sr2",
    hospital: "St. Mary's Hospital",
    item: "IV Fluid (Normal Saline 500ml)",
    quantity: 300,
    urgency: "Critical",
    status: "Pending",
  },
  {
    id: "sr3",
    hospital: "Riverside Clinic",
    item: "Cold and Flu Relief Syrup",
    quantity: 150,
    urgency: "Medium",
    status: "Pending",
  },
];

export const initialInTransit = [
  {
    id: "t1",
    trackingId: "TRK-88213",
    destination: "Lakeside Medical Center",
    eta: "2026-08-18 14:00",
    temperature: "4°C",
    humidity: "45%",
  },
];

export const initialDelivered = [
  {
    id: "d1",
    trackingId: "TRK-77120",
    destination: "City General Hospital",
    completedAt: "2026-08-10 09:15",
    signOff: "Passed inspection, zero defects",
  },
  {
    id: "d2",
    trackingId: "TRK-77004",
    destination: "St. Mary's Hospital",
    completedAt: "2026-08-06 11:40",
    signOff: "Passed inspection, zero defects",
  },
];
