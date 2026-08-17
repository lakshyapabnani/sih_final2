import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  currentHospital,
  hospitalMedicineInventory,
  hospitals,
  inventory,
} from "../../data/mockData.js";

const MAX_NEARBY_KM = 25;
const GEOCODE_CACHE_KEY = "medsupply-hospital-geocodes";

function getStoredGeocodes() {
  try {
    return JSON.parse(localStorage.getItem(GEOCODE_CACHE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveStoredGeocodes(cache) {
  localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(cache));
}

async function geocodeHospital(hospital) {
  if (hospital.latitude && hospital.longitude) return hospital;
  if (!hospital.address) return hospital;

  const cache = getStoredGeocodes();
  if (cache[hospital.id]) {
    return { ...hospital, ...cache[hospital.id] };
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    hospital.address
  )}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to geocode hospital location.");
  const [result] = await response.json();
  if (!result) throw new Error("Hospital location not found.");

  const coordinates = {
    latitude: Number(result.lat),
    longitude: Number(result.lon),
  };
  saveStoredGeocodes({ ...cache, [hospital.id]: coordinates });
  return { ...hospital, ...coordinates };
}

function distanceKm(start, end) {
  const radius = 6371;
  const lat1 = (start.latitude * Math.PI) / 180;
  const lat2 = (end.latitude * Math.PI) / 180;
  const deltaLat = ((end.latitude - start.latitude) * Math.PI) / 180;
  const deltaLon = ((end.longitude - start.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return radius * c;
}

function formatDistance(value) {
  return `${value.toFixed(1)} km`;
}

function formatDuration(minutes) {
  if (!minutes) return "Not available";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = Math.round(minutes % 60);
  return remaining ? `${hours} hr ${remaining} min` : `${hours} hr`;
}

function stockFor(hospitalId, medicineId) {
  return (
    hospitalMedicineInventory.find(
      (entry) => entry.hospitalId === hospitalId && entry.medicineId === medicineId
    )?.quantity || 0
  );
}

function markerIcon(className, label) {
  return L.divIcon({
    className: `contingency-marker ${className}`,
    html: `<span>${label}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function ContingencyMap({ requester, results, onTransfer }) {
  const mapNode = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const onTransferRef = useRef(onTransfer);

  useEffect(() => {
    onTransferRef.current = onTransfer;
  }, [onTransfer]);

  useEffect(() => {
    if (!mapNode.current || !requester?.latitude || !requester?.longitude) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapNode.current, {
        scrollWheelZoom: false,
      }).setView([requester.latitude, requester.longitude], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    if (layerRef.current) {
      layerRef.current.remove();
    }

    const group = L.featureGroup();
    L.marker([requester.latitude, requester.longitude], {
      icon: markerIcon("requester", "R"),
    })
      .bindPopup(`<strong>${requester.name}</strong><br />Requesting hospital`)
      .addTo(group);

    results.forEach((result) => {
      const popup = document.createElement("div");
      popup.className = "contingency-popup";
      popup.innerHTML = `
        <strong>${result.name}</strong><br />
        ${result.availableQuantity} units available<br />
        ${formatDistance(result.distanceKm)} away<br />
        ${result.travelTimeMinutes ? formatDuration(result.travelTimeMinutes) : "Travel time pending"}
      `;

      const button = document.createElement("button");
      button.className = "btn btn-primary";
      button.type = "button";
      button.textContent = "Request Transfer";
      button.addEventListener("click", () => onTransferRef.current(result));
      popup.appendChild(button);

      L.marker([result.latitude, result.longitude], {
        icon: markerIcon("source", String(result.availableQuantity)),
      })
        .bindPopup(popup)
        .addTo(group);
    });

    group.addTo(mapRef.current);
    layerRef.current = group;
    mapRef.current.fitBounds(group.getBounds().pad(0.2));

    setTimeout(() => mapRef.current?.invalidateSize(), 0);

    return () => {
      group.remove();
    };
  }, [requester, results]);

  return <div className="contingency-map" ref={mapNode} />;
}

export default function ContingencyNetworkTab() {
  const medicines = useMemo(() => inventory, []);
  const defaultMedicineId = medicines.find((item) => item.status === "Critical")?.id || medicines[0]?.id;
  const [medicineId, setMedicineId] = useState(defaultMedicineId);
  const [quantity, setQuantity] = useState(50);
  const [request, setRequest] = useState(null);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [routeStatus, setRouteStatus] = useState("");
  const [transferSentTo, setTransferSentTo] = useState("");

  const requester = hospitals.find((hospital) => hospital.name === currentHospital);
  const selectedMedicine = medicines.find((item) => item.id === medicineId);
  const requestingStock = requester ? stockFor(requester.id, medicineId) : 0;

  async function createRequest(event) {
    event.preventDefault();
    const requestedQuantity = Number(quantity);
    setTransferSentTo("");
    setRouteStatus("");

    if (!requester) {
      setMessage("Requesting hospital could not be identified.");
      return;
    }

    if (!selectedMedicine || !requestedQuantity || requestedQuantity <= 0) {
      setMessage("Select a medicine and enter a valid required quantity.");
      return;
    }

    setIsChecking(true);
    setMessage("");

    try {
      const locatedHospitals = await Promise.all(hospitals.map((hospital) => geocodeHospital(hospital)));
      const locatedRequester = locatedHospitals.find((hospital) => hospital.id === requester.id);

      if (!locatedRequester?.latitude || !locatedRequester?.longitude) {
        setMessage("Requesting hospital does not have a usable location.");
        setResults([]);
        return;
      }

      const matches = locatedHospitals
        .filter((hospital) => hospital.id !== requester.id)
        .filter((hospital) => hospital.latitude && hospital.longitude)
        .map((hospital) => ({
          ...hospital,
          availableQuantity: stockFor(hospital.id, medicineId),
          distanceKm: distanceKm(locatedRequester, hospital),
        }))
        .filter(
          (hospital) =>
            hospital.availableQuantity >= requestedQuantity && hospital.distanceKm <= MAX_NEARBY_KM
        )
        .sort((a, b) => a.distanceKm - b.distanceKm || b.availableQuantity - a.availableQuantity);

      setRequest({
        medicineName: selectedMedicine.name,
        quantity: requestedQuantity,
        requester: locatedRequester,
        requestingStock,
      });
      setResults(matches);
      setMessage(
        matches.length
          ? `${matches.length} suitable hospital${matches.length === 1 ? "" : "s"} found.`
          : "No nearby hospital has sufficient stock for this request."
      );
    } catch (error) {
      setResults([]);
      setMessage(error.message || "Unable to check nearby hospitals right now.");
    } finally {
      setIsChecking(false);
    }
  }

  useEffect(() => {
    if (!request?.requester || results.length === 0) return;

    let cancelled = false;

    async function loadRoutes() {
      setRouteStatus("Checking travel time...");

      try {
        const routed = await Promise.all(
          results.map(async (hospital) => {
            const url = `https://router.project-osrm.org/route/v1/driving/${request.requester.longitude},${request.requester.latitude};${hospital.longitude},${hospital.latitude}?overview=false`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("OSRM route lookup failed.");
            const data = await response.json();
            const route = data.routes?.[0];
            return route
              ? {
                  ...hospital,
                  routeDistanceKm: route.distance / 1000,
                  travelTimeMinutes: route.duration / 60,
                }
              : hospital;
          })
        );

        if (!cancelled) {
          setResults(routed);
          setRouteStatus("");
        }
      } catch {
        if (!cancelled) {
          setRouteStatus("Travel time unavailable; showing straight-line distance.");
        }
      }
    }

    loadRoutes();

    return () => {
      cancelled = true;
    };
  }, [request?.requester]);

  function sendTransfer(hospital) {
    setTransferSentTo(hospital.name);
  }

  return (
    <div>
      <h1>Hospital Contingency Network</h1>

      <div className="panel">
        <div className="panel-header">Emergency Medicine Request</div>
        <form className="contingency-form" onSubmit={createRequest}>
          <div className="form-row">
            <select value={medicineId} onChange={(event) => setMedicineId(event.target.value)}>
              {medicines.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              min="1"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="Required quantity"
            />
            <button className="btn btn-primary" disabled={isChecking} type="submit">
              {isChecking ? "Checking..." : "Raise Emergency Request"}
            </button>
          </div>
          <div className="summary-box">
            {currentHospital} currently has {requestingStock} units of {selectedMedicine?.name}.
          </div>
          {message && <div className="summary-box">{message}</div>}
          {routeStatus && <div className="summary-box">{routeStatus}</div>}
          {transferSentTo && <div className="summary-box">Transfer request sent to {transferSentTo}.</div>}
        </form>
      </div>

      {request && (
        <div className="contingency-grid">
          <div className="panel">
            <div className="panel-header">OpenStreetMap Network View</div>
            {request.requester?.latitude && request.requester?.longitude ? (
              <ContingencyMap requester={request.requester} results={results} onTransfer={sendTransfer} />
            ) : (
              <div className="empty-state">Requesting hospital location is unavailable.</div>
            )}
          </div>

          <div className="panel">
            <div className="panel-header">Suitable Hospitals</div>
            {results.length === 0 ? (
              <div className="empty-state">No suitable hospitals to display.</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Hospital</th>
                    <th>Available</th>
                    <th>Distance</th>
                    <th>Travel Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((hospital) => (
                    <tr key={hospital.id}>
                      <td>{hospital.name}</td>
                      <td>{hospital.availableQuantity}</td>
                      <td>{formatDistance(hospital.routeDistanceKm || hospital.distanceKm)}</td>
                      <td>{formatDuration(hospital.travelTimeMinutes)}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => sendTransfer(hospital)}>
                          Request Transfer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
