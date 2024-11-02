"use client"
import React from "react";
import MapView from "./MapView";
import PlayGroundHeader from "./PlayGroundHeader"
import {PlayGroundProvider} from "@/poviders/Playground"
import "./index.css"
import StoreProvider from "../../../poviders/StoreProvider";

export default function MapPlayGround(){
    return (
        <StoreProvider>
            <PlayGroundProvider>

                <div className="flex flex-col min-h-screen">

                    <PlayGroundHeader/>
                    <div className="w-[100%] mx-auto pt-4 lg:px-10 md:px-5 ">
                        <MapView />
                    </div>

                </div>
            </PlayGroundProvider>
        </StoreProvider>
    );
};



