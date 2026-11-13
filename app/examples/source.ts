import { readFile } from "node:fs/promises";
import path from "node:path";
import { codeToHtml } from "shiki";
import { API_ORIGIN, API_PROXY_PATH, TILES_ORIGIN, TILES_PROXY_PATH } from "@/lib/gebeta-proxy";

const SOURCES = path.join(process.cwd(), "app/examples/sources");

export const API_KEY_PLACEHOLDER = "YOUR_API_KEY";

export function readSource(slug: string) {
  return readFile(path.join(SOURCES, `${slug}.html`), "utf8");
}

export async function readReactSource(slug: string): Promise<string | null> {
  try {
    return await readFile(path.join(SOURCES, "react", `${slug}.jsx`), "utf8");
  } catch {
    return null;
  }
}

const PROXY_SHIM = `<script>
(() => {
  const routes = [
    ["${TILES_ORIGIN}/", "${TILES_PROXY_PATH}/"],
    ["${API_ORIGIN}/", "${API_PROXY_PATH}/"],
  ];
  const proxied = (url) => {
    const route = routes.find(([from]) => url.startsWith(from));
    if (!route) return null;
    const target = new URL(route[1] + url.slice(route[0].length), location.origin);
    target.searchParams.delete("apiKey");
    target.pathname = target.pathname.replace(/\\/$/, "");
    return target.href;
  };
  const fetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = proxied(input instanceof Request ? input.url : String(input));
    if (!url) return fetch(input, init);
    return fetch(input instanceof Request ? new Request(url, input) : url, init);
  };
})();
</script>`;

// The demo pages keep the SDK's own calls, so the shim reroutes them to this site's proxy, which adds the key.
export function forLiveDemo(source: string) {
  return source
    .replaceAll(API_KEY_PLACEHOLDER, "proxied")
    .replace(/<head>/i, (head) => `${head}\n${PROXY_SHIM}`);
}

export function highlight(source: string) {
  return codeToHtml(source, {
    lang: "html",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}

export function highlightJsx(source: string) {
  return codeToHtml(source, {
    lang: "jsx",
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
