import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  logging: {
    browserToTerminal: process.env.NODE_ENV === 'production',
  },
};

export default withMDX(config);

