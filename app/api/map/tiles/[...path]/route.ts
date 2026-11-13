import {
  TILES_ORIGIN,
  TILES_PROXY_PATH,
  forbidden,
  fromOwnSite,
  gebetaKey,
  notConfigured,
  publicOrigin,
  rateLimited,
  tooMany,
} from "@/lib/gebeta-proxy";

export const dynamic = "force-dynamic";

const ALLOWED = /^(tiles|sprite|fonts|styles)\//;
const REQUESTS_PER_MINUTE = 1200;
const BROWSER_CACHE = {
  styles: "public, max-age=3600",
  asset: "public, max-age=86400, stale-while-revalidate=86400",
};
const SERVER_CACHE_S = { styles: 3600, asset: 86_400 };

export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (!fromOwnSite(req)) return forbidden();
  const key = gebetaKey();
  if (!key) return notConfigured();

  // Font stacks look like "Open Sans Regular,Arial Unicode MS Regular", so commas stay literal.
  const path = (await params).path
    .map((segment) => encodeURIComponent(segment).replace(/%2C/gi, ","))
    .join("/");
  if (!ALLOWED.test(path) || path.includes("..")) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  if (rateLimited("tiles", req, REQUESTS_PER_MINUTE)) return tooMany();

  const kind = path.startsWith("styles/") ? "styles" : "asset";
  const upstream = await fetch(`${TILES_ORIGIN}/${path}?apiKey=${encodeURIComponent(key)}`, {
    cache: "force-cache",
    next: { revalidate: SERVER_CACHE_S[kind] },
  });
  if (!upstream.ok || !upstream.body) return new Response(null, { status: upstream.status });

  const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
  const headers = { "Content-Type": contentType, "Cache-Control": BROWSER_CACHE[kind] };

  // Styles point their tiles, sprites and glyphs at the tile host. Pointing them back at this proxy means
  // map workers, which can't be intercepted in the page, never need the key.
  if (kind === "styles") {
    const style = (await upstream.text()).replaceAll(
      `${TILES_ORIGIN}/`,
      `${publicOrigin(req)}${TILES_PROXY_PATH}/`
    );
    return new Response(style, { headers });
  }

  // fetch() hands the body over decompressed, so it's compressed again for the browser: vector tiles roughly halve.
  const gzip = /\bgzip\b/.test(req.headers.get("accept-encoding") ?? "");
  if (!gzip) return new Response(upstream.body, { headers });
  return new Response(upstream.body.pipeThrough(new CompressionStream("gzip")), {
    headers: { ...headers, "Content-Encoding": "gzip", Vary: "Accept-Encoding" },
  });
}
