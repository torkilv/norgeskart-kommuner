import React, {useState} from 'react';
import {ReactComponent as Map} from '../assets/MapChart_Map.svg';

function MapUK() {
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [cardPosition, setCardPosition] = useState({x: 0, y: 0});

    const countyClick = (e) => {
        const target = e.target;
        if(target.tagName === "path" && target.hasAttribute("name")) {
            const countyName = target.getAttribute("name");
            const {clientX: x, clientY: y} = e;
            setSelectedCounty(countyName);
            setCardPosition({x, y});
        } else {
            setSelectedCounty(null);
        }
    }

    return (
        <div id="MapUK">
            {selectedCounty && <CountyCard countyName={selectedCounty} position={cardPosition}/>}
            <div id="map-container">
                <Map id="map" onClick={countyClick}/>
            </div>
        </div>
    )
}

function CountyCard({countyName, position}) {
    const {x, y} = position;
    return (
        <div id="county-card" onClick={(e) => e.stopPropagation()} style={{
            left: `${x}px`,
            top: `${y}px`,
        }}>
            <h2>{countyName}</h2>
        </div>
    )
}

export default MapUK;