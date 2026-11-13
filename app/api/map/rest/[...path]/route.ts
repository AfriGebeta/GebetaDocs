import {
  API_ORIGIN,
  forbidden,
  fromOwnSite,
  gebetaKey,
  notConfigured,
  rateLimited,
  tooMany,
} from "@/lib/gebeta-proxy";

export const dynamic = "force-dynamic";

const ENDPOINTS: Record<string, string> = {
  "api/route/direction": "api/route/direction/",
  "api/v1/route/geocoding": "api/v1/route/geocoding",
  "api/v1/route/revgeocoding": "api/v1/route/revgeocoding",
  "v2/search/geocode": "v2/search/geocode",
  "v2/search/reverse-geocoding": "v2/search/reverse-geocoding",
};
const REQUESTS_PER_MINUTE = 60;
const TIMEOUT_MS = 30_000;

export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!fromOwnSite(req)) return forbidden();
  const key = gebetaKey();
  if (!key) return notConfigured();

  const endpoint = ENDPOINTS[(await params).path.join("/")];
  if (!endpoint) return Response.json({ error: "Not found" }, { status: 404 });
  if (rateLimited("rest", req, REQUESTS_PER_MINUTE)) return tooMany();

  const query = new URL(req.url).searchParams;
  query.set("apiKey", key);

  let upstream: Response;
  try {
    upstream = await fetch(`${API_ORIGIN}/${endpoint}?${query}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    console.error("[map proxy]", endpoint, error);
    return Response.json({ error: "Couldn't reach the Gebeta API." }, { status: 502 });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
  });
}
