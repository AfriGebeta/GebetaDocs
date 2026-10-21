import { useEffect } from "react";
import { GebetaMap, useClustering } from "@gebeta/react";
import "@gebeta/js/style.css";

const DOT =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="#191715" stroke="#fff" stroke-width="3"/></svg>'
  );

function RandomMarkers() {
  const { addMarker, clearMarkers } = useClustering();

  useEffect(() => {
    for (let i = 0; i < 300; i++) {
      addMarker({
        id: `stop-${i}`,
        lngLat: [38.68 + Math.random() * 0.16, 8.95 + Math.random() * 0.13],
        imageUrl: DOT,
        size: [20, 20],
      });
    }
    return () => clearMarkers();
  }, []);

  return null;
}

export default function App() {
  return (
    <GebetaMap
      apiKey="YOUR_API_KEY"
      center={[38.7578, 9.0192]}
      zoom={11.5}
      clustering={{ enabled: true, radius: 60, showClusterCount: true }}
      style={{ height: "100vh" }}
    >
      <RandomMarkers />
    </GebetaMap>
  );
}
