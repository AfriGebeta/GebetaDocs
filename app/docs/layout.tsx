import type { ReactNode } from "react";
import docsConfig from "@/docs.config";
import { createNextDocsLayout, createNextDocsMetadata } from "@farming-labs/next/layout";

export const metadata = createNextDocsMetadata(docsConfig);

const DocsLayout = createNextDocsLayout(docsConfig);

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout>{children}</DocsLayout>;
}
