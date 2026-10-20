import { GebetaMaps } from "@gebeta/react";

export default function App() {
  return (
    <GebetaMaps
      apiKey="YOUR_API_KEY"
      center={[38.7578, 9.0192]}
      zoom={13}
      style={{ height: "100vh" }}
    />
  );
}
