import type { LatLng } from "./types";

const EARTH_RADIUS = 6_371_000;
const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export function metersBetween(a: LatLng, b: LatLng) {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h));
}

export function halfwayAlong(path: LatLng[]): LatLng | null {
  if (path.length === 0) return null;
  const segments = path.slice(1).map((point, i) => metersBetween(path[i], point));
  let remaining = segments.reduce((sum, length) => sum + length, 0) / 2;
  for (let i = 0; i < segments.length; i++) {
    if (remaining <= segments[i] && segments[i] > 0) {
      const t = remaining / segments[i];
      return {
        lat: path[i].lat + (path[i + 1].lat - path[i].lat) * t,
        lng: path[i].lng + (path[i + 1].lng - path[i].lng) * t,
      };
    }
    remaining -= segments[i];
  }
  return path[Math.floor(path.length / 2)];
}

export function formatDuration(seconds: number) {
  if (seconds < 60) return `${Math.round(seconds)} s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

export function formatDurationRange(a: number, b: number) {
  const [low, high] = [Math.min(a, b), Math.max(a, b)].map(formatDuration);
  if (low === high) return low;
  return low.endsWith(" min") && high.endsWith(" min") && !high.includes("h")
    ? `${low.replace(" min", "")}–${high}`
    : `${low} – ${high}`;
}
