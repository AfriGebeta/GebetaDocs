"use client"
import React, {createContext, useState} from 'react';

export const PlayGroundContext = createContext({
    waypoint: [],
    origin: { lat: null, lng: null },
    destination: { lat: null, lng: null },
    coordinate : {type : null, coords : []},
    setOriginCoordinates: (coordinates) => {},
    setDestinationCoordinates: (coordinates) => {},
    setWayPointsCoordinates: (coordinates) => {},
    setCoordinateFunction: (coords) => {},
    clearEveryThing: () => {}
});

export const PlayGroundProvider = ({ children }) => {



    const [waypoint, setWayPoint] = useState([]);
    const [origin, setOrigin] = useState({ lat: null, lng: null });
    const [destination, setDestination] = useState({ lat: null, lng: null });
    const [coordinate , setCoordinate] = useState({type : null, coords : []})

    const setOriginCoordinates = (coordinates) =>  setOrigin(coordinates);
    const setDestinationCoordinates = (coordinates) =>  setDestination(coordinates);
    const setWayPointsCoordinates = (coordinate) =>   (waypoint.length < 5) ? setWayPoint([...waypoint , coordinate]) : null;
    const setCoordinateFunction = (coords) => {
        setCoordinate(coords)
    }
    const clearEveryThing = () => {
        setWayPoint([])
        setCoordinate({type : null, coords : []})
        setDestination({ lat: null, lng: null });
        setOrigin({ lat: null, lng: null });
    }


    return (
        <PlayGroundContext.Provider value={{ waypoint,origin,destination,coordinate,setOriginCoordinates,setDestinationCoordinates,setWayPointsCoordinates,setCoordinateFunction,clearEveryThing}}>
            {children}
        </PlayGroundContext.Provider>
    );
};
