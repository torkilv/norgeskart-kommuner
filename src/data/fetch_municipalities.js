// Script to parse Norwegian municipality data from a local GeoJSON file
const fs = require('fs');

async function fetchMunicipalities() {
  try {
    // Read GeoJSON data from local file
    const raw = fs.readFileSync('Kommuner-M.geojson', 'utf8');
    const data = JSON.parse(raw);

    // Transform the data into our format
    const municipalities = {};
    data.features.forEach(feature => {
      const props = feature.properties;
      municipalities[props.kommunenummer] = {
        name: props.kommunenavn,
        name_en: props.kommunenavn, // We'll keep the same name for now
        population: props.innbyggertall || 0,
        coordinates: feature.geometry.coordinates[0][0], // Use first coordinate as a placeholder
        geometry: feature.geometry // Store the full geometry for the map
      };
    });

    // Write to file
    fs.writeFileSync(
      'norwegian_municipalities.js',
      `// Norwegian municipalities data\nconst municipalities = ${JSON.stringify(municipalities, null, 2)};\n\n// Categories for marking municipalities\nconst categories = {\n  lived: {\n    no: \"Bodd\",\n    en: \"Lived\",\n    color: \"#FF0000\"\n  },\n  stayed: {\n    no: \"Overnattet\",\n    en: \"Stayed\",\n    color: \"#FFA500\"\n  },\n  visited: {\n    no: \"Besøkt\",\n    en: \"Visited\",\n    color: \"#FFFF00\"\n  },\n  stopped: {\n    no: \"Stoppet\",\n    en: \"Stopped\",\n    color: \"#00FF00\"\n  },\n  passed: {\n    no: \"Reist gjennom\",\n    en: \"Passed through\",\n    color: \"#0000FF\"\n  },\n  never: {\n    no: \"Aldri vært\",\n    en: \"Never been\",\n    color: \"#808080\"\n  }\n};\n\nexport { municipalities, categories };`
    );

    console.log('Municipality data has been updated successfully!');
  } catch (error) {
    console.error('Error parsing municipality data:', error);
  }
}

fetchMunicipalities(); 