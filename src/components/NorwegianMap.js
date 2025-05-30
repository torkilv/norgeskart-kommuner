import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { municipalities, categories } from '../data/norwegian_municipalities';
import translations from '../data/translations';
import 'leaflet/dist/leaflet.css';
import './NorwegianMap.css';

const NorwegianMap = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [markedMunicipalities, setMarkedMunicipalities] = useState(() => {
    const savedData = localStorage.getItem('markedMunicipalities');
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    const savedData = localStorage.getItem('markedMunicipalities');
    if (savedData) {
      setMarkedMunicipalities(JSON.parse(savedData));
    }
  }, []);

  const getColorByLevel = (level) => {
    switch (level) {
      case 'lived':
        return '#FF7E7E';
      case 'stayed':
        return '#FFB57E';
      case 'visited':
        return '#FFE57E';
      case 'stopped':
        return '#A8FFBE';
      case 'passed':
        return '#88AEFF';
      default:
        return 'white';
    }
  };

  const adjustCardPosition = (x, y) => {
    const cardWidth = 225;
    const cardHeight = 330;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let adjustedX = x;
    let adjustedY = y;

    if (x + cardWidth > viewportWidth) {
      adjustedX = viewportWidth - cardWidth - 10;
    }
    if (y + cardHeight > viewportHeight) {
      adjustedY = viewportHeight - cardHeight;
    }

    setCardPosition({ x: adjustedX, y: adjustedY });
  };

  const handleMunicipalityHover = (e) => {
    const layer = e.target;
    const municipalityCode = layer.feature.properties.kommunenummer;
    const municipality = municipalities[municipalityCode];
    
    if (!municipality) {
      console.warn(`Municipality with code ${municipalityCode} not found`);
      return;
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip radius tooltip';
    tooltip.textContent = municipality.name;
    document.body.appendChild(tooltip);

    const updateTooltipPosition = (event) => {
      const { clientX: x, clientY: y } = event;
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x + 10;
      let adjustedY = y + 10;

      if (adjustedX + tooltipWidth > viewportWidth) {
        adjustedX = x - tooltipWidth - 10;
      }
      if (adjustedY + tooltipHeight > viewportHeight) {
        adjustedY = y - tooltipHeight - 10;
      }

      tooltip.style.left = `${adjustedX}px`;
      tooltip.style.top = `${adjustedY}px`;
    };

    updateTooltipPosition(e.originalEvent);

    layer.on('mousemove', updateTooltipPosition);
    layer.once('mouseout', () => {
      if (tooltip.parentNode) {
        document.body.removeChild(tooltip);
      }
      layer.off('mousemove', updateTooltipPosition);
    });
  };

  const handleMunicipalityClick = (e) => {
    const layer = e.target;
    const municipalityCode = layer.feature.properties.kommunenummer;
    const { clientX: x, clientY: y } = e.originalEvent;
    setSelectedMunicipality(municipalityCode);
    adjustCardPosition(x, y);
  };

  const levelClick = (level) => {
    if (selectedMunicipality) {
      const updatedMarked = { ...markedMunicipalities };
      if (updatedMarked[selectedMunicipality] === level) {
        delete updatedMarked[selectedMunicipality];
      } else {
        updatedMarked[selectedMunicipality] = level;
      }
      setMarkedMunicipalities(updatedMarked);
      localStorage.setItem('markedMunicipalities', JSON.stringify(updatedMarked));
      setSelectedMunicipality(null);
    }
  };

  const clearMap = () => {
    setMarkedMunicipalities({});
    localStorage.removeItem('markedMunicipalities');
  };

  const downloadMapData = () => {
    const dataStr = JSON.stringify(markedMunicipalities);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'marked_municipalities.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="norwegian-map-container">
      <div className="map-controls">
        <h2>{translations.no.title}</h2>
        <div className="map-actions">
          <button onClick={clearMap}>{translations.no.clear}</button>
          <button onClick={downloadMapData}>{translations.no.download}</button>
        </div>
      </div>
      <div className="map-container">
        <MapContainer 
          center={[60.472024, 8.468946]} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer 
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <GeoJSON
            data={Object.entries(municipalities).map(([code, m]) => ({
              type: 'Feature',
              properties: {
                kommunenummer: code,
                name: m.name,
                ...m
              },
              geometry: m.geometry
            }))}
            style={(feature) => ({
              fillColor: markedMunicipalities[feature.properties.kommunenummer] 
                ? getColorByLevel(markedMunicipalities[feature.properties.kommunenummer])
                : 'white',
              fillOpacity: 0.7,
              color: 'black',
              weight: 1
            })}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: handleMunicipalityClick,
                mouseover: handleMunicipalityHover
              });
            }}
          />
        </MapContainer>
      </div>
      {selectedMunicipality && (
        <MunicipalityCard
          municipalityName={municipalities[selectedMunicipality].name}
          position={cardPosition}
          levelClick={levelClick}
          currentLevel={markedMunicipalities[selectedMunicipality]}
          translations={translations.no}
          getColorByLevel={getColorByLevel}
        />
      )}
      <div className="legend">
        <h3>{translations.no.legend}</h3>
        {Object.entries(categories).map(([key, value]) => (
          <div key={key} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: getColorByLevel(key) }}
            />
            <span className="legend-label">{value.no}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

function MunicipalityCard({ municipalityName, position, levelClick, currentLevel, translations, getColorByLevel }) {
  const { x, y } = position;
  return (
    <div
      className="municipality-card radius"
      onClick={(e) => e.stopPropagation()}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <p id="municipality-name">{municipalityName}</p>
      <div id="card-options">
        {Object.entries(categories).map(([key, value]) => (
          <p
            key={key}
            id={key}
            onClick={() => levelClick(key)}
            style={{
              backgroundColor: currentLevel === key ? getColorByLevel(key) : 'white',
              border: '2.8px solid black',
              margin: '5px 0',
              borderRadius: '7.5px'
            }}
          >
            {value.no}
          </p>
        ))}
      </div>
    </div>
  );
}

export default NorwegianMap; 