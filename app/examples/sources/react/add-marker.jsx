import { GebetaMap } from "@gebeta/react";
import "@gebeta/js/style.css";

export default function App() {
  function handleLoad(gebeta) {
    gebeta.addMarker({
      lngLat: [38.7613, 9.0106],
      anchor: "bottom",
      popup: "Meskel Square, the city's main public square.",
    });
  }

  return (
    <GebetaMap
      apiKey="YOUR_API_KEY"
      center={[38.7613, 9.0106]}
      zoom={14}
      style={{ height: "100vh" }}
      onLoad={handleLoad}
    />
  );
}
