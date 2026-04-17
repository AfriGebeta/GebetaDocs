import { generateLlmsFull } from '@/lib/llms';

export const runtime = 'nodejs';

export async function GET() {
    const content = await generateLlmsFull();

    return new Response(content, {
        headers: {
            'content-type': 'text/plain; charset=utf-8',
            'cache-control': 'public, max-age=900',
        },
    });
}
