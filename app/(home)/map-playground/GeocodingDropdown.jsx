"use client"
import React, {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {changeTopicPlayGround} from "@/redux/reducers/playgroundSlice"
import {PlayGroundContext} from "@/poviders/Playground"


function GeocodingDropdown( ) {
    const [isOpen, setIsOpen] = useState(false);
    const { playground } = useSelector((state) => state)
    const toggleOpen = () => setIsOpen(!isOpen);
    const dispatch = useDispatch()
    const playContext = useContext(PlayGroundContext);
    // Function to close the dropdown menu
    const closeDropdown = () => {
        setIsOpen(false);
    };


    // Ref to the dropdown menu
    const dropdownRef = useRef(null);
      // Event listener for clicks outside the dropdown
      useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        };

        // Add event listener on component mount
        document.addEventListener("mousedown", handleClickOutside);
        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="inline-flex border rounded-md ">
            <button
                onClick={toggleOpen}
                className="px-6 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md flex justify-between items-center space-x-3"
            >
                <p className="mr-[3]">{playground.current}</p>

                 <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                      />
                  </svg>
            </button>
            {isOpen && (
                <div
                ref={dropdownRef}
                onMouseLeave={closeDropdown} className="absolute left-0 z-10 w-56 bg-white text-zinc-800 mt-4 border border-gray-100 rounded-md shadow-lg">
                   <div className="p-2">
                       <a
                            onClick={()=>{
                                dispatch(changeTopicPlayGround("geocoding"))
                                playContext.clearEveryThing();
                            }}
                            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-[#FFA500]/15 cursor-pointer"
                       >
                           Geocoding
                       </a>
                       <a
                           onClick={()=>{
                            dispatch(changeTopicPlayGround("direction"))
                            playContext.clearEveryThing();
                        }}
                           className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-[#FFA500]/15 hover:text-gray-700 cursor-pointer"
                       >
                          Direction
                       </a>
                       <a
                          onClick={()=>{
                            dispatch(changeTopicPlayGround("matrix"))
                            playContext.clearEveryThing();
                        }}
                           className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-[#FFA500]/15 hover:text-gray-700 cursor-pointer"
                       >
                           Matrix
                       </a>
                       <a
                          onClick={()=>{
                            dispatch(changeTopicPlayGround("onm"))
                            playContext.clearEveryThing();
                        }}
                           className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-[#FFA500]/15 hover:text-gray-700 cursor-pointer"
                       >
                           ONM
                       </a>
                       <a
                         onClick={()=>{
                            dispatch(changeTopicPlayGround("tss"))
                            playContext.clearEveryThing();
                        }}
                           className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-[#FFA500]/15 cursor-pointer"
                       >
                           TSS
                       </a>
                   </div>
                </div>
            )}
        </div>
    );
 }

 export default GeocodingDropdown


