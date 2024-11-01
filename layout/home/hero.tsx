"use client";
import clsx from "clsx";
import {LayoutGroup, motion} from "framer-motion";
import {useTheme} from "next-themes";
import {Highlight, themes} from "prism-react-renderer";
import {useState} from "react";

const tabs = [
  {
    name: "directions.ts",
    code: `import { direction } from 'gebetamap';
    let start = {lat : 9.4343 , lon : 38.,434534}
    let stop = {lat :9.2334 , lon : 38.53432}
    const apiKey = ""
    let data = await direction(start , stop , apiKey) `,
  },
  {
    name: "tss.ts",
    code: `import { tss } from 'gebetamap';

  const  apiKey = "";
  let points = [
    {lat: 9.021739361296081, lng: 38.80397726479262},
    {lat: 9.02153803517439, lng: 38.7967248502125},
    {lat: 9.022671817658015, lng: 38.800082846904175},
    {lat: 9.023773808433624, lng: 38.7980015512}]
    const ts = await tss(points , apiKey)

 `,
  },
  {
    name: "oneToMany.ts",
    code: `import { oneToMany } from 'gebetamap';
   let start = {lat : 9.4343 , lon : 38.,434534}
   const apiKey = ""
   let points = [
    {lat: 9.021739361296081, lng: 38.80397726479262},
    {lat: 9.02153803517439, lng: 38.7967248502125},
    {lat: 9.022671817658015, lng: 38.800082846904175},
    {lat: 9.023773808433624, lng: 38.7980015512}]
    const onm = await oneToMany  (start, points, apiKey)
 `,
  },
  {
    name: "geocoding.ts",
    code: `    import { geocoding } from 'gebetamap';
    String name = "kotebe 02";
    String apiKey = "";
    const geo = await geocoding(name, apiKey)
 `,
  },
];

function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  );
}

export default function Hero() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("directions.ts");
  const code = tabs.find((tab) => tab.name === activeTab)?.code ?? "";
  return (
    <div className="relative">
      <div className="relative">
      <div className="absolute inset-0 rounded-none bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-5 blur-lg" />
      <div className="absolute inset-0 rounded-none bg-gradient-to-tr from-stone-300 via-stone-300/70 to-blue-300 opacity-5" />
        <LayoutGroup>
          <motion.div
            layoutId="hero"
            className="relative rounded-sm bg-gradient-to-tr from-stone-50 to-stone-100 dark:from-stone-950/70 dark:to-stone-950/90  ring-1 ring-white/10 backdrop-blur-lg"
          >
            <div className="pl-4 pt-4">
              <div className="mt-4 flex space-x-2 text-xs gap-4">
                {tabs.map((tab) => (
                  <motion.div
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={clsx(
                      "flex h-6 rounded-full cursor-pointer",
                      activeTab === tab.name
                        ? "bg-gradient-to-r from-stone-800/90 via-stone-900 to-orange-900/20 p-px font-medium text-primary"
                        : "text-slate-500"
                    )}
                  >
                    <div
                      className={clsx(
                        "flex items-center rounded-full px-4 py-2",
                        tab.name === activeTab && "border border-primary"
                      )}
                    >
                      {tab.name}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-start px-1 text-sm gap-2 my-4">
                <div
                  aria-hidden="true"
                  className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                >
                  {Array.from({
                    length: code.split("\n").length,
                  }).map((_, index) => (
                    <div key={index}>
                      {(index + 1).toString().padStart(2, "0")}
                      <br />
                    </div>
                  ))}
                </div>
                <Highlight
                  key={theme.resolvedTheme}
                  code={code}
                  language={"tsx"}
                  theme={{
                    ...(theme.resolvedTheme === "light"
                      ? themes.nightOwlLight
                      : themes.duotoneDark),

                    plain: {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                  }) => (
                    <pre
                      className={clsx(className, "flex overflow-x-auto pb-6")}
                      style={style}
                    >
                      <code className="px-4">
                        {tokens.map((line, lineIndex) => (
                          <div key={lineIndex} {...getLineProps({ line })}>
                            {line.map((token, tokenIndex) => (
                              <span
                                key={tokenIndex}
                                {...getTokenProps({ token })}
                              />
                            ))}
                          </div>
                        ))}
                      </code>
                    </pre>
                  )}
                </Highlight>
              </div>
            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
