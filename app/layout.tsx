import "maplibre-gl/dist/maplibre-gl.css";
import "./global.css";
import type { ReactNode } from "react";
import { RootProvider } from "@farming-labs/theme";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteHeader } from "@/components/site-header";
import { ToastProvider } from "@/providers/ToastProvider";
import { baseUrl, createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: {
    template: "%s | Gebeta Maps Docs",
    default: "Gebeta Maps Docs",
  },
  description: "Maps, geocoding, routing and optimization APIs for Africa, with SDKs for web and mobile.",
  metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <RootProvider theme={{ defaultTheme: "light", enableSystem: false }}>
          <SiteHeader />
          <ToastProvider>{children}</ToastProvider>
        </RootProvider>
      </body>
    </html>
  );
}
