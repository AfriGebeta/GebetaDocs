import { withDocs } from "@farming-labs/next/config";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  agentRules: false,
  logging: {
    browserToTerminal: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      // Docs used to live under /docs; they're served from / now.
      { source: "/docs", destination: "/", permanent: true },
      { source: "/docs/:path*", destination: "/:path*", permanent: true },
      ...["/changelogs/:path*", "/community", "/authentication"].map((source) => ({
        source,
        destination: "/",
        permanent: false,
      })),
    ];
  },
};

/**
 * With docs served from "/", withDocs() rewrites every root path into the docs, except a fixed list (_next/,
 * api/, llms.txt, …) that isn't configurable. The playground routes are added to that list.
 */
const OWN_ROUTES = ["map-playground", "api-playground"];

const docsConfig = withDocs(config);
const docsRewrites = docsConfig.rewrites;

docsConfig.rewrites = async () => {
  const rewrites = await docsRewrites();
  const exclusions = OWN_ROUTES.map((route) => `|${route}(?:/|$)`).join("");
  const beforeFiles = (rewrites.beforeFiles ?? []).map((rewrite) =>
    rewrite.source.startsWith("/:slug((?!_next/")
      ? { ...rewrite, source: rewrite.source.replace("(?!_next/", `(?!_next/${exclusions}`) }
      : rewrite,
  );
  return { ...rewrites, beforeFiles };
};

export default docsConfig;
