import './global.css';
import {RootProvider} from 'fumadocs-ui/provider';
import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';
import instagram from '@/assets/icons/instagram.svg';
import twitter from '@/assets/icons/twitter.svg';
import linkedin from '@/assets/icons/linkedin.svg';
import gebetamaps from '@/assets/icons/gebetamaps.svg';
import Image from 'next/image';
import {footer} from "@/app/constants";
import Link from "next/link";

const inter = Inter({
    subsets: ['latin'],
});

export default function Layout({children}: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
        <body>
        <RootProvider
        >
            {children}

            <footer className="relative flex flex-col md:flex-row justify-between md:items-center gap-y-[32px] h-[300px] px-[80px] py-[40px] ">
                <div>
                    <div className="flex gap-[4px] items-center">
                        <Image
                            src={gebetamaps}
                            width={40}
                            height={40}
                            alt="Gebeta Maps logo"
                        />
                        <h3 className="text-lg font-bold">GebetaMaps</h3>
                    </div>
                    <div className="mt-[24px] flex items-center gap-[8px]">
                        <Link href="https://www.instagram.com/gebetamaps">
                            <Image
                                src={instagram}
                                alt="Instagram icon"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link href="https://twitter.com/GebetaMaps">
                            <Image
                                src={twitter}
                                alt="Twitter icon"
                                width={20}
                                height={20}
                            />
                        </Link>
                        <Link href="https://et.linkedin.com/company/gebetamaps">
                            <Image
                                src={linkedin}
                                alt="Linkedin icon"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>
                    <p className="mt-[24px] text-[12px] text-[#a0a0a0]">© 2024 GebetaMaps, Inc. All rights reserved.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-x-[96px] gap-y-[32px]">
                    {
                        footer.map((item, index) => (
                            <div key={index}>
                                <h6 className="text-[14px] font-medium text-[14px]">{item.title}</h6>
                                <ul className="mt-[8px] space-y-[8px] text-[#a0a0a0] text-[14px]">
                                    {
                                        item.links.map((link, index) => (
                                            <li key={index}>{link.text}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </footer>
        </RootProvider>
        </body>
        </html>
    );
}
