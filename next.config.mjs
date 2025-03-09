import {createMDX} from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NEXT_OUTPUT || 'standalone',
    reactStrictMode: false,
    basePath: '',
    images: {
        unoptimized: true,
    },
    experimental: {
        optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    },
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig);


