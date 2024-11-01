"use client"
import type {ReactNode} from 'react';
import {HomeLayout} from 'fumadocs-ui/home-layout';
import {baseOptions} from '../layout.config';
import StoreProvider from "@/poviders/StoreProvider";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <StoreProvider>
        <HomeLayout {...baseOptions}>
            {children}
        </HomeLayout>s
    </StoreProvider>
      )
}
