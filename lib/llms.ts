import { readFile } from 'node:fs/promises';
import { source } from '@/app/source';

const PUBLIC_SITE_URL = 'https://docs.gebeta.app';

function normalizeBaseUrl(value: string): string {
    try {
        const url = new URL(value.startsWith('http') ? value : `https://${value}`);
        return url.origin;
    } catch {
        return PUBLIC_SITE_URL;
    }
}

function getSiteUrl(): string {
    return normalizeBaseUrl(PUBLIC_SITE_URL);
}

function toAbsoluteUrl(path: string): string {
    const siteUrl = getSiteUrl();
    return `${siteUrl}${path}`;
}

function safeTitle(pathSegments: string[]): string {
    const value = pathSegments[pathSegments.length - 1] ?? 'Documentation';
    return value
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function generateLlmsIndex(): string {
    const pages = source
        .getPages()
        .sort((a, b) => a.url.localeCompare(b.url));

    const lines = [
        '# Gebeta Maps Documentation',
        '',
        '> LLM-friendly index for AI agents and coding assistants.',
        '',
        `- Site: ${getSiteUrl()}`,
        `- Docs Root: ${toAbsoluteUrl('/docs')}`,
        `- Full Dump: ${toAbsoluteUrl('/llms-full.txt')}`,
        '',
        '## Documentation Pages',
        '',
    ];

    for (const page of pages) {
        const title = page.data?.title ?? safeTitle(page.slugs);
        const description = page.data?.description;
        const line = description
            ? `- [${title}](${toAbsoluteUrl(page.url)}): ${description}`
            : `- [${title}](${toAbsoluteUrl(page.url)})`;

        lines.push(line);
    }

    lines.push('', '## Other Useful Pages', '', `- API Playground: ${toAbsoluteUrl('/api-playground')}`, `- Map Playground: ${toAbsoluteUrl('/map-playground')}`, `- Changelogs: ${toAbsoluteUrl('/changelogs')}`, '');

    return lines.join('\n');
}

export async function generateLlmsFull(): Promise<string> {
    const pages = source
        .getPages()
        .sort((a: any, b: any) => a.url.localeCompare(b.url));

    const sections: string[] = [
        '# Gebeta Maps Documentation (Full)',
        '',
        '> Complete LLM-friendly dump of docs pages for offline indexing and vibe coding workflows.',
        '',
        `Source Index: ${toAbsoluteUrl('/llms.txt')}`,
        '',
    ];

    for (const page of pages) {
        const title = page.data?.title ?? safeTitle(page.slugs);
        const path = `content/docs/${page.file.path}`;
        const absoluteUrl = toAbsoluteUrl(page.url);
        const description = page.data?.description;

        const markdown = await readFile(path, 'utf-8').catch(() => '');

        sections.push(`## ${title}`);
        sections.push('');
        sections.push(`URL: ${absoluteUrl}`);
        sections.push(`Source: ${path}`);

        if (description) {
            sections.push(`Description: ${description}`);
        }

        sections.push('');
        sections.push(markdown.trim() || '_No source markdown found._');
        sections.push('');
        sections.push('---');
        sections.push('');
    }

    return sections.join('\n');
}
