"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/providers/ToastProvider";
import { EXAMPLE_TRIP, MAX_WAYPOINTS, MODES, WAYPOINT_LABEL, pickTargets } from "./modes";
import { buildRequest, directionDrawing, readResult, send, toCurl, validate } from "./request";
import type {
  Drawing,
  GeocodeDirection,
  Instruction,
  LatLng,
  ModeId,
  PickTarget,
  Place,
  PlaygroundInput,
  RouteOption,
} from "./types";
import {
  CodeBlock,
  CoordinateInput,
  CopyButton,
  Field,
  PointList,
  Segmented,
  Switch,
  TextButton,
} from "./ui";

const PlaygroundMap = dynamic(() => import("./playground-map"), {
  ssr: false,
  loading: () => <div className="size-full bg-raised" />,
});

const API_KEY_STORAGE = "gebeta-playground-api-key";

const PICK_LABELS: Record<PickTarget, string> = {
  origin: "Origin",
  waypoint: "Stops",
  destination: "Destination",
};

function defaultPickTarget(mode: ModeId, geocodeDirection: GeocodeDirection): PickTarget | null {
  return pickTargets({ mode, geocodeDirection, withWaypoints: false })[0] ?? null;
}

export function Playground() {
  const { addToast } = useToast();

  const [mode, setMode] = useState<ModeId>("geocoding");
  const [apiKey, setApiKey] = useState("");
  const [geocodeDirection, setGeocodeDirection] = useState<GeocodeDirection>("forward");
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [waypoints, setWaypoints] = useState<LatLng[]>([]);
  const [withWaypoints, setWithWaypoints] = useState(false);
  const [withAlternatives, setWithAlternatives] = useState(false);
  const [tripJson, setTripJson] = useState(EXAMPLE_TRIP);
  const [pickTarget, setPickTarget] = useState<PickTarget | null>(null);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<unknown>(undefined);
  const [drawing, setDrawing] = useState<Drawing>({ kind: "none" });
  const [routeOptions, setRouteOptions] = useState<RouteOption[]>([]);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [activeInstruction, setActiveInstruction] = useState<number | null>(null);
  const [requestTab, setRequestTab] = useState<"curl" | "url">("curl");

  useEffect(() => {
    try {
      setApiKey(localStorage.getItem(API_KEY_STORAGE) ?? "");
    } catch {}
  }, []);

  const input: PlaygroundInput = {
    mode,
    apiKey,
    geocodeDirection,
    query,
    origin,
    destination,
    waypoints,
    withWaypoints,
    withAlternatives,
    tripJson,
  };
  const request = buildRequest(input);
  const targets = pickTargets(input);
  const maxWaypoints = MAX_WAYPOINTS[mode];
  const current = MODES.find((item) => item.id === mode) ?? MODES[0];
  const shownDrawing = useMemo(
    () => (routeOptions.length > 0 ? directionDrawing(routeOptions, selectedRoute) : drawing),
    [routeOptions, selectedRoute, drawing]
  );
  const formattedResponse = useMemo(
    () =>
      response === undefined
        ? ""
        : typeof response === "string"
          ? response
          : JSON.stringify(response, null, 2),
    [response]
  );

  const clearResult = () => {
    setResponse(undefined);
    setDrawing({ kind: "none" });
    setRouteOptions([]);
    setSelectedRoute(0);
    setPlaces([]);
    setSelectedPlace(null);
    setInstructions([]);
    setActiveInstruction(null);
  };

  const changeMode = (next: ModeId) => {
    setMode(next);
    setOrigin(null);
    setDestination(null);
    setWaypoints([]);
    setWithWaypoints(false);
    setPickTarget(defaultPickTarget(next, geocodeDirection));
    clearResult();
  };

  const changeGeocodeDirection = (next: GeocodeDirection) => {
    setGeocodeDirection(next);
    setOrigin(null);
    setPickTarget(defaultPickTarget("geocoding", next));
    clearResult();
  };

  const changeApiKey = (next: string) => {
    setApiKey(next);
    try {
      localStorage.setItem(API_KEY_STORAGE, next);
    } catch {}
  };

  const handlePick = (target: PickTarget, point: LatLng) => {
    if (target === "origin") {
      setOrigin(point);
      if (mode === "direction") setPickTarget("destination");
      if (mode === "onm") setPickTarget("waypoint");
    } else if (target === "destination") {
      setDestination(point);
    } else {
      setWaypoints((current) => (current.length < maxWaypoints ? [...current, point] : current));
    }
  };

  const run = async () => {
    const problem = validate(input);
    if (problem) {
      addToast(problem, "error");
      return;
    }
    setLoading(true);
    clearResult();
    try {
      const data = await send(request);
      const result = readResult(input, data);
      setResponse(data);
      setDrawing(result.drawing);
      setRouteOptions(result.options);
      setPlaces(result.places);
      setInstructions(result.instructions);
      setActiveInstruction(result.instructions.length > 0 ? 0 : null);
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100dvh-4rem)] max-lg:h-auto max-lg:flex-col">
      <aside className="flex w-[380px] shrink-0 flex-col overflow-y-auto border-r border-border bg-background max-lg:order-2 max-lg:w-full max-lg:border-r-0 max-lg:border-t">
        <section className="flex flex-col gap-1 border-b border-border px-4 py-5">
          <h1 className="text-[20px] font-medium leading-[1.3] text-foreground">Map playground</h1>
          <p className="text-[14px] leading-[1.5] text-soft">
            Send real requests to the Gebeta Maps API and see the results on the map.
          </p>
        </section>

        <section className="flex flex-col gap-4 border-b border-border px-4 py-4">
          <Field
            label="API key"
            hint={
              <>
                Saved in this browser only.{" "}
                <a
                  href="https://gebeta.app/auth/register"
                  className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                >
                  Get a key
                </a>
              </>
            }
          >
            <Input
              value={apiKey}
              onChange={(event) => changeApiKey(event.target.value)}
              placeholder="Paste your API key"
              autoComplete="off"
              spellCheck={false}
              className="font-mono text-[13px]"
            />
          </Field>

          <Field
            label="API"
            hint={
              <>
                {current.description}{" "}
                <Link
                  href={current.docs}
                  className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                >
                  Docs
                </Link>
              </>
            }
          >
            <Select
              value={mode}
              onChange={(event) => changeMode(event.target.value as ModeId)}
              aria-label="API"
            >
              {MODES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Field>
        </section>

        <section className="flex flex-col gap-4 border-b border-border px-4 py-4">
          {mode === "geocoding" && (
            <>
              <Segmented
                label="Geocoding direction"
                value={geocodeDirection}
                onChange={changeGeocodeDirection}
                options={[
                  { value: "forward", label: "Search by name" },
                  { value: "reverse", label: "Look up a point" },
                ]}
              />
              {geocodeDirection === "forward" ? (
                <Field label="Search">
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") run();
                    }}
                    placeholder="Bole"
                  />
                </Field>
              ) : (
                <Field label="Point" hint="Click the map, or type latitude and longitude.">
                  <CoordinateInput value={origin} onChange={setOrigin} aria-label="Point" />
                </Field>
              )}
            </>
          )}

          {(mode === "direction" || mode === "onm") && (
            <Field label="Origin">
              <CoordinateInput value={origin} onChange={setOrigin} aria-label="Origin" />
            </Field>
          )}

          {mode === "direction" && (
            <Field label="Destination">
              <CoordinateInput
                value={destination}
                onChange={setDestination}
                aria-label="Destination"
              />
            </Field>
          )}

          {(mode === "onm" ||
            mode === "matrix" ||
            mode === "tss" ||
            (mode === "direction" && withWaypoints)) && (
            <Field
              label={WAYPOINT_LABEL[mode]}
              action={
                <span className="flex items-center gap-3">
                  <span className="text-[13px] text-subtle">
                    {waypoints.length} / {maxWaypoints}
                  </span>
                  {waypoints.length > 0 && (
                    <TextButton onClick={() => setWaypoints([])}>Clear</TextButton>
                  )}
                </span>
              }
            >
              <PointList points={waypoints} onChange={setWaypoints} max={maxWaypoints} />
            </Field>
          )}

          {mode === "optimizedTrip" && (
            <Field
              label="Request body"
              action={
                <TextButton onClick={() => setTripJson(EXAMPLE_TRIP)}>Reset example</TextButton>
              }
              hint="Vehicles, customers and depots, as described in the VRP docs."
            >
              <Textarea
                value={tripJson}
                onChange={(event) => setTripJson(event.target.value)}
                rows={14}
                spellCheck={false}
                className="font-mono text-[12px]"
              />
            </Field>
          )}

          {targets.length > 0 && (
            <Field label="Click the map to set">
              <Segmented
                label="Click the map to set"
                value={pickTarget}
                onChange={setPickTarget}
                options={targets.map((target) => ({ value: target, label: PICK_LABELS[target] }))}
              />
            </Field>
          )}

          {mode === "direction" && (
            <div className="flex flex-col gap-3">
              <Switch
                label="Stops"
                hint="Pass through up to 10 points on the way."
                checked={withWaypoints}
                onChange={(checked) => {
                  setWithWaypoints(checked);
                  if (!checked) {
                    setWaypoints([]);
                    if (pickTarget === "waypoint") setPickTarget("origin");
                  }
                }}
              />
              <Switch
                label="Alternatives"
                hint="Show other possible routes."
                checked={withAlternatives}
                onChange={setWithAlternatives}
              />
            </div>
          )}

          <Button onClick={run} disabled={loading} className="w-full">
            {loading
              ? "Sending…"
              : mode === "geocoding" && geocodeDirection === "forward"
                ? "Search"
                : "Send request"}
          </Button>
        </section>

        {places.length > 0 && (
          <section className="flex flex-col gap-2 border-b border-border px-4 py-4">
            <span className="text-[13px] font-medium text-foreground">{places.length} results</span>
            <ul className="overflow-hidden rounded-lg border border-border bg-card">
              {places.map((place, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => setSelectedPlace(place)}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border px-3 py-2.5 text-left transition-colors duration-150 ease-power3-out last:border-b-0",
                      selectedPlace === place ? "bg-raised" : "hover:bg-hover"
                    )}
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0 text-soft" />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[14px] text-foreground">{place.name}</span>
                      {(place.address || place.type) && (
                        <span className="text-[13px] text-subtle">
                          {[place.address, place.type].filter(Boolean).join(" · ")}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="flex flex-col gap-2 border-b border-border px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-medium text-foreground">Request</span>
            <div className="flex items-center gap-3">
              {(["curl", "url"] as const).map((tab) => (
                <TextButton
                  key={tab}
                  onClick={() => setRequestTab(tab)}
                  className={cn(requestTab === tab && "text-foreground")}
                >
                  {tab === "curl" ? "cURL" : "URL"}
                </TextButton>
              ))}
              <CopyButton text={requestTab === "curl" ? toCurl(request) : request.url} />
            </div>
          </div>
          <CodeBlock>{requestTab === "curl" ? toCurl(request) : request.url}</CodeBlock>
        </section>

        <section className="flex flex-col gap-2 px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-medium text-foreground">Response</span>
            {formattedResponse && <CopyButton text={formattedResponse} />}
          </div>
          {formattedResponse ? (
            <CodeBlock className="max-h-[28rem] break-normal whitespace-pre">
              {formattedResponse}
            </CodeBlock>
          ) : (
            <p className="text-[13px] text-subtle">Send a request to see the response here.</p>
          )}
        </section>

        <section className="mt-auto border-t border-border px-4 py-3">
          <a
            href="https://playground.tiles.gebeta.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[13px] text-soft transition-colors duration-150 hover:text-foreground"
          >
            Map tiles playground
            <ArrowUpRight className="size-3.5" />
          </a>
        </section>
      </aside>

      <div className="relative min-w-0 flex-1 max-lg:order-1 max-lg:h-[60dvh]">
        <PlaygroundMap
          origin={origin}
          destination={destination}
          waypoints={waypoints}
          place={selectedPlace?.point ?? null}
          drawing={shownDrawing}
          instructions={instructions}
          activeInstruction={activeInstruction}
          pickTarget={pickTarget}
          onPick={handlePick}
          onSelectInstruction={setActiveInstruction}
          onSelectRoute={setSelectedRoute}
        />
      </div>
    </div>
  );
}
