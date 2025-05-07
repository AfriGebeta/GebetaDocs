import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import {useTheme} from "next-themes";
import {Fragment, useEffect, useState} from "react";
import useMeasure from "react-use-measure";
import {Highlight, themes} from "prism-react-renderer";
import clsx from "clsx";
import {Check, Copy} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const tabs: { name: string; code: string }[] = [
    {
        name: "geocoding.ts",
        code: `import { geocoding } from 'gebetamap';
let name = "kotebe 02";
let apiKey = "";
const geo = await geocoding(name, apiKey)`,
    },
    {
        name: "directions.ts",
        code: `import { direction } from 'gebetamap';
let start = {lat : 9.4343 , lon : 38.,434534}
let stop = {lat :9.2334 , lon : 38.53432}
const apiKey = ""
let data = await direction(start , stop , apiKey)`,
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
const ts = await tss(points , apiKey)`,
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
const onm = await oneToMany  (start, points, apiKey);`,
    },
];

function TrafficLightsIcon(props: React.ComponentPropsWithoutRef<"svg">) {
    return (
        <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
            <circle cx="5" cy="5" r="4.5"/>
            <circle cx="21" cy="5" r="4.5"/>
            <circle cx="37" cy="5" r="4.5"/>
        </svg>
    );
}

function CodePreview() {
    const [currentTab, setCurrentTab] = useState<string>(
        "geocoding.ts",
    );

    const theme = useTheme();

    const code = tabs.find((tab) => tab.name === currentTab)?.code ?? "";
    const [copyState, setCopyState] = useState(false);
    const [ref, {height}] = useMeasure();
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyState(true);
            setTimeout(() => {
                setCopyState(false);
            }, 2000);
        });
    };

    const [codeTheme, setCodeTheme] = useState(themes.synthwave84);

    useEffect(() => {
        setCodeTheme(
            theme.resolvedTheme === "light" ? themes.oneLight : themes.synthwave84,
        );
    }, [theme.resolvedTheme]);

    return (
        <AnimatePresence initial={false}>
            <MotionConfig transition={{duration: 0.5, type: "spring", bounce: 0}}>
                <motion.div
                    animate={{height: height > 0 ? height : undefined}}
                    className="from-stone-100 to-stone-200 dark:to-black/90 dark:via-stone-950/10 dark:from-stone-950/90 relative overflow-hidden rounded-sm bg-gradient-to-tr ring-1 ring-white/10 backdrop-blur-lg"
                >
                    <div ref={ref}>
                        <div className="absolute -top-px left-0 right-0 h-px"/>
                        <div className="absolute -bottom-px left-11 right-20 h-px"/>
                        <div className="pl-4 pt-4">
                            <TrafficLightsIcon className="stroke-slate-500/30 h-2.5 w-auto"/>

                            <div className="mt-4 flex space-x-2 text-xs">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.name}
                                        onClick={() => setCurrentTab(tab.name)}
                                        className={clsx(
                                            "relative isolate flex h-6 cursor-pointer items-center justify-center rounded-full px-2.5",
                                            currentTab === tab.name
                                                ? "text-stone-300"
                                                : "text-slate-500",
                                        )}
                                    >
                                        {tab.name}
                                        {tab.name === currentTab && (
                                            <motion.div
                                                layoutId="tab-code-preview"
                                                className="bg-stone-800 absolute inset-0 -z-10 rounded-full"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-col items-start px-1 text-sm">
                                <div className="absolute top-2 right-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute w-5 border-none bg-transparent h-5 top-2 right-0"
                                        onClick={() => copyToClipboard(code)}
                                    >
                                        {copyState ? (
                                            <Check className="h-3 w-3"/>
                                        ) : (
                                            <Copy className="h-3 w-3"/>
                                        )}
                                        <span className="sr-only">Copy code</span>
                                    </Button>
                                </div>
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.5}}
                                    key={currentTab}
                                    className="relative flex items-start px-1 text-sm"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="border-slate-300/5 text-slate-600 select-none border-r pr-4 font-mono"
                                    >
                                        {Array.from({
                                            length: code.split("\n").length,
                                        }).map((_, index) => (
                                            <Fragment key={index}>
                                                {(index + 1).toString().padStart(2, "0")}
                                                <br/>
                                            </Fragment>
                                        ))}
                                    </div>
                                    <Highlight
                                        key={theme.resolvedTheme}
                                        code={code}
                                        language={"javascript"}
                                        theme={{
                                            ...codeTheme,
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
                                                        <div key={lineIndex} {...getLineProps({line})}>
                                                            {line.map((token, tokenIndex) => (
                                                                <span
                                                                    key={tokenIndex}
                                                                    {...getTokenProps({token})}
                                                                />
                                                            ))}
                                                        </div>
                                                    ))}
												</code>
											</pre>
                                        )}
                                    </Highlight>
                                </motion.div>
                                <motion.div layout className="self-end">
                                    <Link
                                        href="/api-playground"
                                        target="_blank"
                                        className="shadow-md  border shadow-primary-foreground dark:shadow-none mb-4 ml-auto mr-4 mt-auto flex cursor-pointer items-center gap-2 px-3 py-1 transition-all ease-in-out hover:opacity-70"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2z"
                                            ></path>
                                        </svg>
                                        <p className="text-sm">Try it out</p>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </MotionConfig>
        </AnimatePresence>
    );
}

export default CodePreview