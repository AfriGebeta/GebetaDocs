import { GebetaMap } from "@gebeta/react";

export default function App() {
  function handleLoad(sdk) {
    sdk.addMarker({
      lngLat: [38.7613, 9.0106],
      anchor: "bottom",
      popup: "<strong>Meskel Square</strong><br>The city's main public square.",
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
