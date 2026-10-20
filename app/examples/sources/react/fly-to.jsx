import { useRef, useState } from "react";
import { GebetaMap } from "@gebeta/react";

const PLACES = [
  { name: "Meskel Square", center: [38.7613, 9.0106] },
  { name: "Bole Airport", center: [38.7993, 8.9779] },
  { name: "Piassa", center: [38.7505, 9.0336] },
  { name: "Merkato", center: [38.7369, 9.03] },
  { name: "Entoto", center: [38.767, 9.084] },
];

export default function App() {
  const sdk = useRef(null);
  const [active, setActive] = useState(null);

  function flyTo(place) {
    sdk.current?.getMap().flyTo({ center: place.center, zoom: 15, essential: true });
    setActive(place.name);
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMap
        ref={sdk}
        apiKey="YOUR_API_KEY"
        center={[38.7578, 9.0192]}
        zoom={12}
        style={{ height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
        }}
      >
        {PLACES.map((place) => (
          <button
            key={place.name}
            onClick={() => flyTo(place)}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              background: active === place.name ? "#191715" : "#fff",
              color: active === place.name ? "#faf9f7" : "#161616",
              fontWeight: 500,
            }}
          >
            {place.name}
          </button>
        ))}
      </div>
    </div>
  );
}
