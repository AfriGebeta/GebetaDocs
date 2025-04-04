"use client"
import React, {useContext, useEffect, useRef, useState} from "react";
import RequestSample from "./RequestSample";
import {useSelector} from "react-redux";
import ResponseSample from "./Responsesample";
import JsonViewer from "./JsonViewer";
import {getRoute, getRoutes} from "@/redux/api/routeAPI";
import Notify from "./Notify";
import {PlayGroundContext} from "@/providers/Playground";
import {BASE_URL} from "@/services/apiClient";
import {useToast} from "@/providers/ToastProvider";
import maplibregl from "maplibre-gl";

const exampleOptimizedTripJson = JSON.stringify({
    "vehicles": [
        {
            "name": "driver 1",
            "current_location": [9.020929, 38.801699],
            "capacities": {
                "boxes": 3
            }
        },
        {
            "name": "driver 2",
            "current_location": [9.020929, 38.801699],
            "capacities": {
                "boxes": 3
            }
        }
    ],
    "customers": [
        {
            "name": "a",
            "location": [9.022359, 38.799478],
            "demand": 1,
            "requested_from_depot": "work-order-1234"
        },
        {
            "name": "b",
            "location": [9.020431, 38.800401],
            "demand": 1,
            "requested_from_depot": "work-order-1234"
        },
        {
            "name": "c",
            "location": [9.021167, 38.798894],
            "demand": 1,
            "requested_from_depot": "work-order-1234"
        },
        {
            "name": "d",
            "location": [9.023101, 38.804816],
            "demand": 1,
            "requested_from_depot": "work-order-1234"
        },
        {
            "name": "e",
            "location": [9.022455, 38.804864],
            "demand": 1,
            "requested_from_depot": "work-order-1234"
        },
        {
            "name": "f",
            "location": [9.020251, 38.804151],
            "demand": 1,
            "requested_from_depot": "work-order-1234"
        }

    ],

    "depots": [
        {
            "name": "work-order-1234",
            "location": [9.020929, 38.801699]

        }
    ]
}, null, 2);

const SideBarForm = ({
                         setSelectedButtonFunction,
                         selectedButton,
                         object,
                         setInstructions,
                         setActiveInstruction,
                         setShowInstructions,
                         showInstructions,
    mapRef
                     }) => {
    const [selectedGeocoding, setSelectedGeocoding] = useState("forward");
    const [startWayPoint, setStartWayPoint] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [apiResponse, setApiResponse] = useState({});
    const [notify, setNotify] = useState({visible: false});
    const [coordinate, setCoordinate] = useState({latitude: null, longitude: null});
    const [waypointInputs, setWaypointInputs] = useState([""]);

    const {addToast} = useToast()

    const {
        waypoints,
        origin,
        destination,
        setOriginCoordinates,
        setDestinationCoordinates,
        setWaypointsCoordinates,
        updateWaypoint,
        removeWaypoint,
        setCoordinateFunction,
        clearWaypoints,
    } = useContext(PlayGroundContext);

    const [manualCoords, setManualCoords] = useState({
        origin: {lat: origin?.lat || "", lng: origin?.lng || ""},
        destination: {lat: destination?.lat || "", lng: destination?.lng || ""}
    });

    const [onmOrigin, setOnmOrigin] = useState({
        lat: origin?.lat || "",
        lng: origin?.lng || ""
    });

    const {token} = useSelector((state) => state);
    const optimizedTripJson = useRef(null);

    const addWaypointInput = () => {
        if (waypointInputs.length < 10) {
            setWaypointInputs([...waypointInputs, ""]);
        }
    };

    const removeWaypointInput = (index) => {
        if (waypointInputs.length > 1) {
            const newInputs = [...waypointInputs];
            newInputs.splice(index, 1);
            setWaypointInputs(newInputs);
            removeWaypoint(index);
        }
    };

    const handleOriginChange = (value) => {
        const [lat, lng] = value.split(',').map(coord => coord.trim());
        setManualCoords(prev => ({
            ...prev,
            origin: {
                lat: lat || "",
                lng: lng || ""
            }
        }));

        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            const coords = {lat: parseFloat(lat), lng: parseFloat(lng)};
            setOriginCoordinates(coords);
        }
    };

    const handleOnmOriginChange = (value) => {
        console.log("bitchcness")
        const [lat, lng] = value.split(',').map(coord => coord.trim());

        setOnmOrigin({
            lat: lat || "",
            lng: lng || ""
        });

        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            const coords = {lat: parseFloat(lat), lng: parseFloat(lng)};
            setOriginCoordinates(coords);
        }
    };

    const handleDestinationChange = (value) => {
        const [lat, lng] = value.split(',').map(coord => coord.trim());
        setManualCoords(prev => ({
            ...prev,
            destination: {
                lat: lat || "",
                lng: lng || ""
            }
        }));

        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            const coords = {lat: parseFloat(lat), lng: parseFloat(lng)};
            setDestinationCoordinates(coords);
        }
    };

    const handleWaypointChange = (index, value) => {
        const newInputs = [...waypointInputs];
        newInputs[index] = value;
        setWaypointInputs(newInputs);

        const [lat, lng] = value.split(',').map(coord => coord.trim());
        if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            const coords = {lat: parseFloat(lat), lng: parseFloat(lng)};
            if (index < waypoints.length) {
                updateWaypoint(index, coords);
            } else {
                setWaypointsCoordinates(coords);
            }
        }
    };

    useEffect(() => {
        if (waypoints.length > 0) {
            const newInputs = waypoints.map(wp =>
                wp.lat && wp.lng ? `${wp.lat},${wp.lng}` : ""
            );
            if (newInputs.length < 10 &&
                (newInputs.length === 0 || newInputs[newInputs.length - 1] !== "")) {
                newInputs.push("");
            }
            setWaypointInputs(newInputs);
        } else {
            setWaypointInputs([""]);
        }
    }, [waypoints]);

    const clearAllWaypoints = () => {
        setWaypointInputs([""]);
        clearWaypoints();
    };

    const setGeocoding = (text) => setSelectedGeocoding(text);

    const setOptionalParameter = (text) => {
        if (text === "instruction") setShowInstructions(!showInstructions);
        if (text === "waypoints") setStartWayPoint(!startWayPoint);
    };

    const waypointsString = waypoints.length > 0
        ? `&${object.type === "direction" ? "waypoints" : "json"}=[${waypoints.map(point => `{${point.lat},${point.lng}}`).join(",")}]`
        : "";

    const urlMap = {
        geocoding: selectedGeocoding === "forward"
            ? `${BASE_URL}/api/v1/route/geocoding?name=${searchText}&apiKey=${token.token}`
            : `${BASE_URL}/api/v1/route/revgeocoding?lat=${coordinate.latitude || ""}&lon=${coordinate.longitude || ""}&apiKey=${token.token}`,

        direction: `${BASE_URL}/api/route/direction/?origin=${
            origin.lat ? `${origin.lat},${origin.lng}` : `${manualCoords.origin.lat},${manualCoords.origin.lng}`
        }&destination=${
            destination.lat ? `${destination.lat},${destination.lng}` : `${manualCoords.destination.lat},${manualCoords.destination.lng}`
        }&apiKey=${token.token}${waypointsString}`,

        tss: `${BASE_URL}/api/route/tss?${waypointsString}&apiKey=${token.token}`,
        onm: `${BASE_URL}/api/route/onm?origin=${
            origin.lat && origin.lng ? `{${origin.lat},${origin.lng}}` : "{}"
        }${waypointsString}&apiKey=${token.token}`,
        matrix: `${BASE_URL}/api/route/matrix?${waypointsString}&apiKey=${token.token}`,
        optimizedTrip: `${BASE_URL}/api/optimized-trip?apiKey=${token.token}`,
    };

    const getPolylineCoordinates = (responseObject) => {
        return responseObject?.map(driverData => {
            const depotCoords = driverData.depot.location;
            const customerCoords = driverData.customers.map(customer => customer.location);
            return [depotCoords, ...customerCoords];
        });
    };

    const setForDrawing = (data) => {
        if (object.type === "direction") {
            setCoordinateFunction({type: "direction", coords: data.data.direction});
        } else if (object.type === "onm") {
            const array = data.data.directions.map(dir => dir.direction);
            setCoordinateFunction({type: "onm", coords: array});
        } else if (object.type === "tss") {
            setCoordinateFunction({type: "tss", coords: data.data.direction});
        } else if (object.type === "matrix") {
            const locations = data?.data?.destinations?.map(dest => [dest.location.lat, dest.location.lng]) || [];
            setCoordinateFunction({type: "matrix", coords: locations});
        } else if (object.type === "optimizedTrip") {
            setCoordinateFunction({
                type: "optimizedTrip",
                data: data
            });
        }
    };

    const shouldContinue = () => {
        if (object.type === "direction") {
            if (manualCoords.origin.lat && manualCoords.origin.lng &&
                manualCoords.destination.lat && manualCoords.destination.lng) {
                return {error: false};
            } else if (!origin.lat || !origin.lng || !destination.lat || !destination.lng) {
                return {error: true, message: "Please set origin and destination"};
            }
        } if (object.type === "onm") {
            if ((!origin.lat || !origin.lng) && (!onmOrigin.lat || !onmOrigin.lng)) {
                return {error: true, message: "Please set origin coordinates"};
            }
            if (waypoints.length === 0 && waypointInputs.every(input => !input.trim())) {
                return {error: true, message: "Please set at least one waypoint"};
            }
        } else if (object.type === "matrix" || object.type === "tss") {
            if (waypoints.length === 0) {
                return {error: true, message: "Please set at least one waypoint"};
            }
        } else if (object.type === "optimizedTrip") {
            if (!optimizedTripJson.current?.value) {
                return {error: true, message: "Please provide trip JSON"};
            }
        } else if (object.type === "geocoding") {
            if (selectedGeocoding === "forward" && !searchText.trim()) {
                return {error: true, message: "Please enter search text"};
            } else if (selectedGeocoding === "reverse" && (!coordinate.latitude || !coordinate.longitude)) {
                return {error: true, message: "Please enter coordinates"};
            }
        }
        return {error: false};
    };

    const calculate = () => {
        const response = shouldContinue();
        if (response.error) {
            addToast('Something failed!', 'error')
            return;
        }

        setInstructions([]);
        setActiveInstruction(null);

        if (object.type === "optimizedTrip") {
            try {
                const jsonData = JSON.parse(optimizedTripJson.current.value);
                getRoutes(urlMap[object.type], jsonData)
                    .then((data) => {
                        if (!data.error) {
                            setApiResponse(data.data);
                            setForDrawing(data.data);
                            addToast('Successful!', 'success')
                        } else {
                            addToast(data.error, 'error');
                        }
                    });
            } catch (e) {
                addToast('Invalid JSON format!', 'error')
            }
        } else {
            getRoute(urlMap[object.type])
                .then((data) => {
                    if (!data.error) {
                        setApiResponse(data.data);
                        setForDrawing(data);

                        console.log("response", data.data?.instruction)
                        if (data.data?.instruction) {
                            setInstructions(data.data.instruction);
                            if (data.data.instruction.length > 0) {
                                setActiveInstruction(0);
                            }
                        }

                        addToast('Successful!', 'success')
                    } else {
                        addToast(data?.error, 'error');
                    }
                });
        }
    };

    const renderButton = (type, request) => {
        switch (type) {
            case "start":
                return (
                    <button
                        className={`
    mx-[2%] md:mx-[0%] w-full p-2.5 rounded-[4px]
    ${selectedButton === "start"
                            ? 'bg-[#FFA500] dark:bg-[#E59400] hover:bg-[#E59400] dark:hover:bg-[#CC8400]'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }
    text-white dark:text-gray-100
    font-medium
    outline-none focus:ring-2 focus:ring-[#FFA500]/50
    transition-colors duration-200
    mt-[1%]
    shadow-sm hover:shadow-md
  `}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedButtonFunction("start");
                        }}
                    >
                        Origin
                    </button>
                );
            case "waypoint":
                return request !== "geocoding" && (
                    <button
                        className={`
    mx-[2%] md:mx-[0%] w-full p-2.5 rounded-[4px]
    ${selectedButton === "waypoint"
                            ? 'bg-[#FFA500] dark:bg-[#E59400] hover:bg-[#E59400] dark:hover:bg-[#CC8400]'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }
    text-white dark:text-gray-100
    font-medium
    outline-none focus:ring-2 focus:ring-[#FFA500]/50
    transition-colors duration-200
    mt-4
    shadow-sm hover:shadow-md
  `}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedButtonFunction("waypoint");
                        }}
                    >
                        Waypoints
                    </button>
                );
            case "destination":
                return (
                    <button
                        className={`
    mx-[2%] md:mx-[0%] w-full p-2.5 rounded-[4px]
    ${selectedButton === "destination"
                            ? 'bg-[#FFA500] dark:bg-[#E59400] hover:bg-[#E59400] dark:hover:bg-[#CC8400]'
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }
    text-white dark:text-gray-100
    font-medium
    outline-none focus:ring-2 focus:ring-[#FFA500]/50
    transition-colors duration-200
    mt-4
    shadow-sm hover:shadow-md
  `}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedButtonFunction("destination");
                        }}
                    >
                        Destination
                    </button>
                );
            default:
                return null;
        }
    };

    const renderCoordinateInputs = () => {
        switch (object.type) {
            case "direction":
                return (
                    <>
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Origin Coordinates
                            </h4>
                            <input
                                placeholder="latitude,longitude (e.g., 9.03596,38.75238)"
                                className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none rounded-[4px] border border-gray-300"
                                value={
                                    (manualCoords.origin.lat !== undefined && manualCoords.origin.lng !== undefined)
                                        ? `${manualCoords.origin.lat},${manualCoords.origin.lng}`
                                        : ''
                                }
                                onChange={(e) => handleOriginChange(e.target.value)}
                            />
                        </div>

                        {/* Destination Input */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Destination Coordinates</h4>
                            <input
                                placeholder="latitude,longitude (e.g., 9.03596,38.75238)"
                                className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none rounded-[4px] border border-gray-300"
                                value={
                                    (manualCoords.destination.lat !== undefined && manualCoords.destination.lng !== undefined)
                                        ? `${manualCoords.destination.lat},${manualCoords.destination.lng}`
                                        : ''
                                }
                                onChange={(e) => handleDestinationChange(e.target.value)}
                            />
                        </div>

                        {renderWaypointInputs()}
                    </>
                );

            case "onm":
                return (
                    <>
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Origin Coordinates</h4>
                            <input
                                placeholder="latitude,longitude (e.g., 9.03596,38.75238)"
                                className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none rounded-[4px] border border-gray-300"
                                value={
                                    (manualCoords.origin.lat !== undefined && manualCoords.origin.lng !== undefined)
                                        ? `${manualCoords.origin.lat},${manualCoords.origin.lng}`
                                        : ''
                                }
                                onChange={(e) => handleOriginChange(e.target.value)}
                            />
                        </div>

                        {renderWaypointInputs()}
                    </>
                );

            case "tss":
            case "matrix":
                return renderWaypointInputs();

            default:
                return null;
        }
    };

    const renderWaypointInputs = () => (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Waypoints</h4>
            </div>

            {waypointInputs.map((input, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <input
                        placeholder={`Waypoint ${index + 1} (lat,lng)`}
                        className="flex-1 p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none rounded-[4px] border border-gray-300"
                        value={input}
                        onChange={(e) => handleWaypointChange(index, e.target.value)}
                    />
                    {waypointInputs.length > 1 && (
                        <button
                            type="button"
                            className="p-2 text-red-500 hover:text-red-700"
                            onClick={() => removeWaypointInput(index)}
                        >
                            ×
                        </button>
                    )}

                </div>
            ))}

            <p className="text-xs text-gray-500">
                {waypoints.length}/10 waypoints added
            </p>

            <div className="flex items-center space-x-2 pt-4">
                {waypointInputs.length < 10 && (
                    <button
                        type="button"
                        className="border-2 border-[#FFA500] rounded-full px-4 py-2 text-xs font-semibold text-[#FFA500] hover:text-[#FFA500]/80"
                        onClick={addWaypointInput}
                    >
                        add a coordinate
                    </button>
                )}
                {waypoints.length > 0 && (
                    <button
                        type="button"
                        className="px-4 py-2 text-xs text-[#FFA500] hover:text-[#FFA500]/80"
                        onClick={clearAllWaypoints}
                    >
                        clear coordinates
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full lg:mr-[5%]">
            <div className="relative w-full">
                {object.type === "geocoding" && React.cloneElement(object.radioInput, {
                    setSelectedButtonFunction,
                    selectedGeocoding,
                    setGeocoding
                })}

                {object.type === "geocoding" ? (
                    selectedGeocoding === "forward" ? (
                        <div className="mt-[4%] flex flex-col mx-[2%] md:mx-[0%]">
                            <label className="text-sm font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                placeholder="bole"
                                className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none rounded-[4px] border border-gray-300"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="mt-4">
                            <label className="text-sm font-medium text-gray-700 mb-1">Coordinates (lat, lng)</label>
                            <input
                                placeholder="Enter latitude,longitude"
                                className="w-full p-2.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none rounded-[4px] border border-gray-300"
                                onChange={(e) => {
                                    const [lat, lng] = e.target.value.split(',').map(coord => coord.trim());
                                    setCoordinate({latitude: lat, longitude: lng});
                                }}
                            />
                        </div>
                    )
                ) : null}

                <Notify value={notify}/>

                {(object.type === "direction" || object.type === "onm") && (
                    <>
                        {renderButton("start", object.type)}
                    </>
                )}

                {object.type === "direction" ? (startWayPoint ? renderButton("waypoint", object.type) : null) : object.type !== "optimizedTrip" ? renderButton("waypoint", object.type) : null}

                {object.type === "direction" && renderButton("destination", object.type)}

                {(object.type === "direction" || object.type === "onm" || object.type === "tss" || object.type === "matrix") && (
                    <>
                        <div className="mt-4 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-black px-2 text-gray-500">or</span>
                            </div>
                        </div>

                        <div className="mt-4 space-y-4">
                            {renderCoordinateInputs()}
                        </div>
                    </>
                )}

                {object.type === "optimizedTrip" && (
                    <div className="mt-4 space-y-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Trip Configuration JSON
                        </label>
                        <span className="block text-xs text-gray-500">(Paste your optimized trip JSON)</span>
                        <textarea
                            ref={optimizedTripJson}
                            name="tripJson"
                            className="w-full p-3 text-sm font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none border border-gray-300"
                            rows={10}
                            placeholder={`Example:\n{\n  "vehicles": [...],\n  "depots": [...],\n  "customers": [...]\n}`}
                            spellCheck="false"
                        />
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Supports full VRP JSON specification</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(exampleOptimizedTripJson);
                                    addToast('Example JSON copied!', 'success');
                                }}
                                className="text-purple-600 hover:text-purple-800 flex items-center whitespace-nowrap"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                </svg>
                                Copy example
                            </button>
                        </div>
                    </div>
                )}

                {object.type === "direction" && (
                    <>
                        <h4 className="mt-6 text-sm font-medium text-gray-700 mb-1">
                            Optional parameters
                        </h4>

                        <div className="flex items-center space-x-2 mt-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={showInstructions}
                                    onChange={() => {
                                        setShowInstructions(!showInstructions);
                                    }}
                                />
                                <div
                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFA500]"></div>
                                <span className="ml-3 text-sm font-medium text-gray-700">Show Instructions</span>
                            </label>
                        </div>

                        {object.optionalParameter.find(p => p.name === "waypoints") && (
                            <div className="flex items-center space-x-2 mt-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={startWayPoint}
                                        onChange={() => setOptionalParameter("waypoints")}
                                    />
                                    <div className="
      w-11 h-6
      bg-gray-300
      peer-focus:outline-none
      rounded-full
      peer
      peer-checked:after:translate-x-full
      peer-checked:after:border-white
      after:content-['']
      after:absolute
      after:top-[2px]
      after:left-[2px]
      after:bg-white
      after:border-gray-300
      after:border
      after:rounded-full
      after:h-5
      after:w-5
      after:transition-all
      peer-checked:bg-[#FFA500]
      dark:peer-checked:bg-[#E59400]
    "></div>
                                    <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
      Waypoints
    </span>
                                </label>
                            </div>
                        )}
                    </>
                )}

                {object.type === "geocoding" && selectedGeocoding !== "reverse" &&
                    <div className="border border-gray-200 rounded-bl-lg rounded-br-lg shadow-sm overflow-hidden">
                        {apiResponse.data?.map((n, i) => (
                            <div
                                key={i}
                                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0"                                onClick={() => {
                                    if (!mapRef.current) return;

                                    const marker = document.createElement('div');
                                    marker.innerHTML = `
            <div class="relative">
                <div class="absolute -top-8 -left-4">
                    <MapPin className="w-8 h-8 text-red-500 filter drop-shadow-lg animate-bounce" />
                </div>
            </div>
        `;

                                    const existingMarkers = document.getElementsByClassName('map-marker');
                                    Array.from(existingMarkers).forEach(marker => marker.remove());

                                    marker.className = 'map-marker';

                                    mapRef.current.flyTo({
                                        center: [n?.longitude, n?.latitude],
                                        zoom: 17,
                                        essential: true,
                                        speed: 2,
                                        curve: 1
                                    });

                                    new maplibregl.Marker(marker)
                                        .setLngLat([n?.longitude, n?.latitude])
                                        .addTo(mapRef.current);
                                }}
                            >
                                <div className="flex items-start">
                                    <div className="mr-3 mt-0.5 text-gray-400 dark:text-gray-300">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>

                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 dark:text-gray-100">{n.name}</div>
                                        {n.address && (
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{n.address}</div>
                                        )}
                                        {n.type && (
                                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{n.type}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}

                <button
                    className={`
    mx-[2%] md:mx-[0%] w-full p-2.5 rounded-[4px]
    bg-[#FFA500] dark:bg-[#E59400]
    hover:bg-[#E59400] dark:hover:bg-[#CC8400]
    text-white dark:text-gray-100
    font-bold
    outline-none focus:ring-2 focus:ring-[#FFA500]/50
    transition-all duration-200
    shadow-md hover:shadow-lg mt-4
  `}
                    onClick={calculate}
                >
                    {object.type === "geocoding" ? "Search" : "Calculate"}
                </button>

                <RequestSample className="mt-[1%]" curl={urlMap[object.type]} js={[]}/>
                <ResponseSample
                    className="mt-[2%]"
                    component={<JsonViewer data={apiResponse} alwaysExpand={true}/>}
                />

                {/*{object.type === "direction" && renderInstructions()}*/}
            </div>
        </div>
    );
};

export default SideBarForm;