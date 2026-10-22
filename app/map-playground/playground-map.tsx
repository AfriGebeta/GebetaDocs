"use client";

import maplibregl, {
  type GeoJSONSource,
  type Map as MapLibreMap,
  type MapMouseEvent,
  type Marker,
  type RequestTransformFunction,
} from "maplibre-gl";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ALTERNATIVE_ROUTE, INK, pointColor } from "./colors";
import { LogoControl, MAP_STYLES, StyleControl } from "./map-controls";
import type { Drawing, Instruction, LatLng, PickTarget, RouteLabel } from "./types";

const ADDIS_ABABA: [number, number] = [38.75238, 9.03596];

const tileKey = process.env.NEXT_PUBLIC_GEBETA_MAP_KEY;
const transformRequest: RequestTransformFunction | undefined =
  process.env.NODE_ENV === "development" && tileKey
    ? (url, resourceType) =>
        resourceType === "Tile" ? { url, headers: { Authorization: `Bearer ${tileKey}` } } : { url }
    : undefined;

type Line = {
  coordinates: [number, number][];
  color: string;
  width: number;
  opacity?: number;
  animate: boolean;
  option?: number;
};
type LineState = { ids: string[]; selectable: string[]; frame: number | null };

const toLngLat = (point: LatLng): [number, number] => [point.lng, point.lat];

const lineFeature = (
  coordinates: [number, number][],
  option?: number
): GeoJSON.Feature<GeoJSON.LineString> => ({
  type: "Feature",
  properties: option === undefined ? {} : { option },
  geometry: { type: "LineString", coordinates },
});

function markerElement(className: string, label?: string, color?: string) {
  const element = document.createElement("div");
  element.className = cn(
    "flex size-6 items-center justify-center rounded-full border-2 border-white text-[11px] font-medium text-white",
    className
  );
  if (color) element.style.backgroundColor = color;
  if (label) element.textContent = label;
  return element;
}

const pinSvg = (color: string) =>
  `<svg aria-hidden="true" width="28" height="45" viewBox="0 0 42 68" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 0C32.598 0 42 9.40202 42 21C42 31.9234 33.6599 40.8989 23 41.906V64C23 65.1046 22.1046 66 21 66C19.8954 66 19 65.1046 19 64V41.906C8.34014 40.8989 0 31.9234 0 21C0 9.40202 9.40202 0 21 0Z" fill-rule="evenodd" clip-rule="evenodd" fill="${color}"/><path d="M28 21C28 17.134 24.866 14 21 14C17.134 14 14 17.134 14 21C14 24.866 17.134 28 21 28C24.866 28 28 24.866 28 21Z" fill="white"/><path opacity="0.3" d="M21 68C23.7614 68 26 66.8807 26 65.5C26 64.1193 23.7614 63 21 63C18.2386 63 16 64.1193 16 65.5C16 66.8807 18.2386 68 21 68Z" fill="black"/></svg>`;

function pinElement(color: string, label?: string) {
  const element = document.createElement("div");
  element.className =
    "relative h-[45px] w-[28px] [filter:drop-shadow(0_0_1px_#fff)_drop-shadow(0_0_1px_#fff)]";
  element.innerHTML = pinSvg(color);
  if (label) {
    const badge = document.createElement("span");
    badge.className =
      "absolute -top-1 left-5 flex h-4 min-w-4 items-center justify-center rounded-full border border-white bg-ink px-1 text-[10px] font-medium leading-none text-ink-foreground";
    badge.textContent = label;
    element.append(badge);
  }
  return element;
}

function labelElement(label: RouteLabel) {
  const element = document.createElement("div");
  element.className = cn(
    "relative mb-1.5 rounded-full px-2.5 py-1 text-[13px] leading-none font-medium whitespace-nowrap",
    label.option === undefined && "pointer-events-none",
    label.fastest ? "bg-ink text-ink-foreground" : "bg-subtle text-white"
  );
  element.textContent = label.text;
  const tail = document.createElement("span");
  tail.className = cn(
    "absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent",
    label.fastest ? "border-t-ink" : "border-t-subtle"
  );
  element.append(tail);
  return element;
}

function linesFor(drawing: Drawing): Line[] {
  switch (drawing.kind) {
    case "routes":
      return [
        ...drawing.alternatives.map(({ path, option }) => ({
          coordinates: path.map(toLngLat),
          color: ALTERNATIVE_ROUTE,
          width: 6,
          animate: false,
          option,
        })),
        ...drawing.routes.map((route) => ({
          coordinates: route.map(toLngLat),
          color: INK,
          width: 5,
          animate: true,
        })),
      ];
    case "fleet":
      return drawing.routes.map((route) => ({
        coordinates: route.map(toLngLat),
        color: INK,
        width: 4,
        animate: true,
      }));
    case "matrix":
      return drawing.points.flatMap((from, i) =>
        drawing.points.slice(i + 1).map((to) => ({
          coordinates: [toLngLat(from), toLngLat(to)],
          color: INK,
          width: 2,
          opacity: 0.4,
          animate: false,
        }))
      );
    case "spokes":
      return drawing.destinations.map((destination) => ({
        coordinates: [toLngLat(drawing.origin), toLngLat(destination)],
        color: INK,
        width: 2,
        opacity: 0.4,
        animate: false,
      }));
    case "none":
      return [];
  }
}

function clearLines(map: MapLibreMap, state: LineState) {
  if (state.frame !== null) cancelAnimationFrame(state.frame);
  state.frame = null;
  for (const id of state.ids) {
    for (const layer of [id, `${id}-casing`]) if (map.getLayer(layer)) map.removeLayer(layer);
    if (map.getSource(id)) map.removeSource(id);
  }
  state.ids = [];
  state.selectable = [];
}

function drawLines(map: MapLibreMap, drawing: Drawing, state: LineState) {
  clearLines(map, state);
  const lines = linesFor(drawing).filter((line) => line.coordinates.length > 1);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  lines.forEach((line, index) => {
    const id = `playground-line-${index}`;
    const layout = { "line-join": "round", "line-cap": "round" } as const;
    map.addSource(id, {
      type: "geojson",
      data: lineFeature(
        line.animate && !reduceMotion ? line.coordinates.slice(0, 2) : line.coordinates,
        line.option
      ),
    });
    map.addLayer({
      id: `${id}-casing`,
      type: "line",
      source: id,
      layout,
      paint: { "line-color": "#ffffff", "line-width": line.width + 3 },
    });
    map.addLayer({
      id,
      type: "line",
      source: id,
      layout,
      paint: {
        "line-color": line.color,
        "line-width": line.width,
        "line-opacity": line.opacity ?? 1,
      },
    });
    state.ids.push(id);
    if (line.option !== undefined) state.selectable.push(id);
  });

  const animated = lines.flatMap((line, index) =>
    line.animate ? [{ id: `playground-line-${index}`, coordinates: line.coordinates }] : []
  );
  if (reduceMotion || animated.length === 0) return;

  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / 1200, 1);
    for (const { id, coordinates } of animated) {
      const count = Math.max(2, Math.ceil(progress * coordinates.length));
      (map.getSource(id) as GeoJSONSource | undefined)?.setData(
        lineFeature(coordinates.slice(0, count))
      );
    }
    state.frame = progress < 1 ? requestAnimationFrame(step) : null;
  };
  state.frame = requestAnimationFrame(step);
}

function fitTo(map: MapLibreMap, points: LatLng[]) {
  if (points.length === 0) return;
  const bounds = points.reduce(
    (box, point) => box.extend(toLngLat(point)),
    new maplibregl.LngLatBounds(toLngLat(points[0]), toLngLat(points[0]))
  );
  map.fitBounds(bounds, { padding: 64, maxZoom: 16, duration: 800 });
}

function drawingPoints(drawing: Drawing): LatLng[] {
  switch (drawing.kind) {
    case "routes":
      return [...drawing.routes, ...drawing.alternatives.map(({ path }) => path)].flat();
    case "fleet":
      return drawing.routes.flat();
    case "matrix":
      return drawing.points;
    case "spokes":
      return [drawing.origin, ...drawing.destinations];
    case "none":
      return [];
  }
}

type MarkerSpec = { element: HTMLElement; point: LatLng; pin?: boolean; onClick?: () => void };

function replaceMarkers(store: { current: Marker[] }, map: MapLibreMap, markers: MarkerSpec[]) {
  store.current.forEach((marker) => marker.remove());
  store.current = markers.map(({ element, point, pin, onClick }) => {
    if (onClick) {
      element.style.cursor = "pointer";
      element.addEventListener("click", (event) => {
        event.stopPropagation();
        onClick();
      });
    }
    return new maplibregl.Marker({ element, anchor: pin ? "bottom" : "center" })
      .setLngLat(toLngLat(point))
      .addTo(map);
  });
}

type Props = {
  origin: LatLng | null;
  destination: LatLng | null;
  waypoints: LatLng[];
  place: LatLng | null;
  drawing: Drawing;
  instructions: Instruction[];
  activeInstruction: number | null;
  pickTarget: PickTarget | null;
  onPick: (target: PickTarget, point: LatLng) => void;
  onSelectInstruction: (index: number) => void;
  onSelectRoute: (option: number) => void;
};

export default function PlaygroundMap(props: Props) {
  const {
    origin,
    destination,
    waypoints,
    place,
    drawing,
    instructions,
    activeInstruction,
    pickTarget,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const lineState = useRef<LineState>({ ids: [], selectable: [], frame: null });
  const inputMarkers = useRef<Marker[]>([]);
  const resultMarkers = useRef<Marker[]>([]);
  const instructionMarkers = useRef<Marker[]>([]);
  const latest = useRef(props);

  useEffect(() => {
    latest.current = props;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLES[0].url,
      center: ADDIS_ABABA,
      zoom: 1,
      attributionControl: false,
      transformRequest,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new StyleControl(MAP_STYLES), "top-right");
    map.addControl(new LogoControl(), "bottom-left");
    const routeAt = (event: MapMouseEvent) => {
      const layers = lineState.current.selectable.filter((id) => map.getLayer(id));
      if (layers.length === 0) return undefined;
      const { x, y } = event.point;
      const [hit] = map.queryRenderedFeatures(
        [
          [x - 6, y - 6],
          [x + 6, y + 6],
        ],
        { layers }
      );
      return typeof hit?.properties?.option === "number" ? hit.properties.option : undefined;
    };
    map.on("click", (event: MapMouseEvent) => {
      const option = routeAt(event);
      if (option !== undefined) {
        latest.current.onSelectRoute(option);
        return;
      }
      const { pickTarget: target, onPick } = latest.current;
      if (target) onPick(target, { lat: event.lngLat.lat, lng: event.lngLat.lng });
    });
    map.on("mousemove", (event: MapMouseEvent) => {
      map.getCanvas().style.cursor =
        routeAt(event) !== undefined ? "pointer" : latest.current.pickTarget ? "crosshair" : "";
    });
    map.on("style.load", () => drawLines(map, latest.current.drawing, lineState.current));
    mapRef.current = map;

    const state = lineState.current;
    return () => {
      if (state.frame !== null) cancelAnimationFrame(state.frame);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map) map.getCanvas().style.cursor = pickTarget ? "crosshair" : "";
  }, [pickTarget]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    replaceMarkers(inputMarkers, map, [
      ...(origin
        ? [
            {
              element: pinElement(INK, destination || waypoints.length > 0 ? "A" : undefined),
              point: origin,
              pin: true,
            },
          ]
        : []),
      ...waypoints.map((point, index) => ({
        element: pinElement(pointColor(index)),
        point,
        pin: true,
      })),
      ...(destination ? [{ element: pinElement(INK, "B"), point: destination, pin: true }] : []),
      ...(place ? [{ element: pinElement(INK), point: place, pin: true }] : []),
    ]);
  }, [origin, destination, waypoints, place]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markers =
      drawing.kind === "fleet"
        ? drawing.routes.flatMap((route, routeIndex) =>
            route.map((point, stopIndex) => ({
              element: markerElement(
                "",
                stopIndex === 0 ? "D" : String(stopIndex),
                pointColor(routeIndex)
              ),
              point,
            }))
          )
        : drawing.kind === "none"
          ? []
          : drawing.labels.map((label) => ({
              element: labelElement(label),
              point: label.point,
              pin: true,
              onClick:
                label.option === undefined
                  ? undefined
                  : () => latest.current.onSelectRoute(label.option as number),
            }));
    replaceMarkers(resultMarkers, map, markers);

    const render = () => {
      drawLines(map, drawing, lineState.current);
      fitTo(map, drawingPoints(drawing));
    };
    if (map.isStyleLoaded()) render();
    else map.once("load", render);
  }, [drawing]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    replaceMarkers(
      instructionMarkers,
      map,
      instructions.map((step, index) => ({
        element: markerElement(
          cn(
            "size-5 text-[10px]",
            index === activeInstruction
              ? "bg-primary text-primary-foreground"
              : "bg-ink text-ink-foreground"
          ),
          String(index + 1)
        ),
        point: { lat: step.turning_latitude, lng: step.turning_longitude },
        onClick: () => latest.current.onSelectInstruction(index),
      }))
    );
  }, [instructions, activeInstruction]);

  useEffect(() => {
    const step = activeInstruction === null ? undefined : instructions[activeInstruction];
    if (step)
      mapRef.current?.flyTo({
        center: [step.turning_longitude, step.turning_latitude],
        zoom: 17,
        speed: 1.5,
      });
  }, [activeInstruction, instructions]);

  useEffect(() => {
    if (place) mapRef.current?.flyTo({ center: toLngLat(place), zoom: 16, speed: 1.5 });
  }, [place]);

  return (
    <div className="relative size-full">
      <div ref={containerRef} className="size-full" />
      {instructions.length > 0 && (
        <div className="absolute top-3 left-3 flex max-h-[calc(100%-1.5rem)] w-72 flex-col overflow-hidden rounded-lg border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <p className="text-[14px] font-medium text-foreground">Turn-by-turn</p>
            <p className="text-[13px] text-subtle">{instructions.length} steps</p>
          </div>
          <ol className="overflow-y-auto">
            {instructions.map((step, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => props.onSelectInstruction(index)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-border px-4 py-2.5 text-left transition-colors duration-150 ease-power3-out last:border-b-0",
                    index === activeInstruction ? "bg-raised" : "hover:bg-hover"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium",
                      index === activeInstruction
                        ? "bg-primary text-primary-foreground"
                        : "bg-raised text-soft"
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[14px] text-foreground">{step.path || "Continue"}</span>
                    <span className="text-[13px] text-subtle">{Math.round(step.distance)} m</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
