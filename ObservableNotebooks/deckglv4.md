# DeckGL-V4 

```js
import deck from "npm:deck.gl";
import mapboxgl  from "npm:mapbox-gl";
```

```js
const {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight, MapboxOverlay} = deck;
```

```js
const data = FileAttachment("latlons.csv").csv({array: true, typed: true}).then((data) => data.slice(1));
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json");
const world = fetch(topo).then((response) => response.json());
const countries = world.then((world) => topojson.feature(world, world.objects.countries));
```

```js
const coverage = view(Inputs.range([0, 1], {value: 0.5, label: "Coverage", step: 0.01}));
const radius = view(Inputs.range([500, 20000], {value: 1000, label: "Radius", step: 100}));
const upperPercentile = view(Inputs.range([0, 100], {value: 100, label: "Upper percentile", step: 1}));
```

```js
const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];
const colorLegend = Plot.plot({
  margin: 0,
  marginTop: 20,
  width: 180,
  height: 35,
  style: "color: white;",
  x: {padding: 0, axis: null},
  marks: [
    Plot.cellX(colorRange, {fill: ([r, g, b]) => `rgb(${r},${g},${b})`, inset: 0.5}),
    Plot.text(["Fewer"], {frameAnchor: "top-left", dy: -12}),
    Plot.text(["More"], {frameAnchor: "top-right", dy: -12})
  ]
});
```
```js
const effects = [
  new LightingEffect({
    ambientLight: new AmbientLight({color: [255, 255, 255], intensity: 1.0}),
    pointLight: new PointLight({color: [255, 255, 255], intensity: 0.8, position: [-0.144528, 49.739968, 80000]}),
    pointLight2: new PointLight({color: [255, 255, 255], intensity: 0.8, position: [-3.807751, 54.104682, 8000]})
  })
];
```

```js
// Set your Mapbox token here or via environment variable
const MAPBOX_TOKEN = "pk.eyJ1Ijoic2hhdWthdC1hYmVkaSIsImEiOiJjbHZ1a2N3ZjUxbHp0MmptZ29reXB1YjYzIn0.kEMdHCh9B-KnKAwCw"; // eslint-disable-line

const map = new mapboxgl.Map({
  container: 'container',
  style: 'mapbox://styles/mapbox/dark-v11',
  accessToken: MAPBOX_TOKEN,
  center: [150.84947371,-33.96321386],
  zoom: 4,
  bearing: 0,
  pitch: 30
});

const deckOverlay = new MapboxOverlay({
  // interleaved: true,
  layers: [
    new GeoJsonLayer({
      id: "base-map",
      data: countries,
      lineWidthMinPixels: 5,
      getLineColor: [60, 60, 60],
      getFillColor: [9, 16, 29]
    }),
    new HexagonLayer({
      id: "heatmap",
      data,
      coverage,
      radius,
      upperPercentile,
      colorRange,
      elevationScale: 50,
      elevationRange: [0, 5000 * t],
      extruded: true,
      getPosition: (d) => d,
      pickable: true,
      material: {
        ambient: 0.64,
        diffuse: 0.6,
        shininess: 32,
        specularColor: [51, 51, 51]
      }
    })
  ]

});

map.addControl(deckOverlay);
map.addControl(new mapboxgl.NavigationControl());
```


```js
const t = (function* () {
  const duration = 1000;
  const start = performance.now();
  const end = start + duration;
  let now;
  while ((now = performance.now()) < end) yield d3.easeCubicInOut(Math.max(0, (now - start) / duration));
  yield 1;
})();
```
<div class="card" style="margin: 0 -1rem;">

## Area Distribution

<figure style="max-width: none; position: relative;">
  <div id="container" style="border-radius: 8px; overflow: hidden; background: rgb(18, 35, 48); height: 800px; margin: 1rem 0; "></div>
</figure>

</div>
