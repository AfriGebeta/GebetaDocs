import { useState } from "react";
import { GebetaMap } from "@gebeta/react";

export default function App() {
  const [sdk, setSdk] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [status, setStatus] = useState('Click "Draw a fence", then click the map');

  function handleLoad(gebeta) {
    setSdk(gebeta);
    gebeta.fencing.on("fenceCompleted", (event) => {
      setDrawing(false);
      gebeta.getMap().getCanvas().style.cursor = "";
      setStatus(`Fence ${event.fenceId} has ${event.points.length - 1} corners`);
    });
  }

  function startDrawing() {
    sdk?.fencing.startDrawing({ fillColor: "#2563eb", lineColor: "#2563eb" });
    sdk?.getMap().getCanvas().style.cursor = "crosshair";
    setDrawing(true);
    setStatus("Click to add corners. Click the first one to close.");
  }

  function clearAll() {
    sdk?.fencing.clearAllFences();
    sdk?.getMap().getCanvas().style.cursor = "";
    setDrawing(false);
    setStatus("Cleared");
  }

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <GebetaMap
        apiKey="YOUR_API_KEY"
        center={[38.7578, 9.0192]}
        zoom={14}
        style={{ height: "100%" }}
        onLoad={handleLoad}
      />
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
        }}
      >
        {[
          { label: "Draw a fence", onClick: startDrawing, active: drawing },
          { label: "Clear", onClick: clearAll, active: false },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              background: btn.active ? "#191715" : "#fff",
              color: btn.active ? "#faf9f7" : "#161616",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgb(0 0 0/.05),0 0 0 1px rgb(0 0 0/.1)",
            }}
          >
            {btn.label}
          </button>
        ))}
        <span
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            background: "#fff",
            boxShadow: "0 1px 2px rgb(0 0 0/.04),0 0 0 1px rgb(0 0 0/.07)",
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
