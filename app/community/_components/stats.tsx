"use client";
import {ArrowUpRight} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {kFormatter} from "@/lib/utils";

export default function Stats() {
    const npmDownloads = 239_581
    return (
        <div className="relative">
            <div className="md:mx-auto w-full">
                <div className="border border-input rounded-none overflow-hidden border-l-0 border-r-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-input">
                        <div
                            className="flex pt-5 dark:[box-shadow:0_-20px_80px_-20px_#dfbf9f1f_inset] flex-col items-center justify-between">
                            <div className="relative flex flex-col p-3">
                                <div
                                    className="inline-flex dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border rounded-full items-center justify-center p-1 w-[4.0em] h-[4.0em] mx-auto mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="4em"
                                        height="4em"
                                        viewBox="0 0 240 240"
                                        className="my-2"
                                    >
                                        <circle cx="120" cy="120" r="120" fill="currentColor"/>
                                        <path
                                            d="M81.229,128.772l14.237,39.406s1.78,3.687,3.686,3.687,30.255-29.492,30.255-29.492l31.525-60.89L81.737,118.6Z"
                                            className="fill-[#c8daea] dark:fill-white"
                                        />
                                        <path
                                            d="M100.106,138.878l-2.733,29.046s-1.144,8.9,7.754,0,17.415-15.763,17.415-15.763"
                                            fill="#a9c6d8"
                                            className="fill-[#a9c6d8] dark:fill-black"
                                        />
                                        <path
                                            d="M81.486,130.178,52.2,120.636s-3.5-1.42-2.373-4.64c.232-.664.7-1.229,2.1-2.2,6.489-4.523,120.106-45.36,120.106-45.36s3.208-1.081,5.1-.362a2.766,2.766,0,0,1,1.885,2.055,9.357,9.357,0,0,1,.254,2.585c-.009.752-.1,1.449-.169,2.542-.692,11.165-21.4,94.493-21.4,94.493s-1.239,4.876-5.678,5.043A8.13,8.13,0,0,1,146.1,172.5c-8.711-7.493-38.819-27.727-45.472-32.177a1.27,1.27,0,0,1-.546-.9c-.093-.469.417-1.05.417-1.05s52.426-46.6,53.821-51.492c.108-.379-.3-.566-.848-.4-3.482,1.281-63.844,39.4-70.506,43.607A3.21,3.21,0,0,1,81.486,130.178Z"
                                            fill="#fff"
                                            className="fill-[#fff] dark:fill-black"
                                        />
                                    </svg>
                                </div>
                                <span
                                    className="text-xl uppercase tracking-tighter font-bold font-mono bg-gradient-to-b dark:from-stone-200 dark:via-stone-400 dark:to-stone-700 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] from-stone-800 via-stone-600 to-stone-400">
									Telegram
								</span>
                            </div>

                            <div className="flex items-end  w-full gap-2 mt-4 text-gray-400">
                                <Link
                                    className="w-full"
                                    href="https://t.me/gebetamaps_chat"
                                    target="_blank"
                                >
                                    <Button
                                        variant="outline"
                                        className="group duration-500 cursor-pointer text-gray-400 flex items-center gap-2 text-md hover:bg-transparent border-l-input/50 border-r-input/50 md:border-r-0 md:border-l-0 border-t-[1px] border-t-input py-7 w-full hover:text-black dark:hover:text-white"
                                    >
										<span
                                            className="uppercase font-mono group-hover:text-black duration-300 dark:group-hover:text-white">
											Join Our Telegram
										</span>
                                        <ArrowUpRight
                                            className="w-6 h-6 opacity-20 ml-2 group-hover:opacity-300 duration-300 text-black group-hover:duration-700 dark:text-white"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div
                            className="flex pt-5 w-full dark:[box-shadow:0_-20px_80px_-20px_#dfbf9f1f_inset] flex-col items-center justify-between">
                            <div className="relative p-3">
								<span
                                    className="text-[70px] tracking-tighter font-bold font-mono bg-gradient-to-b dark:from-stone-200 dark:via-stone-400 dark:to-stone-700 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] from-stone-800 via-stone-600 to-stone-400">
									{parseInt(kFormatter(npmDownloads) as string)}k+
								</span>
                            </div>
                            <div className="flex -p-8 items-end w-full gap-2 mt-4 text-gray-400">
                                <Link
                                    className="w-full"
                                    href="https://github.com/AfriGebeta"
                                    target="_blank"
                                >
                                    <Button
                                        variant="outline"
                                        className="group duration-500 cursor-pointer text-gray-400 flex items-center gap-2 text-md hover:bg-transparent  border-l-input/50 border-r-input/50 md:border-r-0 md:border-l-0 border-t-[1px] border-t-input py-7 w-full hover:text-black dark:hover:text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1.5em"
                                            height="1.5em"
                                            viewBox="0 0 128 128"
                                        >
                                            <path
                                                fill="#000"
                                                d="M64 2c18.778 0 34 15.222 34 34 0 24-34 90-34 90S30 60 30 36C30 17.222 45.222 2 64 2zm0 52a18 18 0 1 0 0-36 18 18 0 0 0 0 36z"
                                            />
                                            <path
                                                className="fill-black dark:fill-white"
                                                d="M64 12c13.255 0 24 10.745 24 24 0 16-24 72-24 72S40 52 40 36c0-13.255 10.745-24 24-24zm0 40a16 16 0 1 0 0-32 16 16 0 0 0 0 32z"
                                            />
                                        </svg>

                                        <span
                                            className="uppercase font-mono group-hover:text-black duration-300 dark:group-hover:text-white">
											Local Places Collected
										</span>
                                        <ArrowUpRight
                                            className="w-6 h-6 opacity-20 ml-2 group-hover:opacity-300 duration-300 text-black group-hover:duration-700 dark:text-white"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div
                            className="flex pt-5 dark:[box-shadow:0_-20px_80px_-20px_#dfbf9f1f_inset] flex-col items-center justify-between">
                            <div className="relative flex flex-col p-3">
                                <div
                                    className="inline-flex dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset] border rounded-full items-center justify-center p-1 w-[4.0em] h-[4.0em] mx-auto mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="4em"
                                        height="4em"
                                        viewBox="0 0 24 24"
                                        className="my-2"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M10.75 13.04c0-.57-.47-1.04-1.04-1.04s-1.04.47-1.04 1.04a1.04 1.04 0 1 0 2.08 0m3.34 2.37c-.45.45-1.41.61-2.09.61s-1.64-.16-2.09-.61a.26.26 0 0 0-.38 0a.26.26 0 0 0 0 .38c.71.71 2.07.77 2.47.77s1.76-.06 2.47-.77a.26.26 0 0 0 0-.38c-.1-.1-.27-.1-.38 0m.2-3.41c-.57 0-1.04.47-1.04 1.04s.47 1.04 1.04 1.04s1.04-.47 1.04-1.04S14.87 12 14.29 12"
                                        ></path>
                                        <path
                                            fill="currentColor"
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m5.8 11.33c.02.14.03.29.03.44c0 2.24-2.61 4.06-5.83 4.06s-5.83-1.82-5.83-4.06c0-.15.01-.3.03-.44c-.51-.23-.86-.74-.86-1.33a1.455 1.455 0 0 1 2.47-1.05c1.01-.73 2.41-1.19 3.96-1.24l.74-3.49c.01-.07.05-.13.11-.16c.06-.04.13-.05.2-.04l2.42.52a1.04 1.04 0 1 1 .93 1.5c-.56 0-1.01-.44-1.04-.99l-2.17-.46l-.66 3.12c1.53.05 2.9.52 3.9 1.24a1.455 1.455 0 1 1 1.6 2.38"
                                        ></path>
                                    </svg>
                                </div>
                                <span
                                    className="text-xl uppercase tracking-tighter font-bold font-mono bg-gradient-to-b dark:from-stone-200 dark:via-stone-400 dark:to-stone-700 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] from-stone-800 via-stone-600 to-stone-400">
									Reddit
								</span>
                            </div>
                            <div className="flex items-end w-full gap-2 mt-4 text-gray-400">
                                <Link
                                    className="w-full"
                                    href="https://www.reddit.com/r/GebetaMaps"
                                    target="_blank"
                                >
                                    <Button
                                        variant="outline"
                                        className="group duration-500 cursor-pointer text-gray-400 flex items-center gap-2 text-md hover:bg-transparent border-l-input/50 border-r-input/50 md:border-r-0 md:border-l-0  border-t-[1px] border-t-input py-7 w-full hover:text-black dark:hover:text-white"
                                    >
										<span
                                            className="uppercase font-mono group-hover:text-black duration-300 dark:group-hover:text-white">
											Join Subreddit
										</span>
                                        <ArrowUpRight
                                            className="w-6 h-6 opacity-20 ml-2 group-hover:opacity-300 duration-300 text-black group-hover:duration-700 dark:text-white"/>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}