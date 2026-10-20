import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="mb-3 text-4xl font-medium uppercase tracking-[0.08em] text-soft">404</p>

      <h1 className="mb-4 text-[44px] font-medium leading-[1] tracking-[-0.035em] text-foreground md:text-[64px]">
        Page not found
      </h1>

      <p className="mb-10 max-w-[42ch] text-[18px] leading-[1.5] text-soft">
        The page you're looking for doesn't exist or has been moved. Check the URL or head back to
        the docs.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-ink-foreground shadow-btn-ink transition-opacity duration-150 hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          Back to docs
        </Link>
        <a
          href="https://gebeta.app"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[14px] font-medium text-foreground transition-colors duration-150 hover:bg-hover"
        >
          gebeta.app
        </a>
      </div>
    </main>
  );
}
