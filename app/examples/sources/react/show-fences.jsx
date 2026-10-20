import { GebetaMaps } from "@gebeta/react";

const ZONES = [
  {
    id: "piassa",
    name: "Piassa",
    color: "#2563eb",
    points: [
      [38.744, 9.029],
      [38.757, 9.029],
      [38.757, 9.039],
      [38.744, 9.039],
    ],
  },
  {
    id: "kazanchis",
    name: "Kazanchis",
    color: "#16a34a",
    points: [
      [38.762, 9.014],
      [38.775, 9.014],
      [38.775, 9.024],
      [38.762, 9.024],
    ],
  },
  {
    id: "bole",
    name: "Bole",
    color: "#9333ea",
    points: [
      [38.778, 8.99],
      [38.8, 8.99],
      [38.8, 9.004],
      [38.778, 9.004],
    ],
  },
];

export default function App() {
  function handleLoad(sdk) {
    sdk.fencing.renderFences(ZONES);
    ZONES.forEach((zone) => {
      sdk.addMarker({
        lngLat: sdk.fencing.getFenceCentroid(zone.id),
        element: (() => {
          const el = document.createElement("div");
          el.textContent = zone.name;
          el.style.cssText =
            "padding:6px 10px;border-radius:999px;background:#191715;color:#faf9f7;font:500 13px/1 system-ui;white-space:nowrap;pointer-events:none";
          return el;
        })(),
        anchor: "bottom",
      });
    });
  }

  return (
    <GebetaMaps
      apiKey="YOUR_API_KEY"
      center={[38.771, 9.0145]}
      zoom={12.6}
      style={{ height: "100vh" }}
      onLoad={handleLoad}
    />
  );
}
