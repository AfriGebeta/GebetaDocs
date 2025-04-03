"use client"
import React, {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {changeTopicPlayGround} from "@/redux/reducers/playgroundSlice"
import {PlayGroundContext} from "@/providers/Playground"

function GeocodingDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { playground } = useSelector((state) => state)
    const toggleOpen = () => setIsOpen(!isOpen);
    const dispatch = useDispatch()
    const playContext = useContext(PlayGroundContext);
    const {clearEverything} = playContext

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { name: "Geocoding", value: "geocoding" },
        { name: "Direction", value: "direction" },
        { name: "Matrix", value: "matrix" },
        { name: "ONM", value: "onm" },
        { name: "TSS", value: "tss" },
        { name: "Tiles", value: "tiles", href: "https://playground.tiles.gebeta.app/" },
        { name: "Optimized Trip", value: "optimizedTrip" }
    ];

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA500]/50 transition-all duration-150"
            >
                <span className="mr-2 capitalize">{playground.current}</span>
                <svg
                    className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 z-20 w-56 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-100">
                    <div className="py-1">
                        {menuItems.map((item) => (
                            <div
                                key={item.value}
                                onClick={() => {
                                    if (!item.href) {
                                        dispatch(changeTopicPlayGround(item.value));
                                        clearEverything();
                                    }
                                    setIsOpen(false);
                                }}
                                className={`block px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                                    playground.current === item.value
                                        ? 'bg-[#FFA500]/10 text-gray-900 font-medium'
                                        : 'text-gray-700 hover:bg-[#FFA500]/10 hover:text-gray-900'
                                }`}
                            >
                                {item.href ? (
                                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block w-full">
                                        {item.name}
                                    </a>
                                ) : (
                                    item.name
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default GeocodingDropdown;