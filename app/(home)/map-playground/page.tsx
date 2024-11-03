// app/map-playground/page.js
"use client"
import React, { Suspense } from "react";
import dynamic from 'next/dynamic';

// Dynamic imports to avoid SSR issues
const MapView = dynamic(() => import('./MapView'), { ssr: false });
const PlayGroundHeader = dynamic(() => import('./PlayGroundHeader'), { ssr: false });
const StoreProvider = dynamic(() => import('@/providers/StoreProvider'), { ssr: false });
const PlayGroundProvider = dynamic(() => import('@/providers/Playground').then(mod => mod.PlayGroundProvider), { ssr: false });

export default function MapPlayGround() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StoreProvider>
                <PlayGroundProvider>
                    <div className="flex flex-col min-h-screen">
                        <PlayGroundHeader/>
                        <div className="w-[100%] mx-auto pt-4 lg:px-10 md:px-5">
                            <MapView />
                        </div>
                    </div>
                </PlayGroundProvider>
            </StoreProvider>
        </Suspense>
    );
}