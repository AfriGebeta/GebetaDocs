import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/app/map-playground/ui";
import { EXAMPLES, findExample } from "../registry";
import { API_KEY_PLACEHOLDER, highlight, readSource } from "../source";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return EXAMPLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const example = findExample((await params).slug);
  return example ? { title: example.title, description: example.description } : {};
}

const textLink =
  "inline-flex items-center gap-1 text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-150 ease-power3-out hover:decoration-foreground";

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = findExample(slug);
  if (!example) notFound();

  const source = await readSource(slug);
  const code = await highlight(source);
  const live = `/examples/${slug}/live`;

  const index = EXAMPLES.indexOf(example);
  const previous = EXAMPLES[index - 1];
  const next = EXAMPLES[index + 1];

  return (
    <main className="mx-auto flex w-full max-w-[1000px] flex-col gap-8 px-4 py-10 sm:px-6">
      <Link
        href="/examples"
        className="inline-flex w-fit items-center gap-1.5 text-[14px] text-soft transition-colors duration-150 ease-power3-out hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All examples
      </Link>

      <header className="flex flex-col gap-3">
        <h1 className="text-[36px] font-medium leading-[1.1] tracking-[-0.03em] text-foreground md:text-[44px]">
          {example.title}
        </h1>
        <p className="max-w-[60ch] text-[18px] leading-[1.5] text-soft">{example.description}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
          <Link href={example.docs} className={textLink}>
            Read the docs
          </Link>
          <a href={live} target="_blank" rel="noreferrer" className={textLink}>
            Open in a new tab
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </header>

      <div className="h-[480px] overflow-hidden rounded-lg bg-raised shadow-card max-sm:h-[420px]">
        <iframe
          title={example.title}
          src={live}
          className="size-full border-0"
          allow="fullscreen; geolocation"
        />
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[20px] font-medium leading-[1.3] text-foreground">Code</h2>
          <CopyButton text={source} />
        </div>
        <p className="text-[14px] leading-[1.6] text-soft">
          Replace{" "}
          <code className="font-mono text-[13px] text-foreground">{API_KEY_PLACEHOLDER}</code> with
          a key from your{" "}
          <a href="https://gebeta.app/auth/register" className={textLink}>
            Gebeta dashboard
          </a>
          , save the file as{" "}
          <code className="font-mono text-[13px] text-foreground">index.html</code> and open it in a
          browser.
        </p>
        <div
          className="example-code overflow-x-auto rounded-lg border border-border bg-raised p-4 font-mono text-[13px] leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </section>

      <nav
        aria-label="More examples"
        className="flex flex-wrap justify-between gap-4 border-t border-border pt-6"
      >
        {previous ? (
          <Link href={`/examples/${previous.slug}`} className={`text-[15px] ${textLink}`}>
            <ArrowLeft className="size-4" />
            {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/examples/${next.slug}`} className={`text-[15px] ${textLink}`}>
            {next.title}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </nav>
    </main>
  );
}
