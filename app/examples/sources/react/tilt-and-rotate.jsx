import { GebetaMaps } from "@gebeta/react";

export default function App() {
  function handleLoad(sdk) {
    const map = sdk.getMap();
    function rotate(timestamp) {
      map.rotateTo((timestamp / 150) % 360, { duration: 0 });
      requestAnimationFrame(rotate);
    }
    requestAnimationFrame(rotate);
  }

  return (
    <GebetaMaps
      apiKey="YOUR_API_KEY"
      center={[38.7613, 9.0106]}
      zoom={15.5}
      pitch={55}
      bearing={-20}
      navigationControl
      style={{ height: "100vh" }}
      onLoad={handleLoad}
    />
  );
}
