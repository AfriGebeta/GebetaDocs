//@ts-nocheck
import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ReactNode } from "react";
import { ToastProvider } from "@/providers/ToastProvider";
import { NavbarProvider } from "@/components/nav-mobile";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { baseUrl, createMetadata } from "@/lib/metadata";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata = createMetadata({
  title: {
    template: "%s | GebetaMaps Documentation",
    default: "GebetaMaps",
  },
  description: "The Complete Map API for Africa.",
  metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>GebetaMaps Documentation</title>
        <link href="maplibre-gl@latest/dist/maplibre-gl.css" rel="stylesheet" />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <RootProvider
            theme={{
              enableSystem: false,
              defaultTheme: "light",
            }}
          >
            <NavbarProvider>
              <Navbar />
              <ToastProvider>{children}</ToastProvider>
            </NavbarProvider>
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
