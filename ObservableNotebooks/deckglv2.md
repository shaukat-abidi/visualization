# DeckGL-V2  

```js
import deck from "npm:deck.gl";
import maplibregl from "npm:maplibre-gl";
//import "./maplibre-gl.css";
```

```js
const {GeoJsonLayer, ArcLayer, MapboxOverlay} = deck;
//const { TextLayer } = deck;
//const { MapboxLayer } = deck;
```

```js
const AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';
console.log(AIR_PORTS);

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  center: [0.45, 51.47],
  zoom: 4,
  bearing: 0,
  pitch: 30
});

const deckOverlay = new MapboxOverlay({
  // interleaved: true,
  layers: [
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: f => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: info =>
        // eslint-disable-next-line
        info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
      // beforeId: 'watername_ocean' // In interleaved mode, render the layer under map labels
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: f => [-0.4531566, 51.4709959], // London
      getTargetPosition: f => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1
    })
  ]
});


map.addControl(deckOverlay);
map.addControl(new maplibregl.NavigationControl());
```

<div id="map" style="border-radius: 8px; overflow: hidden; background: rgb(18, 35, 48); height: 800px; margin: 1rem 0; "></div>
