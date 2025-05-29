//@ts-nocheck
import {changelogCollection, docs, meta} from '@/.source';
import {createMDXSource} from 'fumadocs-mdx';
import {loader} from 'fumadocs-core/source';

export const source = loader({
    baseUrl: '/docs',
    source: createMDXSource(docs, meta),
});


export const changelogs = loader({
    baseUrl: "/changelogs",
    source: createMDXSource(changelogCollection, meta),
});