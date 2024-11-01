"use client"
import React, {useState} from "react"
import Map from "./Map";
import SideBarForm from "./SideBarForm";
import {returnPlaygroundObject} from "data/playground"
import {useSelector} from "react-redux"

const MapView = () => {



    const [selectedButton, setSelectedButton] = useState("");
    const { playground } = useSelector((state) => state)


    const setSelectedButtonFunction = (text) => {
        if(text == selectedButton)
            setSelectedButton("")
        else
            setSelectedButton(text)

    }





    return (
        <main className="flex flex-col lg:flex-row gap-[40px] min-h-screen overflow-hidden">
            <div className="w-full lg:w-1/4 overflow-y-auto">
                <SideBarForm
                    setSelectedButtonFunction={setSelectedButtonFunction}
                    selectedButton={selectedButton}
                    object={returnPlaygroundObject(playground.current)}
                />
            </div>

            <div className="w-full lg:w-3/4 bg-red-500 h-screen mx-[2%] md:mx-[0%]">
                <Map
                    selectedButton = {selectedButton}
                />
            </div>
        </main>

    )
}

export default MapView