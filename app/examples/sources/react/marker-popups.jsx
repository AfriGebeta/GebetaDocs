import { useEffect } from "react";
import { GebetaMap, useClustering } from "@gebeta/react";
import "@gebeta/js/style.css";

const CAFES = [
  { id: "tomoca", name: "Tomoca Coffee", color: "#2563eb", lngLat: [38.7527, 9.0339] },
  { id: "kaldis", name: "Kaldi's Coffee", color: "#dc2626", lngLat: [38.7886, 8.9958] },
  { id: "garden", name: "Garden of Coffee", color: "#16a34a", lngLat: [38.7712, 9.0188] },
  { id: "galani", name: "Galani Cafe", color: "#9333ea", lngLat: [38.7642, 9.0044] },
];

function pinImage(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 136"><path fill="${color}" stroke="#fff" stroke-width="2" d="M21 1a20 20 0 0 1 2 39.9V64a2 2 0 0 1-4 0V40.9A20 20 0 0 1 21 1Z"/><circle cx="21" cy="21" r="7" fill="#fff"/></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

function CafeMarkers() {
  const { addMarker, clearMarkers } = useClustering();

  useEffect(() => {
    CAFES.forEach((cafe) =>
      addMarker({
        id: cafe.id,
        lngLat: cafe.lngLat,
        imageUrl: pinImage(cafe.color),
        size: [28, 90],
        popupContent: `<strong>${cafe.name}</strong>`,
      })
    );
    return () => clearMarkers();
  }, []);

  return null;
}

export default function App() {
  return (
    <GebetaMap
      apiKey="YOUR_API_KEY"
      center={[38.77, 9.017]}
      zoom={13}
      clustering={{ enabled: true }}
      style={{ height: "100vh" }}
    >
      <CafeMarkers />
    </GebetaMap>
  );
}
