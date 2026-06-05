"use client"
import React, {useState} from "react";
import GeocodingDropdown from "./GeocodingDropdown";
import {useDispatch, useSelector} from "react-redux";
import {changeToken} from "@/redux/reducers/tokenSlice"
import {Button} from "@/components/ui/button";
import {Check, Copy} from "lucide-react";
import {useToast} from "@/providers/ToastProvider";

const PlayGroundHeader = () => {
    const dispatch = useDispatch()
    const {addToast} = useToast()

    const [apiToken, setApiToken] = useState("")
    const [copyState, setCopyState] = useState(false)

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyState(true)

            setTimeout(() => {
                setCopyState(false)
            }, 2000)
        })
        console.log("copying")
        addToast('Copied to clipboard!', 'info')
    }
    return (
        <div className="w-full pt-4 px-8 md:px-10">
            <div className="">
                <div className="flex space-x-4">
                    <h3 className="text-2xl font-bold relative mx-[2%] md:mx-[0%]">
                        Map Playground
                    </h3>
                    <GeocodingDropdown/>
                </div>
                <div className="mt-4">
                    <div className="w-full flex">
                        <div className="w-full relative">
                            <input
                                type="text"
                                placeholder="Your API Token"
                                onChange={(e) => {
                                    setApiToken(e.target.value)
                                }}
                                className="w-full p-3 pr-12 text-sm font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none border border-gray-300 dark:border-gray-600 rounded-lg caret-[#FFA500] transition-all duration-200
      "
                            />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleCopy(apiToken)}
                                    className="absolute w-5 border-none h-5 top-3 right-2 z-[9999]"
                                >
                                    {copyState ? (
                                        <Check className="h-3 w-3 text-green-400" />
                                    ) : (
                                        <Copy className="h-3 w-3"/>
                                    )}
                                </Button>
                        </div>

                        <button
                            className="ml-4 px-6 py-3 text-sm whitespace-nowrap font-semibold text-white bg-[#FFA500] hover:bg-[#E59400] dark:bg-[#E59400] dark:hover:bg-[#CC8400] rounded-lg shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFA500]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    "
                            onClick={() => {
                                dispatch(changeToken(apiToken))
                            }}
                        >
                            Add Token
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PlayGroundHeader