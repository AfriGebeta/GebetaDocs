"use client"
import React, {createContext, useState} from 'react';

export const PlayGroundContext = createContext({
    waypoints: [],
    origin: { lat: null, lng: null },
    destination: { lat: null, lng: null },
    coordinate: {type: null, coords: []},
    setOriginCoordinates: (coordinates) => {},
    setDestinationCoordinates: (coordinates) => {},
    setWaypointsCoordinates: (coordinates, index = null) => {}, // Added index parameter
    updateWaypoint: (index, coordinates) => {}, // New function
    removeWaypoint: (index) => {}, // New function
    setCoordinateFunction: (coords) => {},
    clearWaypoints: () => {},
    clearEverything: () => {}
});

export const PlayGroundProvider = ({ children }) => {
    const [waypoints, setWaypoints] = useState([]);
    const [origin, setOrigin] = useState({ lat: null, lng: null });
    const [destination, setDestination] = useState({ lat: null, lng: null });
    const [coordinate, setCoordinate] = useState({type: null, coords: []});

    const setOriginCoordinates = (coordinates) => {
        setOrigin(coordinates);
    };

    const setDestinationCoordinates = (coordinates) => {
        setDestination(coordinates);
    };

    const clearWaypoints = () => {
        setWaypoints([]);
    };

    // Updated to handle both adding and updating waypoints
    const setWaypointsCoordinates = (coordinates, index = null) => {
        if (index !== null) {
            // Update existing waypoint
            setWaypoints(prev => {
                const newWaypoints = [...prev];
                newWaypoints[index] = coordinates;
                return newWaypoints;
            });
        } else {
            // Add new waypoint (max 10)
            if (waypoints.length < 10) {
                setWaypoints(prev => [...prev, coordinates]);
            } else {
                console.log("Maximum of 10 waypoints allowed.");
            }
        }
    };

    // Specific function to update a waypoint by index
    const updateWaypoint = (index, coordinates) => {
        if (index >= 0 && index < waypoints.length) {
            setWaypoints(prev => {
                const newWaypoints = [...prev];
                newWaypoints[index] = coordinates;
                return newWaypoints;
            });
        }
    };

    // Specific function to remove a waypoint by index
    const removeWaypoint = (index) => {
        if (index >= 0 && index < waypoints.length) {
            setWaypoints(prev => {
                const newWaypoints = [...prev];
                newWaypoints.splice(index, 1);
                return newWaypoints;
            });
        }
    };

    const setCoordinateFunction = (coords) => {
        setCoordinate(coords);
    };

    const clearEverything = () => {
        setWaypoints([]);
        setCoordinate({type: null, coords: []});
        setDestination({ lat: null, lng: null });
        setOrigin({ lat: null, lng: null });
    };

    return (
        <PlayGroundContext.Provider value={{
            waypoints,
            origin,
            destination,
            coordinate,
            setOriginCoordinates,
            setDestinationCoordinates,
            setWaypointsCoordinates,
            updateWaypoint,
            removeWaypoint,
            setCoordinateFunction,
            clearWaypoints,
            clearEverything
        }}>
            {children}
        </PlayGroundContext.Provider>
    );
};