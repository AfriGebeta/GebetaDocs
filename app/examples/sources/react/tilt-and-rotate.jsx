import { GebetaMap } from "@gebeta/react";
import "@gebeta/js/style.css";

export default function App() {
  function handleLoad(gebeta) {
    const map = gebeta.getMap();
    function rotate(timestamp) {
      map.rotateTo((timestamp / 150) % 360, { duration: 0 });
      requestAnimationFrame(rotate);
    }
    requestAnimationFrame(rotate);
  }

  return (
    <GebetaMap
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
