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
            <h3 id="county-name">{countyName}</h3>
            <div id='card-options'>
                <p id='lived'>Lived here</p>
                <p id='stayed'>Stayed here</p>
                <p id='visited'>Visited here</p>
                <p id='stopped'>Stopped here</p>
                <p id='passed'>Passed here</p>
                <p id='never-been'>Never been here</p>
            </div>
        </div>
    )
}

export default MapUK;