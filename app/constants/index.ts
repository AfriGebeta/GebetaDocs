interface FooterProps {
    title: string;
    links: Array<{ text: string; url: string }>;
}

export const footer: Array<FooterProps> = [
    {
        title: "Products",
        links: [
            {
                text: "Pricing",
                url: "/pricing"
            },
        ]
    },
    {
        title: "Resources",
        links: [
            {
                text: "Documentation",
                url: "/docs",
            },
            {
                text: "Community",
                url: "https://t.me/gebetamaps",
            },
        ],
    },
    {
        title: "Legal",
        links: [
            {
                text: "Privacy Policy",
                url: "https://gebeta.app/#/privacy",
            },
            {
                text: "Terms of Service",
                url: "https://gebeta.app/#/terms",
            },
        ],
    }
]