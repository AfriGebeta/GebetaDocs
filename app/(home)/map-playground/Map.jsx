"use client"
import React, {memo, useCallback, useContext, useEffect, useRef} from "react";
import {GebetaMap, MapStyles} from '@gebeta/tiles';
import {PlayGroundContext} from "@/providers/Playground";

const Map = memo(({selectedButton}) => {
    const mapRef = useRef(null);
    const selectedButtonRef = useRef(selectedButton);
    const playContext = useContext(PlayGroundContext);
    const {
        waypoint,
        origin,
        destination,
        setOriginCoordinates,
        setDestinationCoordinates,
        setWayPointsCoordinates,
        coordinate
    } = playContext;

    useEffect(() => {
        selectedButtonRef.current = selectedButton;
    }, [selectedButton]);


    useEffect(() => {
        console.log("origin", origin)
    }, [origin])

    useEffect(() => {
        console.log("waypoints", waypoint)
    }, [waypoint])

    useEffect(() => {
        console.log("destination", destination)
    }, [destination])


    const position = [9.035961873355374, 38.75238418579102];

    const handleMapClick = useCallback((e) => {
        e?.preventDefault();
        e.originalEvent.cancelBubble = true;
        console.log(e)

        if (!e.lngLat) return;

        const coordinates = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng
        };

        console.log("Clicked coordinates:", coordinates);

        if (selectedButtonRef.current === "start") {
            setOriginCoordinates(coordinates);
        } else if (selectedButtonRef.current === "destination") {
            setDestinationCoordinates(coordinates);
        } else if (selectedButtonRef.current === "waypoint") {
            setWayPointsCoordinates(coordinates);
        }
    }, [setOriginCoordinates, setDestinationCoordinates, setWayPointsCoordinates]);

    const getRandomColor = () => {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getAllMarkers = useCallback(() => {
        const markers = [];

        if (origin && origin.lat && origin.lng) {
            markers.push({
                id: 'origin',
                lngLat: [origin.lng, origin.lat],
                imageUrl: 'green.png',
                imageSize: {width: 25, height: 25},
                markerOptions: {anchor: 'bottom'},
            });
        }

        if (destination && destination.lat && destination.lng) {
            markers.push({
                id: 'destination',
                lngLat: [destination.lng, destination.lat],
                imageUrl: 'red.png',
                imageSize: {width: 25, height: 25},
                markerOptions: {anchor: 'bottom'},
            });
        }

        if (Array.isArray(waypoint)) {
            waypoint.forEach((point, index) => {
                if (point && point.lat && point.lng) {
                    markers.push({
                        id: `waypoint-${index}`,
                        lngLat: [point.lng, point.lat],
                        imageUrl: 'black.png',
                        imageSize: {width: 25, height: 25},
                        markerOptions: {anchor: 'bottom'},
                    });
                }
            });
        }

        return markers;
    }, [origin, destination, waypoint]);

    const getPolylines = useCallback(() => {
        const polylines = [];

        console.log("polyline", polylines)
        if (coordinate) {
            if ((coordinate.type === "direction" || coordinate.type === "tss") && coordinate.coords) {
                polylines.push({
                    id: 'route',
                    coordinates: coordinate.coords,
                    color: 'red',
                    width: 3,
                    opacity: 0.8
                });
            } else if (coordinate.type === "onm" && coordinate.coords) {
                coordinate.coords.forEach((path, index) => {
                    polylines.push({
                        id: `onm-${index}`,
                        coordinates: path,
                        color: getRandomColor(),
                        width: 3,
                        opacity: 0.8
                    });
                });
            }
        }

        return polylines;
    }, [coordinate]);

    return (
        <div className="h-full overflow-hidden">
            <GebetaMap
                style={MapStyles.MODERN}
                apiKey={process.env.NEXT_PUBLIC_GEBETA_MAP_API_KEY}
                center={[position[1], position[0]]}
                zoom={13}
                width="100%"
                height="100%"
                markers={getAllMarkers()}
                polylines={getPolylines()}
                onClick={handleMapClick}
                className="-z-[1000]"
                mapRef={mapRef}
            />
        </div>
    );
});

export default Map;