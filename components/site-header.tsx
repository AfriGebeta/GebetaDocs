"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SITE_URL = "https://gebeta.app";

const PLAYGROUNDS = ["/api-playground", "/map-playground"];

const LINKS = [
  { label: "Home", href: "/" },
  { label: "API playground", href: "/api-playground" },
  { label: "Map playground", href: "/map-playground" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const inSection = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isActive = (href: string) =>
    href === "/" ? !PLAYGROUNDS.some(inSection) : inSection(href);

  return (
    <header className="site-header sticky top-0 z-50 h-16 bg-background shadow-[0_1px_0_hsl(var(--border))]">
      <nav aria-label="Main" className="flex h-full items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Image src="/assets/logo.svg" width={28} height={28} alt="" priority />
          <span className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">
            GebetaMaps
          </span>
        </Link>

        <ul className="ml-auto flex items-center gap-6">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "text-[14px] outline-none transition-colors duration-150 ease-power3-out hover:text-foreground focus-visible:underline",
                  isActive(link.href) ? "text-foreground" : "text-soft"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button asChild variant="ink" size="sm" className="max-md:hidden">
          <a href={`${SITE_URL}/auth/register`}>Get API key</a>
        </Button>
      </nav>
    </header>
  );
}
