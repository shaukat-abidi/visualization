# Animated Treemap Testing

```js
const aapl = FileAttachment("aapl.csv").csv({typed: true});
const penguins = FileAttachment("penguins.csv").csv({typed: true});
const datamiserables = FileAttachment("miserables.json").json();
```

```js
const keys = d3.range(1790, 2000, 10);

const [regions, states] = await Promise.all([
FileAttachment("census-regions.csv").csv({typed: true}), // for grouping states hierarchically
FileAttachment("population.tsv").tsv({typed: true}) // a wide dataset of state populations over time
  ]).then(([regions, states]) => [
    regions,
    states.slice(1).map((d) => ({
      name: d[""], // the state name
      values: keys.map(key => +d[key].replace(/,/g, "")) // parse comma-separated numbers
    }))
  ]);

const regionByState = new Map(regions.map(d => [d.State, d.Region]));
const divisionByState = new Map(regions.map(d => [d.State, d.Division]));

const data = {keys, group: d3.group(states, d => regionByState.get(d.name), d => divisionByState.get(d.name))};
```

```js
display(data);
```

```js
//import {timeline} from "./components/timeline.js";
//import {animatedtreemap} from "./components/animatedtreemap.js";
```

```js
//const events = FileAttachment("./data/events.json").json();
```

```js
//timeline(events, {height: 300})
function drag(simulation) {

  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
```


```js
const width = 640;
const height = 640;
const color = d3.scaleOrdinal(d3.schemeObservable10);

// Copy the data to protect against mutation by d3.forceSimulation.
const links = datamiserables.links.map((d) => Object.create(d));
const nodes = datamiserables.nodes.map((d) => Object.create(d));

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d) => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", ticked);

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

const link = svg.append("g")
    .attr("stroke", "var(--theme-foreground-faint)")
    .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

const node = svg.append("g")
    .attr("stroke", "var(--theme-background)")
    .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
    .attr("r", 5)
    .attr("fill", (d) => color(d.group))
    .call(drag(simulation));

node.append("title")
    .text((d) => d.id);

function ticked() {
  link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

  node
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
}

display(svg.node());
```