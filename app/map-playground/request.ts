import { formatDuration, formatDurationRange, halfwayAlong } from "./geo";
import type {
  Instruction,
  LatLng,
  Place,
  PlaygroundInput,
  PlaygroundRequest,
  PlaygroundResult,
  RouteLabel,
  RouteOption,
} from "./types";

export const API_BASE_URL = "https://mapapi.gebeta.app";

const KEY_PLACEHOLDER = "{your-api-key}";

export function parsePoint(text: string): LatLng | null {
  const parts = text.split(",").map((part) => part.trim());
  if (parts.length !== 2 || parts.some((part) => part === "")) return null;
  const [lat, lng] = parts.map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

export function formatPoint(point: LatLng | null): string {
  return point ? `${Number(point.lat.toFixed(6))}, ${Number(point.lng.toFixed(6))}` : "";
}

const round = (value: number) => Number(value.toFixed(6));
const plain = (point: LatLng | null) =>
  point ? `${round(point.lat)},${round(point.lng)}` : "lat,lng";
const braced = (point: LatLng | null) => `{${plain(point)}}`;
const list = (points: LatLng[]) => `[${points.map(braced).join(",")}]`;

export function validate(input: PlaygroundInput): string | null {
  if (!input.apiKey.trim()) return "Add your API key first.";
  switch (input.mode) {
    case "geocoding":
      if (input.geocodeDirection === "forward" && !input.query.trim())
        return "Type a place to search for.";
      if (input.geocodeDirection === "reverse" && !input.origin)
        return "Pick a point on the map or type its coordinates.";
      return null;
    case "direction":
      if (!input.origin || !input.destination) return "Set an origin and a destination.";
      return null;
    case "onm":
      if (!input.origin) return "Set an origin.";
      if (input.waypoints.length === 0) return "Add at least one destination.";
      return null;
    case "matrix":
    case "tss":
      if (input.waypoints.length < 2) return "Add at least two points.";
      return null;
    case "optimizedTrip":
      try {
        JSON.parse(input.tripJson);
        return null;
      } catch {
        return "The trip JSON isn't valid.";
      }
  }
}

export function buildRequest(input: PlaygroundInput): PlaygroundRequest {
  const key = `apiKey=${encodeURIComponent(input.apiKey.trim()) || KEY_PLACEHOLDER}`;
  switch (input.mode) {
    case "geocoding":
      return {
        method: "GET",
        url:
          input.geocodeDirection === "forward"
            ? `${API_BASE_URL}/v2/search/geocode?query=${encodeURIComponent(input.query.trim())}&${key}`
            : `${API_BASE_URL}/v2/search/reverse-geocoding?lat=${input.origin?.lat ?? ""}&lon=${input.origin?.lng ?? ""}&${key}`,
      };
    case "direction": {
      const options = [
        input.withAlternatives && "alternative=t",
        input.withWaypoints && input.waypoints.length > 0 && `waypoints=${list(input.waypoints)}`,
      ].filter(Boolean);
      return {
        method: "GET",
        url: `${API_BASE_URL}/api/route/direction/?origin=${plain(input.origin)}&destination=${plain(input.destination)}&${[key, ...options].join("&")}`,
      };
    }
    case "onm":
      return {
        method: "GET",
        url: `${API_BASE_URL}/api/route/onm?origin=${braced(input.origin)}&json=${list(input.waypoints)}&${key}`,
      };
    case "matrix":
      return {
        method: "GET",
        url: `${API_BASE_URL}/api/route/matrix?json=${list(input.waypoints)}&${key}`,
      };
    case "tss":
      return {
        method: "GET",
        url: `${API_BASE_URL}/api/route/tss?json=${list(input.waypoints)}&${key}`,
      };
    case "optimizedTrip":
      return {
        method: "POST",
        url: `${API_BASE_URL}/api/optimized-trip?${key}`,
        body: input.tripJson,
      };
  }
}

export function toCurl(request: PlaygroundRequest): string {
  if (request.method === "GET") return `curl "${request.url}"`;
  return `curl -X POST "${request.url}" \\\n  -H "Content-Type: application/json" \\\n  -d '${request.body ?? ""}'`;
}

export async function send(request: PlaygroundRequest): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(request.url, {
      method: request.method,
      headers: request.body ? { "Content-Type": "application/json" } : undefined,
      body: request.body,
    });
  } catch {
    throw new Error("Couldn't reach the API. Check your connection and try again.");
  }

  const text = await response.text();
  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {}

  if (!response.ok)
    throw new Error(errorMessage(data) ?? `The request failed with status ${response.status}.`);
  return data;
}

function errorMessage(data: unknown): string | null {
  if (!isRecord(data)) return typeof data === "string" && data ? data : null;
  const { error, message } = data;
  if (typeof error === "string") return error;
  if (isRecord(error) && typeof error.message === "string") return error.message;
  return typeof message === "string" ? message : null;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function toPoint(value: unknown): LatLng | null {
  if (Array.isArray(value) && value.length >= 2) {
    const [lat, lng] = value.map(Number);
    return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
  }
  if (!isRecord(value)) return null;
  const source = isRecord(value.location) ? value.location : value;
  const lat = source.lat ?? source.latitude;
  const lng = source.lng ?? source.lon ?? source.longitude;
  return typeof lat === "number" && typeof lng === "number" ? { lat, lng } : null;
}

function toPath(value: unknown): LatLng[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (Array.isArray(item) && item.some(Array.isArray)) return toPath(item);
    const point = toPoint(item);
    return point ? [point] : [];
  });
}

const records = (value: unknown): Record<string, unknown>[] =>
  Array.isArray(value) ? value.filter(isRecord) : [];

type Trip = { from: number; to: number; meters: number; seconds: number };

function readTrips(body: Record<string, unknown>): Trip[] {
  const entries = records(body.origin_to_destination);
  if (entries.length > 0) {
    return entries.flatMap((entry) => {
      const trip = {
        from: Number(entry.from),
        to: Number(entry.to),
        meters: Number(entry.distance) * 1000,
        seconds: Number(entry.time),
      };
      return Object.values(trip).every(Number.isFinite) ? [trip] : [];
    });
  }
  const row = (value: unknown) =>
    records(value).map((item) => (Array.isArray(item.duration) ? item.duration.map(Number) : []));
  const distances = row(body.distances);
  const durations = row(body.durations);
  return distances.flatMap((cells, from) =>
    cells.flatMap((meters, to) => {
      const seconds = durations[from]?.[to];
      return Number.isFinite(meters) && Number.isFinite(seconds)
        ? [{ from, to, meters, seconds }]
        : [];
    })
  );
}

function matrixLabels(points: LatLng[], trips: Trip[]): RouteLabel[] {
  const seconds = (from: number, to: number) =>
    trips.find((trip) => trip.from === from && trip.to === to)?.seconds;
  const pairs = points.flatMap((a, i) =>
    points.slice(i + 1).flatMap((b, offset) => {
      const j = i + 1 + offset;
      const times = [seconds(i, j), seconds(j, i)].filter(
        (value): value is number => value !== undefined
      );
      const point = halfwayAlong([a, b]);
      return point && times.length > 0 ? [{ point, times }] : [];
    })
  );
  const quickest = Math.min(...pairs.map(({ times }) => Math.min(...times)));
  return pairs.map(({ point, times }) => ({
    point,
    text: times.length === 2 ? formatDurationRange(times[0], times[1]) : formatDuration(times[0]),
    fastest: Math.min(...times) === quickest,
  }));
}

export function directionDrawing(
  options: RouteOption[],
  selected: number
): PlaygroundResult["drawing"] {
  const quickest = Math.min(...options.map((option) => option.seconds));
  return {
    kind: "routes",
    routes: options[selected] ? [options[selected].path] : [],
    alternatives: options.flatMap((option, index) =>
      index === selected ? [] : [{ path: option.path, option: index }]
    ),
    labels: options.flatMap((option, index): RouteLabel[] => {
      const point = halfwayAlong(option.path);
      if (!point || !Number.isFinite(option.seconds)) return [];
      return [
        {
          point,
          text: formatDuration(option.seconds),
          fastest: option.seconds === quickest,
          option: index,
        },
      ];
    }),
  };
}

export function readResult(input: PlaygroundInput, data: unknown): PlaygroundResult {
  const empty: PlaygroundResult = {
    drawing: { kind: "none" },
    options: [],
    places: [],
    instructions: [],
  };
  if (!isRecord(data) && !Array.isArray(data)) return empty;
  const body = isRecord(data) ? data : {};

  switch (input.mode) {
    case "geocoding": {
      const results = isRecord(body.data) ? body.data.results : body.data;
      const places = records(results).flatMap((item): Place[] => {
        const point = toPoint(item);
        if (!point) return [];
        const address = typeof item.display_name === "string" ? item.display_name : item.address;
        const type = item.category ?? item.type;
        return [
          {
            name: String(item.name ?? "Unnamed place"),
            point,
            address: typeof address === "string" ? address : undefined,
            type: typeof type === "string" ? type : undefined,
          },
        ];
      });
      return { ...empty, places };
    }
    case "direction": {
      const options: RouteOption[] = [body, ...records(body.alternates ?? body.alternative)].map(
        (route) => ({
          path: toPath(route.direction),
          seconds: Number(route.timetaken),
        })
      );
      return {
        ...empty,
        drawing: directionDrawing(options, 0),
        options,
        instructions: records(body.instruction).filter(isInstruction),
      };
    }
    case "onm": {
      const origin = input.origin ?? toPath(body.origins)[0];
      const returned = toPath(body.destinations);
      const destinations =
        returned.length === input.waypoints.length || returned.length === 0
          ? input.waypoints
          : returned;
      if (!origin) return empty;
      const trips = readTrips(body);
      const quickest = Math.min(...trips.map((trip) => trip.seconds));
      const labels = trips.flatMap((trip): RouteLabel[] => {
        const destination = destinations[trip.to];
        const point = destination && halfwayAlong([origin, destination]);
        return point
          ? [{ point, text: formatDuration(trip.seconds), fastest: trip.seconds === quickest }]
          : [];
      });
      return { ...empty, drawing: { kind: "spokes", origin, destinations, labels } };
    }
    case "tss": {
      const route = toPath(body.direction ?? body.Direction);
      const seconds = Number(body.time_taken ?? body.timetaken);
      const point = halfwayAlong(route);
      const labels =
        point && Number.isFinite(seconds)
          ? [{ point, text: formatDuration(seconds), fastest: true }]
          : [];
      return { ...empty, drawing: { kind: "routes", routes: [route], alternatives: [], labels } };
    }
    case "matrix": {
      const returned = toPath(body.destinations);
      const points =
        returned.length === input.waypoints.length || returned.length === 0
          ? input.waypoints
          : returned;
      return {
        ...empty,
        drawing: { kind: "matrix", points, labels: matrixLabels(points, readTrips(body)) },
      };
    }
    case "optimizedTrip": {
      const routes = records(Array.isArray(data) ? data : body.routes).map((route) => {
        const depot = isRecord(route.depot) ? toPoint(route.depot.location) : null;
        const stops = records(route.customers).map((customer) => toPoint(customer.location));
        return [depot, ...stops].filter((point): point is LatLng => point !== null);
      });
      return { ...empty, drawing: { kind: "fleet", routes } };
    }
  }
}

function isInstruction(
  value: Record<string, unknown>
): value is Record<string, unknown> & Instruction {
  return (
    typeof value.turning_latitude === "number" &&
    typeof value.turning_longitude === "number" &&
    typeof value.distance === "number"
  );
}
