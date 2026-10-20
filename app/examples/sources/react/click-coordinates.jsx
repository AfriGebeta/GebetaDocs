import { useState } from "react";
import { GebetaMap } from "@gebeta/react";

export default function App() {
  const [coords, setCoords] = useState(null);

  function handleLoad(sdk) {
    const map = sdk.getMap();
    map.getCanvas().style.cursor = "crosshair";
    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setCoords({ lng, lat });
      sdk.addMarker({ lngLat: [lng, lat], anchor: "bottom" });
    });
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMap
        apiKey="YOUR_API_KEY"
        center={[38.7578, 9.0192]}
        zoom={13}
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
        {coords ? (
          <code style={{ fontFamily: "monospace", fontSize: 13 }}>
            {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
          </code>
        ) : (
          <>
            <strong style={{ display: "block" }}>Click the map</strong>
            <small style={{ color: "#8a8a8a" }}>Coordinates appear here.</small>
          </>
        )}
      </div>
    </div>
  );
}
