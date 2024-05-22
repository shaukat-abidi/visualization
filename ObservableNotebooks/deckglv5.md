# Incoming Patient Distribution  

```js
import deck from "npm:deck.gl";
```

```js
const {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight} = deck;
const { TextLayer } = deck;
```

```js
const data = FileAttachment("latlons.csv").csv({array: true, typed: true}).then((data) => data.slice(1));
const topo = import.meta.resolve("npm:visionscarto-world-atlas/world/110m.json");
const world = fetch(topo).then((response) => response.json());
const countries = world.then((world) => topojson.feature(world, world.objects.countries));
const textObj = [
  {"name":"This is my text","coordinates":[150.84947371,-33.96321386]}
];
```

```js
console.log(textObj);
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
const deckInstance = new DeckGL({
  mapStyle: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  container,
  initialViewState,
  //getTooltip,
  effects,
  controller: true
});

// clean up if this code re-runs
invalidation.then(() => {
  deckInstance.finalize();
  container.innerHTML = "";
});
```


```js
const initialViewState = {
  longitude: 150.84947371,
  latitude: -33.96321386,
  zoom: 8,
  minZoom: 0,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -5
};
```

```js
function getTooltip({object}) {
  if (!object) return null;
  const [lng, lat] = object.position;
  const count = object.points.length;
  return `latitude: ${lat.toFixed(2)}
    longitude: ${lng.toFixed(2)}
    ${count} collisions`;
}
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
deckInstance.setProps({
  layers: [
    new GeoJsonLayer({
      id: "base-map",
      data: countries,
      lineWidthMinPixels: 2,
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
    }),
    new TextLayer({
      id: 'TextLayer',
      data: textObj,
      getPosition: d => d.coordinates,
      getText: d => d.name,
      getAlignmentBaseline: 'center',
      getColor: [255, 128, 0],
      getSize: 16,
      getTextAnchor: 'middle',
      pickable: true
    })
  ]
});
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
<figure style="max-width: none; position: relative;">
  <div id="container" style="border-radius: 8px; overflow: hidden; background: rgb(18, 35, 48); width:1150px; height: 600px; margin: 1rem 0; "></div>
  <div style="position: absolute; top: 1rem; right: 1rem; filter: drop-shadow(0 0 4px rgba(0,0,0,.5));">${colorLegend}</div>
</figure>

</div>
