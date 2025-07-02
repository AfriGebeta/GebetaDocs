"use client";

import {BringToFrontIcon, Globe2Icon, MapIcon, MapPinIcon, RouteIcon, WaypointsIcon, WebhookIcon,} from "lucide-react";
import {cn} from "@/lib/utils";
import {TechStackDisplay} from "@/components/techstack-display";

const features = [
    {
        id: 7,
        label: "Tiles",
        title: "Map <strong>Tiles</strong> API",
        description: "A tile API provides map tiles for displaying maps in your application.",
        icon: MapIcon,
    },
    {
        id: 1,
        label: "Direction",
        title: "Advanced <strong>Direction</strong> API",
        description: "A direction API provides directions for various travel modes, including driving, walking, cycling, or public transit.",
        icon: RouteIcon,
    },
    {
        id: 4,
        label: "Route Optimization",
        title: "Smart <strong>Route Optimization</strong>",
        description: "Route optimization finds the best routes based on criteria like minimizing travel time, distance, or cost.",
        icon: WaypointsIcon,
    },
    {
        id: 2,
        label: "Matrix",
        title: "Travel Time <strong>Matrix</strong>",
        description: "A matrix API calculates travel times and distances between multiple origins and destinations for route optimization.",
        icon: WebhookIcon,
    },
    {
        id: 3,
        label: "One-to-Many",
        title: "Efficient <strong>One-to-Many</strong> Routing",
        description: "The One-to-Many (ONM) API provides travel times and distances from a single origin to multiple destinations for route analysis.",
        icon: MapPinIcon,
    },
    // {
    //     id: 5,
    //     label: "VRP",
    //     title: "Vehicle <strong>Route Planning</strong>",
    //     description: "VRP api is designed to help optimize vehicle routes for delivery and fleet management tasks, where multiple depots and vehicles are involved.",
    //     icon: WaypointsIcon,
    // },
    {
        id: 6,
        label: "Geocoding",
        title: "<strong>Geocoding</strong> Services",
        description: "Geocoding matches user queries with places on the map, such as restaurants, hotels, parks, or museums.",
        icon: BringToFrontIcon,
    },
];

export default function Features() {
    return (
        <div
            className="md:w-10/12 mt-10 mx-auto relative md:border-x-0 md:border-b-0 md:border-[1.2px] rounded-none -pr-2 dark:bg-black/[0.95]">
            <div className="w-full md:mx-0">
                <div className="grid grid-cols-1 relative md:grid-rows-2 md:grid-cols-3 border-b-[1.2px]">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={cn(
                                "justify-center border-x-[1.2px] md:min-h-[240px] border-t-[1.2px] md:border-t-0 transform-gpu flex flex-col p-10",
                                index >= 3 && "md:border-t-[1.2px]",
                            )}
                        >
                            <div className="flex items-center gap-2 my-1">
                                <feature.icon className="w-4 h-4"/>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.label}
                                </p>
                            </div>
                            <div className="mt-2">
                                <div className="max-w-full">
                                    <div className="flex gap-3 ">
                                        <p
                                            className="max-w-lg text-xl font-normal tracking-tighter md:text-2xl"
                                            dangerouslySetInnerHTML={{
                                                __html: feature.title,
                                            }}
                                        />
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-left text-muted-foreground">
                                    {feature.description}
                                    <a className="ml-2 underline" href="/docs" target="_blank">
                                        Learn more
                                    </a>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="relative col-span-3 h-full py-20">
                    <div className="w-full h-full p-16 pt-10 md:px-10">
                        <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                            <div className="flex items-center gap-2">
                                <Globe2Icon className="w-4 h-4"/>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Let us find your way
                                </p>
                            </div>
                            <p className="max-w-md mx-auto mt-4 text-4xl font-normal tracking-tighter text-center md:text-4xl">
                                <strong>Map your way with confidence in minutes!</strong>
                            </p>
                            <div className="flex mt-[10px] z-20 justify-center items-start">
                                <TechStackDisplay
                                    skills={[
                                        "flutter",
                                        "react",
                                        "nextJs",
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}