import { readFile } from "node:fs/promises";
import path from "node:path";
import { codeToHtml } from "shiki";

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

export function withApiKey(source: string) {
  const key = process.env.NEXT_PUBLIC_GEBETA_MAP_KEY;
  return key ? source.replaceAll(API_KEY_PLACEHOLDER, key) : null;
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
