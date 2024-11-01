"use client"
import {useMap} from 'react-leaflet';
import {useEffect} from 'react';
import L from 'leaflet'

import logoImage from "assets/icons/maplogo.png"

function LogoControl() {
    const map = useMap();

    useEffect(() => {
        const LogoControl = L?.Control.extend({
            onAdd: function (map) {
                const img = L.DomUtil.create('img');
                img.src = logoImage;
                img.style.width = '50px';
                img.style.background = 'white';
                img.style.padding = '5px';
                img.style.background = 'transparent'
                return img;
            },
            onRemove: function (map) {
                // Nothing to do here
            }
        });

        const logoControl = new LogoControl({position: 'bottomleft'});
        logoControl.addTo(map);

        return () => {
            logoControl.remove();
        };
    }, [map]);

    return null;
}

export default LogoControl