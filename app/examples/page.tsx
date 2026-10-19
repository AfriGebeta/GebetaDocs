import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EXAMPLE_GROUPS } from "./registry";

export const metadata: Metadata = {
  title: "Examples",
  description: "Live, copy-paste examples of the Gebeta Maps JavaScript SDK.",
};

export default function ExamplesPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 py-12 sm:px-6">
      <header className="flex flex-col gap-4">
        <h1 className="text-[44px] font-medium leading-[1] tracking-[-0.035em] text-foreground md:text-[64px]">
          Examples
        </h1>
        <p className="max-w-[60ch] text-[18px] leading-[1.5] text-soft">
          Small, complete pages that use the{" "}
          <Link
            href="/sdk"
            className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            Gebeta Maps SDK
          </Link>
          . Each one runs live, and its code is a single HTML file you can copy and open in a
          browser.
        </p>
      </header>

      {EXAMPLE_GROUPS.map((group) => (
        <section key={group.title} className="flex flex-col gap-5">
          <h2 className="text-[26px] font-medium leading-[1.2] tracking-[-0.02em] text-foreground">
            {group.title}
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.examples.map((example) => (
              <li key={example.slug}>
                <Link
                  href={`/examples/${example.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-card outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-raised">
                    <Image
                      src={`/example-thumbs/${example.slug}.jpg`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-150 ease-power3-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    <span className="text-[16px] font-medium text-foreground">{example.title}</span>
                    <span className="text-[14px] leading-[1.5] text-soft">
                      {example.description}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
