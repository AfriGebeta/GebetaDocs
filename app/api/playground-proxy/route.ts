import { request } from "node:https";

const ALLOWED_HOST = "mapapi.gebeta.app";
const FORWARDED_HEADERS = ["content-type", "accept"];
const TIMEOUT_MS = 30_000;

export const dynamic = "force-dynamic";

function join(chunks: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(chunks.reduce((size, chunk) => size + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

// fetch() refuses a GET with a body on both the browser and the server, but Map Matching needs one,
// so the playground sends it as a POST with X-HTTP-Method-Override and node:https replays it as a GET.
async function handle(req: Request): Promise<Response> {
  const target = URL.parse(new URL(req.url).searchParams.get("url") ?? "");
  if (!target || target.protocol !== "https:" || target.host !== ALLOWED_HOST) {
    return Response.json(
      { error: `Only requests to https://${ALLOWED_HOST} can be proxied.` },
      { status: 400 }
    );
  }

  const method = (req.headers.get("x-http-method-override") ?? req.method).toUpperCase();
  const body =
    req.method === "GET" || req.method === "HEAD"
      ? undefined
      : Buffer.from(await req.arrayBuffer());
  const headers: Record<string, string> = {};
  for (const name of FORWARDED_HEADERS) {
    const value = req.headers.get(name);
    if (value) headers[name] = value;
  }
  if (body?.length) headers["content-length"] = String(body.length);

  return new Promise<Response>((resolve) => {
    const upstream = request(target, { method, headers }, (res) => {
      const chunks: Uint8Array[] = [];
      res.on("data", (chunk: Uint8Array) => chunks.push(chunk));
      res.on("end", () => {
        const status = res.statusCode ?? 502;
        resolve(
          new Response(status === 204 || status === 304 ? null : join(chunks), {
            status,
            headers: { "content-type": res.headers["content-type"] ?? "application/json" },
          })
        );
      });
    });
    upstream.setTimeout(TIMEOUT_MS, () =>
      upstream.destroy(new Error("The API took too long to respond."))
    );
    upstream.on("error", (error) =>
      resolve(Response.json({ error: `Couldn't reach the API: ${error.message}` }, { status: 502 }))
    );
    if (body?.length) upstream.write(body);
    upstream.end();
  });
}

export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE };
