import { useState, useRef } from "react";
import { GebetaMap } from "@gebeta/react";
import "@gebeta/js/style.css";

export default function App() {
  const sdkRef = useRef(null);
  const [step, setStep] = useState("origin");
  const [summary, setSummary] = useState(null);
  const originRef = useRef(null);
  const destRef = useRef(null);

  function handleLoad(gebeta) {
    sdkRef.current = gebeta;
    const map = gebeta.getMap();
    map.getCanvas().style.cursor = "crosshair";

    map.on("click", async (e) => {
      const lngLat = [e.lngLat.lng, e.lngLat.lat];

      if (!originRef.current) {
        originRef.current = gebeta.addMarker({ lngLat, anchor: "bottom" });
        setStep("destination");
      } else if (!destRef.current) {
        destRef.current = gebeta.addMarker({ lngLat, anchor: "bottom" });
        const route = await gebeta.getDirections(
          { lng: originRef.current.getLngLat().lng, lat: originRef.current.getLngLat().lat },
          { lng: e.lngLat.lng, lat: e.lngLat.lat }
        );
        gebeta.displayRoute(route, { showMarkers: false });
        setSummary(`${route.duration} · ${route.distance}`);
        setStep("done");
      }
    });
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMap
        apiKey="YOUR_API_KEY"
        center={[38.7785, 9.0098]}
        zoom={12}
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
        {step === "origin" && "Click to set the start point"}
        {step === "destination" && "Click to set the end point"}
        {step === "done" && summary}
      </div>
    </div>
  );
}
