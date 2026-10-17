export type LatLng = { lat: number; lng: number };

export type ModeId = "geocoding" | "direction" | "matrix" | "onm" | "tss" | "optimizedTrip";

export type PickTarget = "origin" | "destination" | "waypoint";

export type GeocodeDirection = "forward" | "reverse";

export type Instruction = {
  path: string;
  distance: number;
  turning_latitude: number;
  turning_longitude: number;
};

export type Place = {
  name: string;
  point: LatLng;
  address?: string;
  type?: string;
};

export type RouteLabel = {
  point: LatLng;
  text: string;
  fastest: boolean;
  option?: number;
};

export type RouteOption = { path: LatLng[]; seconds: number };

export type Drawing =
  | { kind: "none" }
  | {
      kind: "routes";
      routes: LatLng[][];
      alternatives: { path: LatLng[]; option: number }[];
      labels: RouteLabel[];
    }
  | { kind: "matrix"; points: LatLng[]; labels: RouteLabel[] }
  | { kind: "spokes"; origin: LatLng; destinations: LatLng[]; labels: RouteLabel[] }
  | { kind: "fleet"; routes: LatLng[][] };

export type PlaygroundInput = {
  mode: ModeId;
  apiKey: string;
  geocodeDirection: GeocodeDirection;
  query: string;
  origin: LatLng | null;
  destination: LatLng | null;
  waypoints: LatLng[];
  withWaypoints: boolean;
  withAlternatives: boolean;
  tripJson: string;
};

export type PlaygroundRequest = {
  method: "GET" | "POST";
  url: string;
  body?: string;
};

export type PlaygroundResult = {
  drawing: Drawing;
  options: RouteOption[];
  places: Place[];
  instructions: Instruction[];
};
