//@ts-nocheck
import {HomeLayoutProps} from "fumadocs-ui/layouts/home";

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
};
