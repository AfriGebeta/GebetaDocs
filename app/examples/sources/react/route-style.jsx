import { useRef, useState } from "react";
import { GebetaMaps } from "@gebeta/react";

const ORIGIN = { lat: 8.989022, lng: 38.79036 };
const DESTINATION = { lat: 9.03045, lng: 38.7653 };

const STYLES = [
  { label: "Dark", color: "#191715", width: 5 },
  { label: "Blue", color: "#2563eb", width: 5 },
  { label: "Dashed", color: "#e63946", width: 4, dasharray: [2, 2] },
];

export default function App() {
  const sdk = useRef(null);
  const [active, setActive] = useState(0);

  async function handleLoad(gebeta) {
    const route = await gebeta.getDirections(ORIGIN, DESTINATION);
    gebeta.displayRoute(route, {
      showMarkers: false,
      routeStyle: { "line-color": STYLES[0].color, "line-width": STYLES[0].width },
    });
  }

  function applyStyle(index) {
    const s = STYLES[index];
    sdk.current?.updateRouteStyle({
      "line-color": s.color,
      "line-width": s.width,
      ...(s.dasharray ? { "line-dasharray": s.dasharray } : {}),
    });
    setActive(index);
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMaps
        ref={sdk}
        apiKey="YOUR_API_KEY"
        center={[38.7785, 9.0098]}
        zoom={12.5}
        style={{ height: "100%" }}
        onLoad={handleLoad}
      />
      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 1, display: "flex", gap: 6 }}>
        {STYLES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => applyStyle(i)}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              background: active === i ? "#191715" : "#fff",
              color: active === i ? "#faf9f7" : "#161616",
              fontWeight: 500,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
