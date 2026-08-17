# MedSupply Network

MedSupply Network is a SIH prototype for hospital medicine inventory monitoring, vendor coordination, surge planning, and emergency medicine redistribution between nearby hospitals.

The app is built as a frontend prototype with mock data so the main workflows can be demonstrated quickly without setting up a backend server.

## Languages and Technologies Used

- JavaScript: application logic and React components
- JSX: React UI structure
- CSS: styling, layout, responsive behavior, and component presentation
- HTML: Vite entry page
- React: hospital and vendor portal UI
- Vite: local development server and production build tooling
- Supabase Auth: Google OAuth, email/password authentication, and session handling
- Supabase Database: user profile role lookup
- Leaflet.js: interactive map rendering
- OpenStreetMap: public map tiles and geographic map data
- Nominatim: fallback geocoding when hospital coordinates are unavailable
- OSRM: optional route distance and travel-time lookup
- npm: dependency and script management

## How to Run the Web App

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Fill in the Supabase values:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

For full Supabase, Google Cloud, Vercel, and profile table setup, see:

```text
SUPABASE_SETUP.md
```

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal. Vite usually runs at:

```text
http://localhost:5173
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How a User Uses the Prototype

The landing page lets the user choose between Hospital Portal and Vendor Portal sign-in. After successful Supabase authentication, the user is redirected to the matching protected dashboard.

In the Hospital Portal, a hospital user can:

- View current medicine inventory.
- See stock status such as Critical, Low, Adequate, or Surplus.
- Raise surge requests for medicines with low or critical stock.
- Review incoming transfer and vendor response requests.
- View seasonal or emergency alerts.
- Use the Contingency Network to find nearby hospitals that can provide emergency medicine stock.

In the Vendor Portal, a vendor user can:

- View surged and requested items from hospitals.
- Mark a pending request as fulfilled and move it to in-transit.
- Manage catalog stock for available medical supplies.
- Track in-transit and delivered orders.

## Core Prototype Functionalities

### Supabase Authentication and Portal Access

The prototype uses Supabase Auth with Google Sign-In and email/password support. Sessions are restored on app startup, and authentication state changes are tracked through Supabase Auth.

Protected routes:

- `/hospital`
- `/vendor`

Authentication routes:

- `/hospital/login`
- `/vendor/login`

The app checks the authenticated user's role before showing a dashboard. A hospital user cannot access the vendor portal, and a vendor user cannot access the hospital portal.

First-time Google users are asked to choose a role before entering a dashboard:

- `hospital`
- `vendor`

The safe SQL profile schema and RLS policies are in:

```text
supabase/profiles.sql
```

Each authenticated Supabase user should have a matching `profiles` row with `role` set to either `hospital` or `vendor`.

### Hospital Inventory Management

The inventory screen lists medicines, categories, batch IDs, quantities, expiry dates, and status. Critical rows are highlighted using the existing application style so urgent items are easy to identify.

### Surge Requests

Hospitals can request help for low-stock medicines. The prototype shows nearby hospitals with surplus stock and approved vendors that can receive purchase requests.

### Hospital Contingency Network

The Contingency Network supports emergency redistribution of medicines between nearby hospitals.

Workflow:

1. Select a medicine.
2. Enter the required quantity.
3. Raise an emergency request.
4. The system checks the requesting hospital stock.
5. The system checks nearby hospitals and their available medicine inventory.
6. Suitable hospitals are ranked by distance and availability.
7. Results appear on an OpenStreetMap map and in a table.
8. The user can initiate a transfer request from either the map popup or the result table.

The existing inventory data remains the source of truth for medicine availability. OpenStreetMap, Nominatim, and OSRM are used only for location, geocoding fallback, distance, and travel-time context.

### Vendor Coordination

The vendor portal demonstrates how suppliers can view hospital demand, fulfill pending orders, update available catalog stock, and track delivery status.

### Seasonal Demand Alerts

The calendar simulation changes demand context for normal, monsoon, winter, summer, and mass gathering scenarios. Alerts recommend medicines and supplies likely to see increased demand.

## Prototype Data

All demo data currently lives in:

```text
src/data/mockData.js
```

This includes:

- Hospitals
- Hospital coordinates
- Current hospital name
- Medicine inventory
- Hospital-level medicine availability
- Vendors
- Surge alerts
- Incoming requests
- Vendor catalog
- Delivery tracking data

Supabase user profile roles are read from the `profiles` table. The app also supports `user_metadata.role` as a fallback for prototype accounts.

## Notes

- This prototype does not require Google Maps or paid map APIs.
- No API key is required for the current demo implementation.
- Supabase credentials should stay in `.env` and must not be committed.
- Vite client-side environment variables must use the `VITE_` prefix.
- Public OpenStreetMap ecosystem services are suitable for prototype use, but production usage should follow each service's usage policy and may require a dedicated provider or self-hosted service.
- The current app uses mock data instead of a persistent backend database.
