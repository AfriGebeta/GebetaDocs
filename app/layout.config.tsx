import {type HomeLayoutProps} from 'fumadocs-ui/home-layout';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: HomeLayoutProps = {
    nav: {
        enabled: false
    },
    links: [
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
