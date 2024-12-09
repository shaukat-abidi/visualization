# BenGraph   

```js
const curveType="curveCardinalClosed";
const data = [
  [//iPhone
    {axis:"Battery",value:0.22},
    {axis:"Brand",value:0.28},
    {axis:"Contract",value:0.29},
    {axis:"Design",value:0.17},
    {axis:"Internet",value:0.22},
    {axis:"Screen",value:0.02},
    {axis:"Price",value:0.21}
//    {axis:"Smartphone",value:0.50}			
  ],[//Samsung
    {axis:"Battery",value:0.27},
    {axis:"Brand",value:0.16},
    {axis:"Contract",value:0.35},
    {axis:"Design",value:0.13},
    {axis:"Internet",value:0.20},
    {axis:"Screen",value:0.13},
    {axis:"Price",value:0.35}
//    {axis:"Smartphone",value:0.38}
  ],[//Nokia Smartphone
    {axis:"Battery",value:0.26},
    {axis:"Brand",value:0.10},
    {axis:"Contract",value:0.30},
    {axis:"Design",value:0.14},
    {axis:"Internet",value:0.22},
    {axis:"Screen",value:0.04},
    {axis:"Price",value:0.41}
//    {axis:"Smartphone",value:0.30}
  ]
];
/*
Ranges
------
temperature_tympanic (deg c): (36.5 - 37.5) 
Systolic Blood Pressure SBP mmHg: (90-120)
Diastolic Blood Pressure DBP mmHg: (60-80)
Mean Arterial Pressure Cuff Calc MAP mmHg: (70-100)
Pulse rate (Heart Rate bpm) - HR: (60-100)
Respiratory Rate - RR: (12-20 breaths pm)
SPO2 (pulse oximetery %): (95-100)
*/

const scale_tympanicTemp = d3.scaleLinear()
  .domain([36.0, 38.0]) //Input Range
  .range([0, 0.5]); //Output Range

const scale_SBP = d3.scaleLinear()
  .domain([89, 120]) //Input Range
  .range([0, 0.5]); //Output Range

const scale_DBP = d3.scaleLinear()
  .domain([60, 80]) //Input Range
  .range([0, 0.5]); //Output Range

const scale_MAP = d3.scaleLinear()
  .domain([70, 100]) //Input Range
  .range([0, 0.5]); //Output Range

const scale_HR = d3.scaleLinear()
  .domain([60, 100]) //Input Range
  .range([0, 0.5]); //Output Range

const scale_RR = d3.scaleLinear()
  .domain([12, 20]) //Input Range
  .range([0, 0.5]); //Output Range

const scale_SPO2 = d3.scaleLinear()
  .domain([94, 105]) //Input Range
  .range([0, 0.5]); //Output Range


```


```js
console.log(data);
const axesDomain = data[0].map(d => d.axis);
const axesLength =  data[0].length;
const formatPercent = d3.format(',.0%');
const wrapWidth = 60;
const axisLabelFactor = 1.12;
const axisCircles = 5;
const dotRadius = 5;
const radius = 270;
const margin = 30;
const height = 600;
const maxValue = 0.5;
const angleSlice = Math.PI * 2 / axesLength;
const rScale = d3.scaleLinear()
  .domain([0, maxValue])
  .range([0, radius]);
const color = d3.scaleOrdinal()
  .range(["#EDC951","#CC333F","#00A0B0"]);

console.log("axesDomain: " + axesDomain);
console.log("axesLength: " + axesLength);
console.log("angleSlice: " + angleSlice + " radians");

```

```js
const radarLine = d3.lineRadial()
  .curve(d3.curveCardinalClosed)
  .radius(d => rScale(d))
  .angle((d, i) => i * angleSlice);

const device = d => ["iPhone", "Samsung", "Nokia"][d];

```

```js
console.log(device(0));
```

```js

//const svg = d3.select(DOM.svg(width, height+(margin*2)));

const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height + (margin*2));

const containerWidth = width-(margin*2);
const containerHeight = height-(margin*2);
const container = svg.append('g')
  .attr("width", containerWidth)
  .attr("height", containerHeight)
  .attr('transform', `translate(${(width/2)+margin}, ${(height/2)+margin})`);


const axisGrid = container.append("g")
  .attr("class", "axisWrapper");

axisGrid.selectAll(".levels")
  .data(d3.range(1,(axisCircles+1)).reverse())
  .enter()
  .append("circle")
  .attr("class", "gridCircle")
  .attr("r", (d, i) => radius/axisCircles*d)
  .style("fill", "#CDCDCD")
  .style("stroke", "silver")
  .style("fill-opacity", 0.2);

const axis = axisGrid.selectAll(".axis")
  .data(axesDomain)
  .enter()
  .append("g")
  .attr("class", "axis");

axis.append("line")
  .attr("x1", 0)
  .attr("y1", 0)
  //.attr("x2", (d, i) => 300 * Math.cos(angleSlice*i) )
  //.attr("y2", (d, i) => 300 * Math.sin(angleSlice*i) )
  .attr("x2", (d, i) => rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2 ) )
  .attr("y2", (d, i) => rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2 ) )
  .attr("class", "line")
  .style("stroke", "black")
  .style("stroke-width", "2px");

axis.append("text")
  .attr("class", "legend")
  .style("font-size", "11px")
  .attr("text-anchor", "middle")
  .attr("font-family", "monospace")
  .attr("dy", "0.3em")
  .attr("x", (d, i) => rScale(maxValue * axisLabelFactor) * Math.cos(angleSlice*i - Math.PI/2))
  .attr("y", (d, i) => rScale(maxValue * axisLabelFactor) * Math.sin(angleSlice*i - Math.PI/2))
  .text(d => d);

const plots = container.append('g')
  .selectAll('g')
  .data(data)
  .join('g')
    .attr("data-name", (d, i) => device(i))
    .attr("fill", "none")
    .attr("stroke", "steelblue");

plots.append('path')
  .attr("d", d => radarLine(d.map(v => v.value)))
  .attr("fill", (d, i) => color(i))
  .attr("fill-opacity", 0.1)
  .attr("stroke", (d, i) => color(i))
  .attr("stroke-width", 2);

plots.selectAll("circle")
  .data(d => d)
  .join("circle")
    .attr("r", dotRadius)
    .attr("cx", (d,i) => rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2))
    .attr("cy", (d,i) => rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2))
    .style("fill-opacity", 0.8);

display(svg.node());
```