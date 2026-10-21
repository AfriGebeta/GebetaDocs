import { useRef, useState } from "react";
import { GebetaMap } from "@gebeta/react";
import "@gebeta/js/style.css";

const ORIGIN = { lat: 8.989022, lng: 38.79036 };
const DESTINATION = { lat: 9.03045, lng: 38.7653 };

export default function App() {
  const gebetaRef = useRef(null);
  const [route, setRoute] = useState(null);
  const [active, setActive] = useState(null);

  async function handleLoad(gebeta) {
    const r = await gebeta.getDirections(ORIGIN, DESTINATION);
    gebeta.displayRoute(r, { showMarkers: false });
    setRoute(r);
  }

  function flyToStep(step, index) {
    gebetaRef.current?.getMap().flyTo({ center: step.coord, zoom: 16, essential: true });
    setActive(index);
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMap
        ref={gebetaRef}
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
          bottom: 12,
          zIndex: 1,
          width: 288,
          maxWidth: "calc(100% - 64px)",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 1px 2px rgb(0 0 0/.04),0 0 0 1px rgb(0 0 0/.07)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #ececec" }}>
          <strong style={{ display: "block", fontSize: 14 }}>Turn-by-turn</strong>
          <small style={{ color: "#8a8a8a" }}>
            {route ? `${route.duration} · ${route.distance}` : "Finding a route…"}
          </small>
        </div>
        <ol style={{ margin: 0, padding: 0, overflowY: "auto", listStyle: "none" }}>
          {route?.instructions?.map((step, i) => (
            <li key={i}>
              <button
                onClick={() => flyToStep(step, i)}
                style={{
                  display: "flex",
                  gap: 12,
                  width: "100%",
                  padding: "10px 16px",
                  border: 0,
                  borderBottom: "1px solid #ececec",
                  background: active === i ? "#f4f4f4" : "none",
                  textAlign: "left",
                  font: "14px/1.4 system-ui",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    width: 20,
                    height: 20,
                    borderRadius: 999,
                    background: active === i ? "#ffa600" : "#f4f4f4",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {i + 1}
                </span>
                <span>
                  {step.instruction}
                  <small style={{ display: "block", color: "#8a8a8a" }}>{step.distance}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
