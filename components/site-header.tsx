"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SITE_URL = "https://gebeta.app";

const SECTIONS = ["/sdk", "/examples", "/api-playground", "/map-playground"];

const LINKS = [
  { label: "Home", href: "/" },
  { label: "SDK", href: "/sdk" },
  { label: "Examples", href: "/examples" },
  { label: "API playground", href: "/api-playground" },
  { label: "Map playground", href: "/map-playground" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const inSection = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isActive = (href: string) => (href === "/" ? !SECTIONS.some(inSection) : inSection(href));

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 bg-background shadow-[0_1px_0_hsl(var(--border))]">
      <nav aria-label="Main" className="flex h-16 items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Image src="/assets/logo.svg" width={28} height={28} alt="" priority />
          <span className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">
            GebetaMaps
          </span>
        </Link>

        <ul className="ml-auto flex min-w-0 items-center gap-4 overflow-x-auto whitespace-nowrap [scrollbar-width:none] max-sm:hidden sm:gap-6">
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

        <Button asChild variant="ink" size="sm" className="ml-2 max-sm:hidden">
          <a href={`${SITE_URL}/auth/register`}>Get API key</a>
        </Button>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="ml-auto flex size-9 cursor-pointer items-center justify-center rounded-md text-foreground outline-none transition-colors hover:bg-hover focus-visible:ring-2 focus-visible:ring-ring/60 sm:hidden"
        >
          {mobileOpen ? (
            <X aria-hidden className="size-5" />
          ) : (
            <Menu aria-hidden className="size-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full h-[100dvh] overflow-y-auto bg-background sm:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-40 pt-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-[17px] font-medium outline-none transition-colors hover:bg-hover focus-visible:bg-hover",
                    isActive(link.href) ? "text-foreground" : "text-soft"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6">
                <Button asChild variant="ink" size="lg" className="w-full">
                  <a href={`${SITE_URL}/auth/register`}>Get API key</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
