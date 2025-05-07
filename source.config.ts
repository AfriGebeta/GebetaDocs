import {defineCollections, defineConfig, defineDocs} from 'fumadocs-mdx/config';
import {z} from "zod"

export const {docs, meta} = defineDocs();
export const changelogCollection = defineCollections({
    type: "doc",
    dir: "./content/changelogs",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
    }),
});

export default defineConfig();
