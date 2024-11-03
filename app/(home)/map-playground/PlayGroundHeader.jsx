"use client"
import React, {useState} from "react";
import GeocodingDropdown from "./GeocodingDropdown";
import {useDispatch, useSelector} from "react-redux";
import {changeToken} from "@/redux/reducers/tokenSlice"

const PlayGroundHeader = () => {

    const [search , setSearch] = useState("")
    const { token } = useSelector((state) => state)

    const dispatch = useDispatch()
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
                    <div className="flex text-gray-900">
                        <input
                            type="text"
                            placeholder="Enter Your API Token"
                            id="username"
                            onChange={(e) => {setSearch(e.target.value)}}
                            className="w-full p-2.5 text-3 font-medium bg-zinc-100 text-zinc-800 outline-none border border-grey-500 rounded-[4px] mr-[8px] caret-[#FFA500] focus:caret-[#FFA500]"
                        />

                        <button
                            className="px-8 py-2.5 text-white text-3 font-semibold border-r rounded-[4px] bg-[#FFA500] hover:bg-[#FFA500]/80"
                            onClick={() => { dispatch(changeToken(search)) }}
                        >
                            Add
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PlayGroundHeader