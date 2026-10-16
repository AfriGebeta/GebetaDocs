import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  logging: {
    browserToTerminal: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return ["/", "/changelogs/:path*", "/community", "/authentication"].map((source) => ({
      source,
      destination: "/docs",
      permanent: false,
    }));
  },
};

export default withMDX(config);
