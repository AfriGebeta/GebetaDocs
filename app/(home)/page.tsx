"use client";
import {BringToFront, Map, MapPin, Route, Waypoints, Webhook} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ReactElement} from "react";
import CodePreview from "@/components/code-preview";
import {Spotlight} from "@/components/spotlight";
import Features from "@/app/(home)/_components/feature";

export default function HomePage() {
    const features: {
        name: string;
        description: string;
        icon: ReactElement;
        link: string;
    }[] = [
        {
            name: "Direction",
            description:
                "A direction API provides directions for various travel modes, including driving, walking, cycling, or public transit.",
            icon: <Route/>,
            link: "/docs/direction",
        },
        {
            name: "Matrix",
            description:
                "A matrix API calculates travel times and distances between multiple origins and destinations for route optimization.",
            icon: <Webhook/>,
            link: "/docs/matrix",
        },
        {
            name: "One-to-Many",
            description:
                "The One-to-Many (ONM) API provides travel times and distances from a single origin to multiple destinations for route analysis.",
            icon: <MapPin/>,
            link: "/docs/onm",
        },
        {
            name: "Route Optimization",
            description:
                "Route optimization finds the best routes based on criteria like minimizing travel time, distance, or cost.",
            icon: <Waypoints/>,
            link: "/docs/route-optimization",
        },
        {
            name: "VRP",
            description:
                "VRP api is designed to help optimize vehicle routes for delivery and fleet management tasks, where multiple depots and vehicles are involved.",
            icon: <Waypoints/>,
            link: "/docs/vrp",
        },
        {
            name: "Forward and Reverse Geocoding",
            description:
                "Geocoding matches user queries with places on the map, such as restaurants, hotels, parks, or museums.",
            icon: <BringToFront/>,
            link: "/docs/geocoding/geocoding",
        },
        {
            name: "Tiles",
            description:
                "A tile API provides map tiles for displaying maps in your application.",
            icon: <Map/>,
            link: "/docs/tiles/_tiles",
        }
    ];

    const router = useRouter();

    return (
        <main className="flex flex-col min-h-screen overflow-x-hidden">

                <section
                    className="max-h-[40rem] relative w-full flex md:items-center md:justify-center dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden px-8 md:min-h-[40rem]">
                    <Spotlight/>
                    <div
                        className="overflow-hidden bg-transparent md:px-10 dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem]">
                        <div
                            className="lg:max-w-8xl mx-auto grid max-w-full grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-2 lg:grid-cols-2 lg:px-8 lg:py-4 xl:gap-x-16 xl:px-12">
                            <div className="relative z-10 md:text-center lg:text-left">
                                <div className="relative">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className="flex items-end gap-1 mt-2 ">
                                            <div className="flex items-center gap-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="0.8em"
                                                    height="0.8em"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                                    />
                                                </svg>
                                                <span className="text-xs text-opacity-75">
											Let us find your way
										</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-zinc-800 dark:text-zinc-300 mt-3 tracking-tight text-2xl md:text-3xl">
                                        The Complete Map API for Africa.
                                    </p>
                                    {
                                        <>
                                            <div
                                                className="mt-8 flex w-fit flex-col gap-4 font-sans md:flex-row md:justify-center lg:justify-start items-center">
                                                <Link
                                                    href="/docs"
                                                    className="hover:shadow-sm dark:border-stone-100 dark:hover:shadow-sm border-2 border-[#FFA500] bg-white px-4 py-1.5 text-sm uppercase text-black shadow-[1px_1px_#FFA500,2px_2px_#FFA500,3px_3px_#FFA500,4px_4px_#FFA500,5px_5px_0px_0px_#FFA500] transition duration-200 md:px-8 dark:shadow-[1px_1px_#FFA500,2px_2px_#FFA500,3px_3px_#FFA500,4px_4px_#FFA500,5px_5px_0px_0px_#FFA500]"
                                                >
                                                    Get Started
                                                </Link>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className="relative hidden md:block lg:static xl:pl-10">
                                <div className="relative">
                                    <div
                                        className="from-sky-300 via-sky-300/70 to-blue-300 absolute inset-0 rounded-none bg-gradient-to-tr opacity-5 blur-lg"/>
                                    <div
                                        className="from-stone-300 via-stone-300/70 to-blue-300 absolute inset-0 rounded-none bg-gradient-to-tr opacity-5"/>
                                    <CodePreview/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Features/>
                <hr className="h-px bg-gray-200"/>
        </main>
    );
}
