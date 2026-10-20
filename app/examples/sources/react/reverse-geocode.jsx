import { useState } from "react";
import { GebetaMaps } from "@gebeta/react";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleLoad(sdk) {
    const map = sdk.getMap();
    map.getCanvas().style.cursor = "crosshair";

    map.on("click", async (e) => {
      setLoading(true);
      const places = await sdk.geocodingManager.reverseGeocode(e.lngLat);
      const nearest = places[0];
      if (nearest) {
        sdk.addMarker({ lngLat: [nearest.lngLat.lng, nearest.lngLat.lat], anchor: "bottom" });
        setResult({ name: nearest.name, detail: `${nearest.type} · ${nearest.City}` });
      } else {
        setResult({ name: "Nothing found here", detail: "" });
      }
      setLoading(false);
    });
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMaps
        apiKey="YOUR_API_KEY"
        center={[38.7578, 9.0192]}
        zoom={15}
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
        {loading ? (
          <strong>Looking up…</strong>
        ) : result ? (
          <>
            <strong style={{ display: "block" }}>{result.name}</strong>
            <small style={{ color: "#8a8a8a" }}>{result.detail}</small>
          </>
        ) : (
          <>
            <strong style={{ display: "block" }}>Click the map</strong>
            <small style={{ color: "#8a8a8a" }}>The nearest named place appears here.</small>
          </>
        )}
      </div>
    </div>
  );
}
