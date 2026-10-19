export type Example = {
  slug: string;
  title: string;
  description: string;
  docs: string;
};

export type ExampleGroup = { title: string; examples: Example[] };

export const EXAMPLE_GROUPS: ExampleGroup[] = [
  {
    title: "Getting started",
    examples: [
      {
        slug: "display-a-map",
        title: "Display a map",
        description: "Put a Gebeta map on a web page with one script tag.",
        docs: "/sdk/js",
      },
      {
        slug: "map-styles",
        title: "Switch map styles",
        description: "Change between the standard, satellite and terrain styles.",
        docs: "/sdk/js#map-styles",
      },
      {
        slug: "navigation-controls",
        title: "Add map controls",
        description: "Show zoom and compass buttons, a scale bar and a fullscreen button.",
        docs: "/sdk/js#controls",
      },
    ],
  },
  {
    title: "Camera",
    examples: [
      {
        slug: "fly-to",
        title: "Fly to a location",
        description: "Animate the map to a place when a button is clicked.",
        docs: "/sdk/js#use-maplibre-directly",
      },
      {
        slug: "tilt-and-rotate",
        title: "Tilt and rotate the map",
        description: "Start the map tilted and spin it slowly around a point.",
        docs: "/sdk/js#use-maplibre-directly",
      },
      {
        slug: "click-coordinates",
        title: "Get coordinates on click",
        description: "Show the latitude and longitude of wherever the map is clicked.",
        docs: "/sdk/js#use-maplibre-directly",
      },
    ],
  },
  {
    title: "Markers",
    examples: [
      {
        slug: "add-marker",
        title: "Add a marker with a popup",
        description: "Drop a marker on the map and open a popup above it.",
        docs: "/sdk/markers#single-markers",
      },
      {
        slug: "marker-popups",
        title: "Custom marker images",
        description: "Use your own marker image and show a popup when it's clicked.",
        docs: "/sdk/markers#marker-options",
      },
      {
        slug: "cluster-markers",
        title: "Cluster markers",
        description: "Group 300 markers into clusters that split apart as you zoom in.",
        docs: "/sdk/markers",
      },
    ],
  },
  {
    title: "Directions",
    examples: [
      {
        slug: "show-route",
        title: "Show a route",
        description: "Get the driving route between two points and draw it.",
        docs: "/sdk/directions",
      },
      {
        slug: "route-with-stops",
        title: "Route through stops",
        description: "Pass waypoints so the route visits stops in order.",
        docs: "/sdk/directions#stops",
      },
      {
        slug: "route-on-click",
        title: "Route between clicked points",
        description: "Click a start and an end on the map to get a route.",
        docs: "/sdk/directions",
      },
      {
        slug: "route-instructions",
        title: "Turn-by-turn instructions",
        description: "List each step of the route and fly to it when clicked.",
        docs: "/sdk/directions#instructions",
      },
      {
        slug: "route-style",
        title: "Style the route line",
        description: "Change the route's color, width and opacity.",
        docs: "/sdk/directions#style-the-route",
      },
    ],
  },
  {
    title: "Geocoding",
    examples: [
      {
        slug: "reverse-geocode",
        title: "Find what's at a point",
        description: "Click the map to look up the nearest named place.",
        docs: "/sdk/geocoding#reverse-geocoding",
      },
    ],
  },
  {
    title: "Geofencing",
    examples: [
      {
        slug: "draw-fence",
        title: "Draw a geofence",
        description: "Click points on the map to draw a polygon, and get it back when it closes.",
        docs: "/sdk/fencing#draw-a-fence",
      },
      {
        slug: "show-fences",
        title: "Show saved fences",
        description: "Draw zones you already have, each in its own color with a label.",
        docs: "/sdk/fencing#show-saved-fences",
      },
    ],
  },
  {
    title: "Layers",
    examples: [
      {
        slug: "geojson-layer",
        title: "Add a GeoJSON layer",
        description: "Draw your own polygon with a fill and an outline.",
        docs: "/sdk/js#use-maplibre-directly",
      },
    ],
  },
];

export const EXAMPLES = EXAMPLE_GROUPS.flatMap((group) => group.examples);

export function findExample(slug: string) {
  return EXAMPLES.find((example) => example.slug === slug);
}
