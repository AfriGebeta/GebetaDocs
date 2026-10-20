import { useState } from "react";
import { GebetaMap } from "@gebeta/react";

const ORIGIN = { lat: 8.989022, lng: 38.79036 };
const DESTINATION = { lat: 9.03045, lng: 38.7653 };
const WAYPOINTS = [
  { lat: 9.0102, lng: 38.7612 },
  { lat: 9.0201, lng: 38.7701 },
];

export default function App() {
  const [summary, setSummary] = useState("Finding a route…");

  async function handleLoad(sdk) {
    const route = await sdk.getDirections(ORIGIN, DESTINATION, { waypoints: WAYPOINTS });
    sdk.displayRoute(route, { showMarkers: false });
    setSummary(`${route.duration} · ${route.distance}`);
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMap
        apiKey="YOUR_API_KEY"
        center={[38.7785, 9.0098]}
        zoom={12.5}
        style={{ height: "100%" }}
        onLoad={handleLoad}
      />
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 1,
          padding: "10px 14px",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 1px 2px rgb(0 0 0/.04),0 0 0 1px rgb(0 0 0/.07)",
        }}
      >
        {summary}
      </div>
    </div>
  );
}
