import { useState } from "react";
import { GebetaMap } from "@gebeta/react";

const STYLES = [
  { label: "Standard", url: "https://tiles.gebeta.app/styles/standard/style.json" },
  { label: "Satellite", url: "https://tiles.gebeta.app/styles/raster/raster.json" },
  { label: "Terrain", url: "https://tiles.gebeta.app/styles/standard/terrain/terrain.json" },
];

export default function App() {
  const [styleUrl, setStyleUrl] = useState(STYLES[0].url);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMap
        apiKey="YOUR_API_KEY"
        center={[38.7578, 9.0192]}
        zoom={13}
        styleUrl={styleUrl}
        style={{ height: "100%" }}
      />
      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 1, display: "flex", gap: 6 }}>
        {STYLES.map((s) => (
          <button
            key={s.url}
            onClick={() => setStyleUrl(s.url)}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              background: styleUrl === s.url ? "#191715" : "#fff",
              color: styleUrl === s.url ? "#faf9f7" : "#161616",
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
