//@ts-nocheck
import { source } from '@/app/source';
import type { Metadata } from 'next';
import { DocsBody, DocsDescription, DocsPage, DocsTitle, } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import PageActions from '@/components/custom/cards/page-actions';

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownPath = join(process.cwd(), 'content/docs', page.file.path);
  const markdown = await readFile(markdownPath, 'utf-8').catch(() => '');
  const docsRepoBaseUrl = process.env.NEXT_PUBLIC_DOCS_REPO_URL?.replace(/\/$/, '');
  const openItems = [
    { label: 'Open this page', href: page.url },
    ...(docsRepoBaseUrl
      ? [{ label: 'Open source file', href: `${docsRepoBaseUrl}/blob/main/content/docs/${page.file.path}` }]
      : []),
  ];

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <PageActions markdown={markdown} />
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents, TypeTable, Tab, Tabs, Accordion, Accordions }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
