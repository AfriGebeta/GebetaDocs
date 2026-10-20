import { GebetaMaps, gebeta } from "@gebeta/react";

export default function App() {
  function handleLoad(sdk) {
    const map = sdk.getMap();
    map.addControl(new gebeta.ScaleControl(), "bottom-left");
    map.addControl(new gebeta.FullscreenControl(), "top-left");
  }

  return (
    <GebetaMaps
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
