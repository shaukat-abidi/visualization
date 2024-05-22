# Animated Treemap

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
let uidCounter = 0;

function uniqueId(prefix = "uid") {
    uidCounter++;
    return `${prefix}${uidCounter}`;
}

const width = 928;
const height = width;

// This is normally zero, but could be non-zero if this cell is
// re-evaluated after the animation plays.
//const initialIndex = viewof index.value;
const initialIndex = 0;
const index = view(Inputs.range([0, 10], {label: html`<i>Years</i>`, step: 1}));

// To allow the transition to be interrupted and resumed, we parse
// the displayed text (the state population) to get the current
// value at the start of each transition; parseNumber and 
// formatNumber must be symmetric.
const parseNumber = string => +string.replace(/,/g, "");
const formatNumber = d3.format(",d");

// Get the maximum total population across the dataset. (We know
// for this dataset that it’s always the last value, but that isn’t
// true in general.) This allows us to scale the rectangles for
// each state to be proportional to the max total.
const max = d3.max(data.keys, (d, i) => d3.hierarchy(data.group).sum(d => d.values[i]).value);

// The category10 color scheme per state, but faded so that the
// text labels are more easily read.
const color = d3.scaleOrdinal()
    .domain(data.group.keys())
    .range(d3.schemeCategory10.map(d => d3.interpolateRgb(d, "white")(0.5)));

// Construct the treemap layout.
const treemap = d3.treemap()
    .size([width, height])
    .tile(d3.treemapResquarify) // to preserve orientation when animating
    .padding(d => d.height === 1 ? 1 : 0) // only pad parents of leaves
    .round(true);

// Compute the structure using the average value (since this
// orientation will be preserved using resquarify across the
// entire animation).
const root = treemap(d3.hierarchy(data.group)
    .sum(d => Array.isArray(d.values) ? d3.sum(d.values) : 0)
    .sort((a, b) => b.value - a.value));

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height + 20)
    .attr("viewBox", [0, -20, width, height + 20])
    .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif; overflow: visible;");

// Draw a box representing the total population for each time. Only
// show the boxes after the current time (to avoid distracting gray
// lines in between the padded treemap cells).
const box = svg.append("g")
  .selectAll("g")
  .data(data.keys.map((key, i) => {
    const value = root.sum(d => d.values[i]).value;
    return {key, value, i, k: Math.sqrt(value / max)};
  }).reverse())
  .join("g")
    .attr("transform", ({k}) => `translate(${(1 - k) / 2 * width},${(1 - k) / 2 * height})`)
    .attr("opacity", ({i}) => i >= initialIndex ? 1 : 0)
    .call(g => g.append("text")
        .attr("y", -6)
        .attr("fill", "#777")
      .selectAll("tspan")
      .data(({key, value}) => [key, ` ${formatNumber(value)}`])
      .join("tspan")
        .attr("font-weight", (d, i) => i === 0 ? "bold" : null)
        .text(d => d))
    .call(g => g.append("rect")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("width", ({k}) => k * width)
        .attr("height", ({k}) => k * height));

// Render the leaf nodes of the treemap.
const leaf = svg.append("g")
  .selectAll("g")
  .data(layout(initialIndex))
  .join("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

// Assuming d3 and uniqueId have been defined appropriately
leaf.append("rect")
    .attr("id", d => (d.leafUid = uniqueId("leaf")).id)  // Modified to use uniqueId
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data[0]); })
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0);

// Clip the text to the containing node.
leaf.append("clipPath")
    .attr("id", d => (d.clipUid = uniqueId("clip")).id)  // Modified to use uniqueId
    .append("use")
    .attr("xlink:href", d => `#${d.clipUid.id}`);  // Adjusted to reference the correct ID


// Generate two tspans for two lines of text (name and value).
leaf.append("text")
    .attr("clip-path", d => d.clipUid)
  .selectAll("tspan")
  .data(d => [d.data.name, formatNumber(d.value)])
  .join("tspan")
    .attr("x", 3)
    .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
    .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
    .text(d => d);

leaf.append("title")
    .text(d => d.data.name);

// Scale the treemap layout to fit within a centered box whose area
// is proportional to the total current value. This makes the areas
// of each state proportional for the entire animation.
function layout(index) {
  const k = Math.sqrt(root.sum(d => d.values[index]).value / max);
  const tx = (1 - k) / 2 * width;
  const ty = (1 - k) / 2 * height;
  return treemap.size([width * k, height * k])(root)
    .each(d => (d.x0 += tx, d.x1 += tx, d.y0 += ty, d.y1 += ty))
    .leaves();
};

display(svg.node());  
```

```js
function update(index, duration) {
  box.transition()
      .duration(duration)
      .attr("opacity", ({i}) => i >= index ? 1 : 0);

  leaf.data(layout(index)).transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("transform", d => `translate(${d.x0},${d.y0})`)
      .call(leaf => leaf.select("rect")
          .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0))
      .call(leaf => leaf.select("text tspan:last-child")
          .tween("text", function(d) {
            const i = d3.interpolate(parseNumber(this.textContent), d.value);
            return function(t) { this.textContent = formatNumber(i(t)); };
          }));
display(svg.node());  
};

update(index, 2500); // trigger animation from the scrubber

//const index = view(Inputs.range([0, 10], {label: html`<i>Years</i>`, step: 1}));
```

```js
//update = chart.update(index, 2500) // trigger animation from the scrubber
```
