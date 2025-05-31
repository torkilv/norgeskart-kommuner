import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { municipalities, categories } from '../data/norwegian_municipalities';
import translations from '../data/translations';
import { ReactComponent as GithubIcon } from '../assets/github-mark-white.svg';
import { ReactComponent as InfoIcon } from '../assets/info.svg';
import { ReactComponent as CloseIcon } from '../assets/close-black.svg';
import { ReactComponent as EditIcon } from '../assets/edit.svg';
import 'leaflet/dist/leaflet.css';
import './NorwegianMap.css';

const NorwegianMap = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [hoveredMunicipality, setHoveredMunicipality] = useState(null);
  const [showFootnote, setShowFootnote] = useState(false);
  const [markedMunicipalities, setMarkedMunicipalities] = useState(() => {
    const savedData = localStorage.getItem('markedMunicipalities');
    return savedData ? JSON.parse(savedData) : {};
  });
  const [customCategories, setCustomCategories] = useState(() => {
    const savedCategories = localStorage.getItem('customCategories');
    return savedCategories ? JSON.parse(savedCategories) : {};
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [footnoteOpen, setFootnoteOpen] = useState(false);

  const levelPoints = {
    'lived': 5,
    'stayed': 4,
    'visited': 3,
    'stopped': 2,
    'passed': 1
  };

  const calculateTotalPoints = () => {
    return Object.values(markedMunicipalities).reduce((total, level) => {
      return total + (levelPoints[level] || 0);
    }, 0);
  };

  useEffect(() => {
    const savedData = localStorage.getItem('markedMunicipalities');
    if (savedData) {
      setMarkedMunicipalities(JSON.parse(savedData));
    }
  }, []);

  const handleCategoryEdit = (key) => {
    setEditingCategory(key);
    setEditingName(getCategoryName(key));
    setShowCategoryModal(true);
  };

  const handleCategorySave = () => {
    if (editingCategory && editingName.trim()) {
      const updatedCategories = { ...customCategories, [editingCategory]: editingName.trim() };
      setCustomCategories(updatedCategories);
      localStorage.setItem('customCategories', JSON.stringify(updatedCategories));
      setShowCategoryModal(false);
      setEditingCategory(null);
      setEditingName('');
    }
  };

  const getCategoryName = (key) => {
    return customCategories[key] || categories[key].no;
  };

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
        <div className="level-display">
          {translations.no.totalPoints}: {calculateTotalPoints()}
        </div>
        <div className="map-actions">
          <button onClick={clearMap}>{translations.no.clear}</button>
          <button onClick={downloadMapData}>{translations.no.download}</button>
          <button
            className="button-tooltip"
            onClick={() =>
              window.open(
                "https://github.com/torkilv/norgeskart-kommuner",
                "_blank"
              )
            }
          >
            <GithubIcon aria-label="Besøk GitHub" />
            <span className="button-tooltip-text radius tooltip">GitHub</span>
          </button>
        </div>
      </div>
      <div className="map-container" onClick={(e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('leaflet-container')) {
          setSelectedMunicipality(null);
        }
      }}>
        <MapContainer 
          center={[60.472024, 8.468946]} 
          zoom={6} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          onClick={(e) => {
            if (e.originalEvent.target.classList.contains('leaflet-container')) {
              setSelectedMunicipality(null);
            }
          }}
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
            style={(feature) => {
              const municipalityCode = feature.properties.kommunenummer;
              const level = markedMunicipalities[municipalityCode];
              return {
                fillColor: level ? getColorByLevel(level) : 'white',
                fillOpacity: 0.3,
                weight: 1,
                opacity: 1,
                color: '#666',
                dashArray: '3'
              };
            }}
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
          getCategoryName={getCategoryName}
        />
      )}
      <div className="legend">
        <h3>{translations.no.legend}</h3>
        {Object.entries(categories).map(([key, value]) => {
          let count;
          if (key === 'never') {
            count = Object.keys(municipalities).length - Object.keys(markedMunicipalities).length;
          } else {
            count = Object.values(markedMunicipalities).filter(level => level === key).length;
          }
          return (
            <div key={key} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: getColorByLevel(key) }}
              />
              <span className="legend-label">
                {getCategoryName(key)}
                {key !== 'never' && ` (${levelPoints[key]}p)`}
              </span>
              <span className="legend-count">({count})</span>
              <button 
                className="edit-category-btn"
                onClick={() => handleCategoryEdit(key)}
                title="Endre navn"
              >
                <EditIcon />
              </button>
            </div>
          );
        })}
      </div>
      {footnoteOpen ? (
        <div id="footnote" onMouseLeave={() => setFootnoteOpen(false)}>
          <div className="footnote-container radius">
            <div id="footnote-row">
              <p>Visualiser dine reiser i Norge og del med venner og familie!</p>
              <CloseIcon
                id="close-icon"
                onClick={() => setFootnoteOpen(false)}
              />
            </div>
            Inspirert av
            <a
              href="https://lab.magiconch.com/china-ex/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              China-ex{" "}
            </a>
            &
            <a
              href="https://tenpages.github.io/us-level/eu.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              US-level/eu
            </a>
            &
            <a
              href="https://smstone0.github.io#/uk-map"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              smstone0
            </a>
            <br />
            <br />
            Kartdata basert på{" "}
            <a
              href="https://github.com/robhop/fylker-og-kommuner"
              target="_blank"
              rel="noopener noreferrer"
            >
              fylker-og-kommuner
            </a>
            {" "}og Kartverkets geodata (CC BY-SA 4.0)
          </div>
        </div>
      ) : (
        <div id="footnote" onMouseEnter={() => setFootnoteOpen(true)}>
          <InfoIcon />
        </div>
      )}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Endre kategori navn</h3>
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCategorySave();
                }
              }}
              autoFocus
            />
            <div className="modal-buttons">
              <button onClick={() => setShowCategoryModal(false)}>Avbryt</button>
              <button onClick={handleCategorySave}>Lagre</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function MunicipalityCard({ municipalityName, position, levelClick, currentLevel, translations, getColorByLevel, getCategoryName }) {
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
            {getCategoryName(key)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default NorwegianMap; 