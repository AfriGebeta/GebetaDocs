import { notFound } from "next/navigation";
import { EXAMPLES, findExample } from "../../registry";
import { readSource, withApiKey } from "../../source";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return EXAMPLES.map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findExample(slug)) notFound();

  const source = await readSource(slug);
  const html =
    withApiKey(source) ??
    '<!doctype html><p style="font:14px system-ui;padding:24px">Set NEXT_PUBLIC_GEBETA_MAP_KEY to run this example.</p>';

  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
