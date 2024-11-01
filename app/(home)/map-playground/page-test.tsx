
import {Card} from "@/components/ui/card";
import {useRouter} from "next/navigation";
import {Route} from "lucide-react";

export default function MapPlaygroundPage() {
    const router = useRouter();
    const features = [
        {
            name: "Direction",
            description:
                "A direction API provides directions for various travel modes, including driving, walking, cycling, or public transit.",
            icon: <Route/>,
            link: "/map-playground/direction",
        },
        {
            name: "Matrix",
            description:
                "A matrix API calculates travel times and distances between multiple origins and destinations for route optimization.",
            icon: <Route/>,
            link: "/map-playground/matrix",
        },
        {
            name: "One-to-Many",
            description:
                "The One-to-Many (ONM) API provides travel times and distances from a single origin to multiple destinations for route analysis.",
            icon: <Route/>,
            link: "/map-playground/onm",
        },
        {
            name: "Route Optimization",
            description:
                "Route optimization finds the best routes based on criteria like minimizing travel time, distance, or cost.",
            icon: <Route/>,
            link: "/map-playground/route-optimization",
        },
        {
            name: "Forward and Reverse Geocoding",
            description:
                "Forward geocoding converts addresses or place names into geographic coordinates, while reverse geocoding converts coordinates into human-readable addresses.",
            icon: <Route/>,
            link: "/map-playground/geocoding",
        },
    ];
    return (
        <div className="min-h-screen xl:mx-32 mt-[40px]">
            <h2 className="text-lg font-semibold whitespace-nowrap">Map Playground</h2>
            <div className="mt-[32px] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <Card
                        onClick={() => router.push(feature.link)}
                        className="py-6 px-4 bg-zinc-50 dark:bg-stone-900/50 shadow-none border border-zinc-200 dark:border-stone-900 backdrop-blur-xl cursor-pointer hover:border-primary dark:hover:border-amber-500 transition-all duration-200"
                        key={feature.name}
                    >
                        <div className="flex items-center mb-4">
                            <div className="icon mr-3">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold">{feature.name}</h3>
                        </div>
                        <p className="text-sm text-fd-muted-foreground">
                            {feature.description}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    )
}
