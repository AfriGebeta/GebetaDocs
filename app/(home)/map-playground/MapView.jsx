"use client"
import React, {useEffect, useRef, useState} from "react"
import Map from "./Map";
import SideBarForm from "./SideBarForm";
import {returnPlaygroundObject} from "data/playground"
import {useSelector} from "react-redux"

const MapView = () => {
    const mapRef = useRef(null);

    const [showInstructions, setShowInstructions] = useState(false)
    const [instructions, setInstructions] = useState([]);
    const [showAlternatives, setShowAlternatives] = useState(false)
    const [alternatives, setAlternatives] = useState([]);
    const [activeInstruction, setActiveInstruction] = useState(null);
    const [selectedButton, setSelectedButton] = useState("");
    const { playground } = useSelector((state) => state)

    const setSelectedButtonFunction = (text) => {
        if(text == selectedButton)
            setSelectedButton("")
        else
            setSelectedButton(text)

    }


    const t = returnPlaygroundObject(playground.current)
    useEffect(() => {
        if(t.type !== "direction") {
            setInstructions([])
            setShowInstructions(false)
        }
    }, [playground.current]);


    return (
        <main className="flex flex-col lg:flex-row gap-[40px] min-h-screen overflow-x-hidden">
            <div className="w-full lg:w-1/4 overflow-x-hidden">
                <SideBarForm
                    setSelectedButtonFunction={setSelectedButtonFunction}
                    selectedButton={selectedButton}
                    object={returnPlaygroundObject(playground.current)}
                    setInstructions={setInstructions}
                    setActiveInstruction={setActiveInstruction}
                    setShowInstructions={setShowInstructions}
                    showInstructions={showInstructions}
                    mapRef={mapRef}
                    showAlternatives={showAlternatives}
                    setShowAlternatives={setShowAlternatives}
                    setAlternatives={setAlternatives}
                />
            </div>

            <div className="w-full lg:w-3/4 h-screen mx-[2%] md:mx-[0%]">
                <Map
                    selectedButton = {selectedButton}
                    instructions={instructions}
                    activeInstruction={activeInstruction}
                    setActiveInstruction={setActiveInstruction}
                    setShowInstructions={setShowInstructions}
                    showInstructions={showInstructions}
                    mapRef={mapRef}
                    showAlternatives={showAlternatives}
                    setShowAlternatives={setShowAlternatives}
                    alternatives={alternatives}
                />
            </div>
        </main>

    )
}

export default MapView