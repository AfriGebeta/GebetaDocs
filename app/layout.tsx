import './global.css';
import {RootProvider} from 'fumadocs-ui/provider';
// import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';
import gebetamaps from '@/assets/icons/gebetamaps.svg';
import Image from 'next/image';
import {footer} from "@/constants"
import Link from "next/link";
import {YoutubeIcon} from "lucide-react";
import {InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon} from "@radix-ui/react-icons";

// import {Inter} from 'next/font/google';

// const inter = Inter({
//     subsets: ['latin'],
// });

const metadata = {
    title: "GebetaMaps Documentation",
}

export default function Layout({children}: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>GebetaMaps Documentation</title>
        </head>
        <body className="min-h-screen flex flex-col">
        <RootProvider>
            <>

                <div className="flex-1">
                    {children}
                </div>

                <footer
                    className="relative flex flex-col md:flex-row justify-between md:items-center gap-y-[32px] h-[250px] px-[80px] py-[40px] ">
                    <div>
                        <div className="space-y-4">
                            <div className="flex gap-[4px] items-center">
                                <Image
                                    src={gebetamaps}
                                    width={40}
                                    height={40}
                                    alt="Gebeta Maps logo"
                                />
                                <h3 className="text-lg font-bold">GebetaMaps</h3>
                            </div>
                            <p className="mt-[24px] text-[12px] text-[#a0a0a0]">© 2024 GebetaMaps, Inc. All rights
                                reserved.</p>
                        </div>
                        <div className="mt-[24px] flex items-center gap-[8px]">
                            <Link href="https://www.instagram.com/gebetamaps">
                                <InstagramLogoIcon/>
                            </Link>
                            <Link href="https://twitter.com/GebetaMaps">
                                <TwitterLogoIcon/>
                            </Link>
                            <Link href="https://et.linkedin.com/company/gebetamaps">
                                <LinkedInLogoIcon/>
                            </Link>
                            <Link href="https://www.youtube.com/@gebetamaps">
                                <YoutubeIcon/>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-x-[96px] gap-y-[32px]">
                        {
                            footer.map((item, index) => (
                                <div key={index}>
                                    <h6 className="text-[14px] font-medium text-[14px]">{item.title}</h6>
                                    <ul className="mt-[8px] space-y-[8px] text-[#a0a0a0] text-[14px]">
                                        {
                                            item.links.map((link, index) => (
                                                <li>
                                                    <Link href={link.url} key={index}>
                                                        {link.text}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </footer>
            </>
        </RootProvider>
        </body>
        </html>
    );
}
