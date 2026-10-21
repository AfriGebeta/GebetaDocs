import { GebetaMap } from "@gebeta/react";
import "@gebeta/js/style.css";

const AREA = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [38.752, 9.004],
        [38.768, 9.003],
        [38.773, 9.012],
        [38.766, 9.021],
        [38.751, 9.019],
        [38.752, 9.004],
      ],
    ],
  },
};

export default function App() {
  function handleLoad(gebeta) {
    const map = gebeta.getMap();
    map.addSource("delivery-area", { type: "geojson", data: AREA });
    map.addLayer({
      id: "delivery-area-fill",
      type: "fill",
      source: "delivery-area",
      paint: { "fill-color": "#2563eb", "fill-opacity": 0.2 },
    });
    map.addLayer({
      id: "delivery-area-outline",
      type: "line",
      source: "delivery-area",
      paint: { "line-color": "#2563eb", "line-width": 2 },
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
