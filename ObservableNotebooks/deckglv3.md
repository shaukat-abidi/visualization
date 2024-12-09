# Mapbox DeckGL
```js
{
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css';
  document.head.appendChild(link);
}
```

```js
import deck from "npm:deck.gl";
import mapboxgl from "npm:mapbox-gl";

//import deck from "npm:deck.gl@v8-latest";
//import mapboxgl from "npm:mapbox-gl@3.3.0";
//import deck from "npm:deck.gl@v8-latest"
//import mapboxgl from 'https://cdn.skypack.dev/mapbox-gl';
//import deck from 'https://cdn.skypack.dev/deck.gl';

//const token='pk.eyJ1Ijoic2hhdWthdC1hYmVkaSIsImEiOiJjbHZ4NWxnaWIyZ2lrMnFvMDRqNXVyYTB1In0.9QSziY6UgHZG6i38A1gX4A';

```


```js
//const {DeckGL, AmbientLight, GeoJsonLayer, HexagonLayer, LightingEffect, PointLight} = deck;

let container = html `<div style="height:700px"></div>`;


```

```js

const deckInstance = new deck.DeckGL({
  container,
    controller: true,
    map: mapboxgl,
    mapboxAccessToken: token,
    mapboxApiAccessToken: token,
    //mapStyle: "mapbox://styles/mapbox/streets-v12",
    initialViewState: {
      longitude: -87.623177,
      latitude: 41.881832,
      zoom: 12
    }
});

```