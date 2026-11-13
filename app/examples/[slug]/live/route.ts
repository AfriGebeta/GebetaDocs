import { notFound } from "next/navigation";
import { EXAMPLES, findExample } from "../../registry";
import { forLiveDemo, readSource } from "../../source";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return EXAMPLES.map(({ slug }) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findExample(slug)) notFound();

  const html = forLiveDemo(await readSource(slug));
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
