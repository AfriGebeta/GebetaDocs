import { GebetaMap, FullscreenControl, ScaleControl } from "@gebeta/react";
import "@gebeta/js/style.css";

export default function App() {
  function handleLoad(gebeta) {
    const map = gebeta.getMap();
    map.addControl(new ScaleControl(), "bottom-left");
    map.addControl(new FullscreenControl(), "top-left");
  }

  return (
    <GebetaMap
      apiKey="YOUR_API_KEY"
      center={[38.7578, 9.0192]}
      zoom={13}
      navigationControl
      navigationControlPosition="top-right"
      style={{ height: "100vh" }}
      onLoad={handleLoad}
    />
  );
}
