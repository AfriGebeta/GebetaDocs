//@ts-nocheck
import type {ReactNode} from 'react';
import {baseOptions} from '../layout.config';
import {source} from '@/app/source';
import ArticleLayout from "@/app/(home)/_components/ArticleLayout";
import {cn} from "@/lib/utils";
import {DocsLayout} from 'fumadocs-ui/layouts/docs';

export default function Layout({children}: { children: ReactNode }) {
    return (
        <DocsLayout
            tree={source.pageTree}
            {...baseOptions}
            sidebar={{
                component: (
                    <div
                        className={cn(
                            "[--fd-tocnav-height:36px] md:mr-[268px] lg:mr-[286px] xl:[--fd-toc-width:286px] xl:[--fd-tocnav-height:0px] ",
                        )}
                    >
                        <ArticleLayout/>
                    </div>
                ),
            }}
        >
            {children}
        </DocsLayout>
    );
}
