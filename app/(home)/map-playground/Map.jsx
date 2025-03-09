"use client"
import React, {memo, useCallback, useContext, useEffect, useRef} from "react";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import {PlayGroundContext} from "@/providers/Playground";
import {mapStyle} from "@/constants/mapStyle";


const Map = memo(({selectedButton}) => {
    const mapRef = useRef(null);
    const selectedButtonRef = useRef(selectedButton);
    const markersRef = useRef([]);
    const polylineLayersRef = useRef([]);
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

    const position = [9.035961873355374, 38.75238418579102];

    const handleMapClick = useCallback((e) => {
        e?.preventDefault();
        if (e.originalEvent) {
            e.originalEvent.cancelBubble = true;
        }

        if (!e.lngLat) return;

        const coordinates = {
            lat: e.lngLat.lat,
            lng: e.lngLat.lng
        };

        console.log("Clicked coordinates:", coordinates);
        console.log("Selected button:", selectedButtonRef.current);

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

    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'map',
            style: "https://raw.githubusercontent.com/AfriGebeta/sprite/refs/heads/main/light_theme.json",
            center: [position[1], position[0]],
            zoom: 13,
            attributionControl: false
        });


        map.addControl(new LogoControl(), 'bottom-left');



        mapRef.current = map;

        map.on('click', handleMapClick);

        map.on('load', () => {
            console.log("Map loaded!");
            updateMarkers();
            updatePolylines();
        });

        return () => {
            map.off('click', handleMapClick);
            map.remove();
        };
    }, []);

    const updateMarkers = useCallback(() => {
        if (!mapRef.current) return;

        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (origin && origin.lat && origin.lng) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = 'url(green.png)';
            el.style.width = '25px';
            el.style.height = '25px';
            el.style.backgroundSize = 'cover';

            const marker = new maplibregl.Marker(el)
                .setLngLat([origin.lng, origin.lat])
                .addTo(mapRef.current);

            markersRef.current.push(marker);
        }

        if (destination && destination.lat && destination.lng) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = 'url(red.png)';
            el.style.width = '25px';
            el.style.height = '25px';
            el.style.backgroundSize = 'cover';

            const marker = new maplibregl.Marker(el)
                .setLngLat([destination.lng, destination.lat])
                .addTo(mapRef.current);

            markersRef.current.push(marker);
        }

        if (Array.isArray(waypoint)) {
            waypoint.forEach((point, index) => {
                if (point && point.lat && point.lng) {
                    const el = document.createElement('div');
                    el.className = 'marker';
                    el.style.backgroundImage = 'url(black.png)';
                    el.style.width = '25px';
                    el.style.height = '25px';
                    el.style.backgroundSize = 'cover';

                    const marker = new maplibregl.Marker(el)
                        .setLngLat([point.lng, point.lat])
                        .addTo(mapRef.current);

                    markersRef.current.push(marker);
                }
            });
        }
    }, [origin, destination, waypoint]);

    const updatePolylines = useCallback(() => {
        if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

        const map = mapRef.current;

        polylineLayersRef.current.forEach(layerId => {
            if (map.getLayer(layerId)) {
                map.removeLayer(layerId);
            }
            if (map.getSource(layerId)) {
                map.removeSource(layerId);
            }
        });
        polylineLayersRef.current = [];

        if (coordinate && coordinate.coords) {
            if (coordinate.type === 'direction' || coordinate.type === 'tss') {
                const lineId = `polyline-${coordinate.type}`;

                let coordinates;
                if (Array.isArray(coordinate.coords[0]) && typeof coordinate.coords[0][0] === 'number') {
                    coordinates = coordinate.coords.map(coord => [coord[1], coord[0]]);
                } else {
                    coordinates = coordinate.coords.map(coord => [coord.lng, coord.lat]);
                }

                map.addSource(lineId, {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': coordinates
                        }
                    }
                });

                map.addLayer({
                    'id': lineId,
                    'type': 'line',
                    'source': lineId,
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': 'red',
                        'line-width': 4
                    }
                });

                polylineLayersRef.current.push(lineId);
            } else if (coordinate.type === 'onm') {
                coordinate.coords.forEach((path, index) => {
                    const lineId = `polyline-onm-${index}`;

                    let coordinates;
                    if (Array.isArray(path[0]) && typeof path[0][0] === 'number') {
                        coordinates = path.map(coord => [coord[1], coord[0]]);
                    } else {
                        coordinates = path.map(coord => [coord.lng, coord.lat]);
                    }

                    map.addSource(lineId, {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': coordinates
                            }
                        }
                    });

                    map.addLayer({
                        'id': lineId,
                        'type': 'line',
                        'source': lineId,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': getRandomColor(),
                            'line-width': 4
                        }
                    });

                    polylineLayersRef.current.push(lineId);
                });
            }
        }
    }, [coordinate]);

    useEffect(() => {
        if (mapRef.current && mapRef.current.isStyleLoaded()) {
            updateMarkers();
        }
    }, [origin, destination, waypoint, updateMarkers]);

    useEffect(() => {
        if (mapRef.current && mapRef.current.isStyleLoaded()) {
            updatePolylines();
        }
    }, [coordinate, updatePolylines]);

    return (
        <div className="h-full overflow-hidden">
            <div id="map" style={{width: '100%', height: '100%'}}/>
        </div>
    );
});

export default Map;

class LogoControl {
    onAdd(map) {
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-logo';

        const logo = document.createElement('img');
        logo.src = "https://github.com/AfriGebeta/GebetaDocs/blob/41ad169bdb6d7ac2757f2c553943c43522f08947/assets/icons/maplogo.png?raw=true";
        logo.alt = "GebetaMaps";
        logo.style.width = '3s0px';
        logo.style.height = 'auto';

        const attribution = document.createElement('div');
        attribution.textContent = 'GebetaMaps';
        attribution.style.fontSize = '10px';

        this._container.appendChild(logo);
        this._container.appendChild(attribution);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
    }
}

