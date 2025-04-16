"use client"
import React, {memo, useCallback, useContext, useEffect, useRef} from "react";
import maplibregl from 'maplibre-gl';

import {PlayGroundContext} from "@/providers/Playground";

const Map = memo(({selectedButton, activeInstruction, setActiveInstruction, instructions, showInstructions,mapRef, alternatives}) => {
    // const mapRef = useRef(null);
    const instructionMarkersRef = useRef([]);
    const animationRef = useRef(null);
    const selectedButtonRef = useRef(selectedButton);
    const markersRef = useRef([]);
    const polylineLayersRef = useRef([]);
    const playContext = useContext(PlayGroundContext);
    const {
        waypoints,
        origin,
        destination,
        setOriginCoordinates,
        setDestinationCoordinates,
        setWaypointsCoordinates,
        coordinate
    } = playContext;

    useEffect(() => {
        selectedButtonRef.current = selectedButton;
    }, [selectedButton]);

    const position = [9.035961873355374, 38.75238418579102];

    const getDriverColor = (index) => {
        const colors = ['#FFA500', '#3F51B5', '#4CAF50', '#9C27B0', '#FF5722', '#607D8B'];
        return colors[index % colors.length];
    };

    const createDriverMarkerIcon = (driverIndex) => {
        const el = document.createElement('div');
        el.className = 'driver-marker';
        const color = getDriverColor(driverIndex);

        el.innerHTML = `
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="18" y="22" fill="white" font-size="12" font-weight="bold" text-anchor="middle">${driverIndex + 1}</text>
    </svg>
  `;
        return el;
    };

    const createCustomerMarkerIcon = (driverIndex, customerIndex) => {
        const el = document.createElement('div');
        el.className = 'customer-marker';
        const color = getDriverColor(driverIndex);

        el.innerHTML = `
    <svg width="30" height="30" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="12" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="15" y="20" fill="white" font-size="10" font-weight="bold" text-anchor="middle">${customerIndex + 1}</text>
    </svg>
  `;
        return el;
    };

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

        if (selectedButtonRef.current === "start") {
            setOriginCoordinates(coordinates);
        } else if (selectedButtonRef.current === "destination") {
            setDestinationCoordinates(coordinates);
        } else if (selectedButtonRef.current === "waypoint") {
            setWaypointsCoordinates(coordinates);
        }
    }, [setOriginCoordinates, setDestinationCoordinates, setWaypointsCoordinates]);

    const getRandomColor = () => {
        const colors = ['#3F51B5', '#009688', '#FF5722', '#607D8B', '#795548', '#9C27B0'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const fitMapToCoordinates = useCallback((coordinates) => {
        if (!mapRef.current || !coordinates || coordinates.length === 0) return;

        try {
            const lngLatCoords = coordinates.map(coord => {
                if (Array.isArray(coord)) {
                    return [coord[1], coord[0]];
                } else {
                    return [coord.lng, coord.lat];
                }
            });

            const bounds = lngLatCoords.reduce((bounds, coord) => {
                return bounds.extend(coord);
            }, new maplibregl.LngLatBounds(lngLatCoords[0], lngLatCoords[0]));

            const padding = {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            };

            mapRef.current.fitBounds(bounds, {
                padding: padding,
                duration: 1000,
                essential: true
            });
        } catch (error) {
            console.error("Error fitting map to coordinates:", error);
        }
    }, []);

    const animatePolyline = useCallback((lineId, coordinates, duration = 2000) => {
        if (!mapRef.current || !coordinates || coordinates.length === 0) return;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        const startTime = performance.now();
        const lineLength = coordinates.length;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentIndex = Math.floor(progress * (lineLength - 1));

            const partialCoords = coordinates.slice(0, currentIndex + 1);

            if (mapRef.current.getSource(lineId)) {
                mapRef.current.getSource(lineId).setData({
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: partialCoords
                    }
                });
            }

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);
    }, []);

    const createMarkerIcon = (type, isActive = false) => {
        const el = document.createElement('div');
        el.className = 'marker';

        let bgColor, borderColor, textColor;

        switch (type) {
            case 'start':
                bgColor = '#4CAF50';
                borderColor = '#388E3C';
                textColor = 'white';
                break;
            case 'destination':
                bgColor = '#F44336';
                borderColor = '#D32F2F';
                textColor = 'white';
                break;
            case 'waypoint':
                bgColor = '#2196F3';
                borderColor = '#1976D2';
                textColor = 'white';
                break;
            case 'instruction':
                bgColor = isActive ? '#FF9800' : '#607D8B';
                borderColor = isActive ? '#F57C00' : '#455A64';
                textColor = 'white';
                break;
            default:
                bgColor = '#9E9E9E';
                borderColor = '#616161';
                textColor = 'white';
        }

        el.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="14" fill="${bgColor}" stroke="${borderColor}" stroke-width="2"/>
                <circle cx="15" cy="15" r="8" fill="${bgColor}" stroke="white" stroke-width="2"/>
            </svg>
        `;

        return el;
    };

    const updateMarkers = useCallback(() => {
        if (!mapRef.current) return;

        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        if (origin && origin.lat && origin.lng) {
            const marker = new maplibregl.Marker({
                element: createMarkerIcon('start')
            })
                .setLngLat([origin.lng, origin.lat])
                .addTo(mapRef.current);

            markersRef.current.push(marker);
        }

        if (destination && destination.lat && destination.lng) {
            const marker = new maplibregl.Marker({
                element: createMarkerIcon('destination')
            })
                .setLngLat([destination.lng, destination.lat])
                .addTo(mapRef.current);

            markersRef.current.push(marker);
        }

        if (Array.isArray(waypoints)) {
            waypoints.forEach((point, index) => {
                if (point && point.lat && point.lng) {
                    const marker = new maplibregl.Marker({
                        element: createMarkerIcon('waypoint')
                    })
                        .setLngLat([point.lng, point.lat])
                        .addTo(mapRef.current);

                    markersRef.current.push(marker);
                }
            });
        }
    }, [origin, destination, waypoints]);

    const addToMap = (map, coordinates, outlineId, lineId, isAlternative=false) => {
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

        map.addSource(outlineId, {
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
            'id': outlineId,
            'type': 'line',
            'source': outlineId,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#ffffff',
                'line-width': 6,
                'line-opacity': 0.7
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
                'line-color': isAlternative ? "#AAB8E4" : '#0056B3',
                'line-width': 8,
                'line-dasharray': [0.0001, 0.0001],
            }
        });

        polylineLayersRef.current.push(lineId, outlineId);

        animatePolyline(lineId, coordinates);
        fitMapToCoordinates(coordinate.coords);
    }

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
                const outlineId = `${lineId}-outline`;

                let coordinates;
                if (Array.isArray(coordinate.coords[0]) && typeof coordinate.coords[0][0] === 'number') {
                    coordinates = coordinate.coords.map(coord => [coord[1], coord[0]]);
                } else {
                    coordinates = coordinate.coords.map(coord => [coord.lng, coord.lat]);
                }

                addToMap(map, coordinates, outlineId, lineId);

                if(alternatives) {
                    alternatives.forEach((item, index) => {
                        let alternative;
                        if (Array.isArray(item.direction[0]) && typeof item.direction[0][0] === 'number') {
                            alternative = item.direction.map(coord => [coord[1], coord[0]]);
                        } else {
                            alternative = item.direction.map(coord => [coord.lng, coord.lat]);
                        }

                        const altLineId = `polyline-alternative-${index}`;
                        const altOutlineId = `${altLineId}-outline`;
                        const altColor = "#4285F4"
                        const isAlternative = true
                        addToMap(map, alternative, altOutlineId, altLineId, isAlternative, altColor);
                    });
                }
            } else if (coordinate.type === 'onm') {
                coordinate.coords.forEach((path, index) => {
                    const lineId = `polyline-onm-${index}`;
                    const outlineId = `${lineId}-outline`;

                    let coordinates;
                    if (Array.isArray(path[0]) && typeof path[0][0] === 'number') {
                        coordinates = path.map(coord => [coord[1], coord[0]]);
                    } else {
                        coordinates = path.map(coord => [coord.lng, coord.lat]);
                    }

                    map.addSource(outlineId, {
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
                        'id': outlineId,
                        'type': 'line',
                        'source': outlineId,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': '#ffffff',
                            'line-width': 6,
                            'line-opacity': 0.7
                        }
                    });

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

                    const color = getRandomColor();

                    map.addLayer({
                        'id': lineId,
                        'type': 'line',
                        'source': lineId,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': color,
                            'line-width': 4,
                            'line-dasharray': [0.0001, 0.0001]
                        }
                    });

                    polylineLayersRef.current.push(lineId, outlineId);
                    animatePolyline(lineId, coordinates);
                });

                const allCoords = coordinate.coords.flat();
                fitMapToCoordinates(allCoords);
            }
            else if (coordinate.type === 'matrix') {
                markersRef.current.forEach(marker => marker.remove());
                markersRef.current = [];

                const points = coordinate.coords.map(point =>
                    Array.isArray(point) ? [point[1], point[0]] : [point.lng, point.lat]
                );

                points.forEach((point, index) => {
                    const marker = new maplibregl.Marker({
                        element: createMarkerIcon('waypoint')
                    })
                        .setLngLat(point)
                        .addTo(mapRef.current);
                    markersRef.current.push(marker);
                });

                for (let i = 0; i < points.length; i++) {
                    for (let j = i + 1; j < points.length; j++) {
                        const lineId = `matrix-line-${i}-${j}`;
                        const coordinates = [points[i], points[j]];

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
                                'line-color': '#3F51B5',
                                'line-width': 2,
                                'line-opacity': 0.6
                            }
                        });

                        polylineLayersRef.current.push(lineId);
                    }
                }

                if (points.length > 0) {
                    const bounds = points.reduce((bounds, coord) => {
                        return bounds.extend(coord);
                    }, new maplibregl.LngLatBounds(points[0], points[0]));

                    mapRef.current.fitBounds(bounds, {
                        padding: 50,
                        duration: 1000
                    });
                }
            }
        }
    }, [coordinate, fitMapToCoordinates, animatePolyline]);

    useEffect(() => {
        if (!mapRef.current || !instructions || instructions.length === 0 || !showInstructions) {
            instructionMarkersRef.current.forEach(marker => marker.remove());
            instructionMarkersRef.current = [];
            return;
        }

        instructionMarkersRef.current.forEach(marker => marker.remove());
        instructionMarkersRef.current = [];

        instructions.forEach((instruction, index) => {
            const el = document.createElement('div');
            el.className = 'instruction-marker';
            el.innerHTML = `
                <div class="relative">
                    <div class="instruction-marker-circle ${activeInstruction === index ? 'active' : ''}">
                        ${index + 1}
                    </div>
                    ${activeInstruction === index ? `
                    <div class="instruction-marker-tooltip">
                        ${instruction.path} (${instruction.distance.toFixed(0)}m)
                    </div>` : ''}
                </div>
            `;

            el.addEventListener('click', () => setActiveInstruction(index));

            const marker = new maplibregl.Marker({
                element: el,
                anchor: 'bottom'
            })
                .setLngLat([instruction.turning_longitude, instruction.turning_latitude])
                .addTo(mapRef.current);

            instructionMarkersRef.current.push(marker);
        });

        return () => {
            instructionMarkersRef.current.forEach(marker => marker.remove());
        };
    }, [instructions, activeInstruction, showInstructions, setActiveInstruction]);

    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'map',
            style: "https://raw.githubusercontent.com/AfriGebeta/sprite/refs/heads/main/light_theme.json",
            center: [position[1], position[0]],
            zoom: 13,
            attributionControl: false,
            transformRequest: (url, resourceType) => {
                if (resourceType === 'Tile') {
                    return {
                        url: url,
                        headers: { 'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_GEBETA_MAP_API_KEY }
                    };
                }
                return { url };
            },
        });

        map.addControl(new maplibregl.NavigationControl(), 'top-right');
        map.addControl(new LogoControl(), 'bottom-left');

        mapRef.current = map;

        map.on('click', handleMapClick);

        map.on('load', () => {
            updateMarkers();
            updatePolylines();
        });

        return () => {
            map.off('click', handleMapClick);
            map.remove();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current || !instructions || activeInstruction === null) return;

        const instruction = instructions[activeInstruction];
        if (!instruction) return;

        mapRef.current.flyTo({
            center: [instruction.turning_longitude, instruction.turning_latitude],
            zoom: 20,
            essential: true,
            speed: 1.5,
            curve: 1
        });

    }, [activeInstruction, instructions]);

    useEffect(() => {
        if (mapRef.current && mapRef.current.isStyleLoaded()) {
            updateMarkers();
        }
    }, [origin, destination, waypoints, updateMarkers]);


    useEffect(() => {
        if (mapRef.current && mapRef.current.isStyleLoaded()) {
            updatePolylines();
        }
    }, [coordinate, updatePolylines]);

    useEffect(() => {
        setActiveInstruction(null);
        instructionMarkersRef.current.forEach(marker => marker.remove());
        instructionMarkersRef.current = [];
    }, [selectedButton, setActiveInstruction, showInstructions]);

    return (
        <div className="h-full overflow-hidden relative">
            <div id="map" style={{width: '100%', height: '100%'}}/>
            {showInstructions && instructions && instructions.length > 0 && (
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden w-64">
                    <div className="max-h-[70vh] overflow-y-auto instruction-scrollbar">
                        <div className="px-4 py-3 border-b border-gray-200 bg-white">
                            <h3 className="text-sm font-medium text-gray-800">Route Directions</h3>
                            <p className="text-xs text-gray-500 mt-1">{instructions.length} steps</p>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {instructions.map((step, index) => (
                                <div
                                    key={index}
                                    className={`px-4 py-3 cursor-pointer transition-colors ${activeInstruction === index ? 'bg-orange-50' : 'hover:bg-gray-50'}`}
                                    onClick={() => setActiveInstruction(index)}
                                >
                                    <div className="flex items-start">
                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${activeInstruction === index ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                                            <span className="text-xs font-medium">{index + 1}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800">{step.path}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{step.distance.toFixed(0)} meters</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
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
        logo.style.width = '30px';
        logo.style.height = 'auto';

        const attribution = document.createElement('div');
        attribution.style.fontSize = '10px';

        this._container.appendChild(logo);
        this._container.appendChild(attribution);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
    }
}