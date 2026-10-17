import type { ModeId, PickTarget, PlaygroundInput } from "./types";

export const MODES: { id: ModeId; label: string; description: string; docs: string }[] = [
  {
    id: "geocoding",
    label: "Geocoding",
    description: "Search for a place by name, or look up what is at a point.",
    docs: "/geocoding",
  },
  {
    id: "direction",
    label: "Directions",
    description: "The driving route between two points, optionally through stops.",
    docs: "/direction",
  },
  {
    id: "matrix",
    label: "Matrix",
    description: "Travel time and distance between every pair of points.",
    docs: "/matrix",
  },
  {
    id: "onm",
    label: "One to many",
    description: "Routes from one origin to several destinations.",
    docs: "/onm",
  },
  {
    id: "tss",
    label: "Route optimization",
    description: "The best order to visit a set of stops, as a round trip.",
    docs: "/route-optimization",
  },
  {
    id: "optimizedTrip",
    label: "Fleet routing (VRP)",
    description: "Split deliveries across several vehicles.",
    docs: "/vrp",
  },
];

export const MAX_WAYPOINTS: Record<ModeId, number> = {
  geocoding: 0,
  direction: 10,
  matrix: 10,
  onm: 5,
  tss: 10,
  optimizedTrip: 0,
};

export const WAYPOINT_LABEL: Record<ModeId, string> = {
  geocoding: "Points",
  direction: "Stops",
  matrix: "Points",
  onm: "Destinations",
  tss: "Stops",
  optimizedTrip: "Points",
};

export function pickTargets(
  input: Pick<PlaygroundInput, "mode" | "geocodeDirection" | "withWaypoints">
): PickTarget[] {
  switch (input.mode) {
    case "geocoding":
      return input.geocodeDirection === "reverse" ? ["origin"] : [];
    case "direction":
      return input.withWaypoints
        ? ["origin", "waypoint", "destination"]
        : ["origin", "destination"];
    case "onm":
      return ["origin", "waypoint"];
    case "matrix":
    case "tss":
      return ["waypoint"];
    case "optimizedTrip":
      return [];
  }
}

export const EXAMPLE_TRIP = JSON.stringify(
  {
    vehicles: [
      { name: "driver 1", current_location: [9.020929, 38.801699], capacities: { boxes: 3 } },
      { name: "driver 2", current_location: [9.020929, 38.801699], capacities: { boxes: 3 } },
    ],
    customers: [
      {
        name: "a",
        location: [9.022359, 38.799478],
        demand: 1,
        requested_from_depot: "work-order-1234",
      },
      {
        name: "b",
        location: [9.020431, 38.800401],
        demand: 1,
        requested_from_depot: "work-order-1234",
      },
      {
        name: "c",
        location: [9.021167, 38.798894],
        demand: 1,
        requested_from_depot: "work-order-1234",
      },
      {
        name: "d",
        location: [9.023101, 38.804816],
        demand: 1,
        requested_from_depot: "work-order-1234",
      },
      {
        name: "e",
        location: [9.022455, 38.804864],
        demand: 1,
        requested_from_depot: "work-order-1234",
      },
      {
        name: "f",
        location: [9.020251, 38.804151],
        demand: 1,
        requested_from_depot: "work-order-1234",
      },
    ],
    depots: [{ name: "work-order-1234", location: [9.020929, 38.801699] }],
  },
  null,
  2
);
