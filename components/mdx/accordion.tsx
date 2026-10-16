import type { ReactNode } from "react";

export function Accordions({ children }: { children: ReactNode; type?: string }) {
  return <div className="not-prose my-6 overflow-hidden rounded-lg bg-card shadow-card">{children}</div>;
}

export function Accordion({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <details className="group border-b border-border last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[15px] font-medium text-foreground transition-colors duration-150 hover:bg-hover [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="size-4 shrink-0 text-soft transition-transform duration-200 ease-power3-out group-open:rotate-180"
        >
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="prose px-4 pb-4 text-[15px] text-foreground">{children}</div>
    </details>
  );
}
