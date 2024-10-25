"use client";
import GridPattern from "@/components/custom/backgrounds/grid-pattern";
import Ripple from "@/components/custom/backgrounds/ripple";
import { ShineBorder } from "@/components/custom/cards/animated-beams";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Hero from "@/layout/home/hero";
import { cn } from "@/lib/utils";
import { ArrowRight, BringToFront, MapPin, Route, Waypoints, Webhook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import Flutter from "@/assets/icons/icons8-flutter-48.png";
import Node from "@/assets/icons/icons8-nodejs-48.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

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
      icon: <Route />,
      link: "/direction",
    },
    {
      name: "Matrix",
      description:
        "A matrix API calculates travel times and distances between multiple origins and destinations for route optimization.",
      icon: <Webhook />,
      link: "/matrix",
    },
    {
      name: "One-to-Many",
      description:
        "The One-to-Many (ONM) API provides travel times and distances from a single origin to multiple destinations for route analysis.",
      icon: <MapPin />,
      link: "/onm",
    },
    {
      name: "Route Optimization",
      description:
        "Route optimization finds the best routes based on criteria like minimizing travel time, distance, or cost.",
      icon: <Waypoints />,
      link: "/route-optimization",
    },
    {
      name: "Forward and Reverse Geocoding",
      description:
        "Geocoding matches user queries with places on the map, such as restaurants, hotels, parks, or museums.",
      icon: <BringToFront />,
      link: "/geocoding",
    },
  ];

  const router = useRouter();

  return (
    <main className="flex flex-col h-screen m-6 xl:mx-32 xl:my-24 gap-16">
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 z-[-1]"
        )}
      />
      <div className="flex flex-col lg:flex-row justify-between max-lg:gap-6">
        <section className="flex flex-col justify-start text-start gap-4 mt-10">
          <h1 className="text-2xl lg:text-5xl font-bold xl:w-3/4">
            Build with Precision, Powered by{" "}
            <span className="text-primary">GebetaMaps</span>
          </h1>
          <p className="text-fd-muted-foreground xl:w-3/4 max-md:text-sm text-justify">
            GebetaMaps delivers powerful APIs for all your location-based needs,
            from geocoding to route optimization. With up-to-date data and
            easy-to-use features, you can build precise, scalable solutions
            quickly and efficiently.
          </p>
          <Button className="w-fit">
            <Link href="/docs" className=" flex items-center gap-4">
              Get Started <ArrowRight />
            </Link>
          </Button>
        </section>
        <ShineBorder className="flex flex-col bg-stone-50 dark:bg-stone-900/40 h-fit px-4 py-2 max-md:items-start max-md:justify-start max-lg:hidden">
          <Hero />
          <Button variant={"outline"} className="w-fit self-end">
            Try it out <ArrowRight className="w-4" />
          </Button>
        </ShineBorder>
      </div>
      <div className="space-y-4">
        <p className="text-2xl xl:text-4xl font-semibold text-end">
          Mapping Made <span className="text-primary">Simple</span>
        </p>
        <p className="text-fd-muted-foreground text-end">
          We provide five key functionalities designed to guide you along the
          best routes to success.
        </p>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center w-full">
        <div className="flex flex-wrap gap-6">
          {features.slice(0, 3).map((feature) => (
            <Card
              onClick={() => router.push(feature.link)}
              className="py-6 px-4 bg-zinc-50 dark:bg-stone-900/50 shadow-none border border-zinc-200 dark:border-stone-900 w-80 xl:w-96 h-44 backdrop-blur-xl cursor-pointer hover:border-primary dark:hover:border-amber-500 transition-all duration-200"
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
        <div className="flex flex-wrap xl:mx-auto justify-center w-full gap-6 items-center place-content-center">
          {features.slice(3, 5).map((feature) => (
            <Card
              onClick={() => router.push(feature.link)}
              className="py-6 px-4 bg-zinc-50 dark:bg-stone-900/50 shadow-none border border-zinc-200 dark:border-stone-900 w-96 xl:w-96 h-44 backdrop-blur-xl cursor-pointer hover:border-primary dark:hover:border-amber-500 transition-all duration-200"
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
        <div className="relative flex min-h-[35rem] items-center justify-center w-full flex-col py-24 overflow-hidden rounded-lg bg-background gap-2">
          <p className="text-4xl font-semibold">
            Get Started With Your{" "}
            <span className="text-primary">Favourite Frameworks</span>
          </p>
          <p className="text-fd-muted-foreground">
            We provide SDKs with currently with 2 technologies. We&apos;re doing
            our best to add more.
          </p>
          <div className="flex gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Card className="bg-zinc-50 px-6 py-3 shadow-none">
                    <Image src={Flutter} alt="flutter" />
                  </Card>
                </TooltipTrigger>
                <TooltipContent>Flutter SDK</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Card className="bg-zinc-50 px-6 py-3 shadow-none">
                    <Image src={Node} alt="node" />
                  </Card>
                </TooltipTrigger>
                <TooltipContent>NodeJS SDK</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p>Want to contribute? <span className="underline"><Link href={"/"}>Join The Gebeta Open Source Community</Link></span></p>
          <Ripple />
        </div>
      </div>
    </main>
  );
}
