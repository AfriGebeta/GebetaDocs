export const TILES_ORIGIN = "https://tiles.gebeta.app";
export const API_ORIGIN = "https://mapapi.gebeta.app";

export const TILES_PROXY_PATH = "/api/map/tiles";
export const API_PROXY_PATH = "/api/map/rest";

export function gebetaKey() {
  return process.env.GEBETA_TOKEN?.trim() || null;
}

const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; start: number }>();

export function rateLimited(bucket: string, req: Request, limit: number) {
  const id = `${bucket}:${clientIp(req)}`;
  const now = Date.now();
  const entry = hits.get(id);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(id, { count: 1, start: now });
    if (hits.size > 10_000) hits.clear();
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local"
  );
}

function hostOf(url: string | null) {
  if (!url) return null;
  return URL.parse(url)?.host ?? null;
}

function requestHost(req: Request) {
  return (
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    req.headers.get("host") ||
    new URL(req.url).host
  );
}

/**
 * Browsers send Sec-Fetch-Site on every request, with Origin or Referer as a fallback, so this keeps other
 * websites from using the proxy. Scripts can forge these headers; the per-IP rate limit covers those.
 */
export function fromOwnSite(req: Request) {
  const site = req.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";
  const source = hostOf(req.headers.get("origin")) ?? hostOf(req.headers.get("referer"));
  return source === requestHost(req);
}

export function publicOrigin(req: Request) {
  const host = requestHost(req);
  const local = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host);
  const proto =
    req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || (local ? "http" : "https");
  return `${proto}://${host}`;
}

export const forbidden = () => Response.json({ error: "Forbidden" }, { status: 403 });
export const tooMany = () => Response.json({ error: "Too many requests" }, { status: 429 });
export const notConfigured = () =>
  Response.json({ error: "The map key isn't configured on the server." }, { status: 503 });
