"use client"
import React, {useContext} from "react";
import {MapContainer, Marker, Polyline, TileLayer, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {PlayGroundContext} from "poviders/Playground"

const redIcon = new L.Icon({
    iconUrl: "/red.png",
    iconSize: [25, 25],
})

const greenIcon = new L.Icon({
    iconUrl: "green.png",
    iconSize: [25, 25],
})

const blackIcon = new L.Icon({
    iconUrl: "black.png",
    iconSize: [25, 25],
})

const Map = ({selectedButton}) => {
    const playContext = useContext(PlayGroundContext); // Access the AuthContext
    const {waypoint , origin , destination , setOriginCoordinates , setDestinationCoordinates , setWayPointsCoordinates, coordinate} = playContext
    const position = [9.035961873355374,38.75238418579102]; // Initial map position
    const full_path = [

        [
            9.0289877,
            38.7884871
        ],
        [
            9.0287227,
            38.7889391
        ],
        [
            9.0285817,
            38.7891941
        ],
        [
            9.0283392,
            38.7896191
        ],
        [
            9.0290683,
            38.7883272
        ],

        [
            9.0287223,
            38.7880912
        ],
        [
            9.0281888,
            38.7877698
        ],

        [
            9.027759,
            38.788861
        ],

        [
            9.0270686,
            38.7903348
        ],

        [
            9.0269756,
            38.79009679999999
        ],
        [
            9.0268886,
            38.78976479999999
        ],
        [
            9.0267649,
            38.789281
        ]
    ]

    // the

    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function MyComponent() {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                // setMarkers([]);
                if(selectedButton == "start")
                    setOriginCoordinates({ lat, lng });
                if(selectedButton == "destination")
                    setDestinationCoordinates({ lat, lng });
                if(selectedButton == "waypoint"){

                    setWayPointsCoordinates({ lat, lng })
                }


            },
        });

        return null;
    }

    console.log(coordinate)
    return (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} className='z-1-important' >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* origin */}
            {origin.lat && origin.lng && (
                <Marker position={origin} icon={greenIcon} />
            )}
            {/* destionation */}
            {destination.lat && destination.lng && (
                <Marker position={destination} icon={redIcon} />
            )}

            {/* waypoint */}
            {waypoint.map((marker, index) => (
                <Marker key={index} position={marker} icon={blackIcon} />
            ))}

            {
                coordinate.type == "direction" || coordinate.type == "tss" ? <Polyline positions={coordinate.coords} color="red" /> : ""
            }

            {
                coordinate.type == "onm"  ? coordinate.coords.map((pos)=> {return <Polyline positions={pos} color={getRandomColor()} />}) : ""
            }

            <Polyline positions={full_path} color={getRandomColor()} />

            {/*<LogoControl />*/}
            <MyComponent/>
        </MapContainer>
    );
};


export default Map