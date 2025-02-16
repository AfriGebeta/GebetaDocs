import { type HomeLayoutProps } from 'fumadocs-ui/home-layout';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: HomeLayoutProps = {
  nav: {
    title: 'Gebeta Maps',
  },
  links: [
    {
      text: 'Documentation',
      url: '/docs',
      active: 'nested-url',
    },
    {
      text: 'Map Playground',
      url: '/map-playground',
      active: 'nested-url',
    },
    {
      text: 'API Playground',
      url: '/api-playground',
      active: 'nested-url',
    },
  ],
};
