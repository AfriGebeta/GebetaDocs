"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SITE_URL = "https://gebeta.app";

const LINKS = [
  { label: "API playground", href: "/api-playground" },
  { label: "Map playground", href: "/map-playground" },
];

/** The top bar, matching the gebeta.app navbar: same height, logo, link pill and buttons. */
export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header sticky top-0 z-50 h-16 bg-background shadow-[0_1px_0_hsl(var(--border))]">
      <nav aria-label="Main" className="flex h-full items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Image src="/assets/logo.svg" width={28} height={28} alt="" priority />
          <span className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">GebetaMaps</span>
          <span className="hidden text-[16px] text-soft sm:inline">Docs</span>
        </Link>

        <ul className="flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-2 text-[14px] outline-none transition-colors duration-150 ease-power3-out focus-visible:ring-2 focus-visible:ring-ring/60",
                  isActive(link.href) ? "bg-hover text-foreground" : "text-soft hover:bg-hover hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <a
            href={`${SITE_URL}/auth/signin`}
            className="inline-flex items-center rounded-full px-3 py-2 text-[14px] font-medium text-soft outline-none transition-colors duration-150 hover:bg-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            Sign in
          </a>
          <a
            href={`${SITE_URL}/auth/register`}
            className="inline-flex items-center rounded-full bg-ink px-3 py-2 text-[14px] font-medium leading-none text-ink-foreground shadow-btn-ink outline-none transition-colors duration-150 hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            Get API key
          </a>
        </div>
      </nav>
    </header>
  );
}
