# VitalSigns   

```js
const curveType="curveCardinalClosed";
const data = [
  [
    {axis:"Temperature Tympanic",value:36.1},
    {axis:"Systolic BP",value:154},
    {axis:"Diastolic BP",value:67},
    {axis:"Mean Arterial Pressure Cuff Calc",value:96},
    {axis:"Pulse Rate",value:60},
    {axis:"Respiratory Rate",value:18},
    {axis:"SpO2",value:98}
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

const mapConversionfunctions = new Map();
mapConversionfunctions.set("Temperature Tympanic", scale_tympanicTemp);
mapConversionfunctions.set("Systolic BP", scale_SBP);
mapConversionfunctions.set("Diastolic BP", scale_DBP);
mapConversionfunctions.set("Mean Arterial Pressure Cuff Calc", scale_MAP);
mapConversionfunctions.set("Pulse Rate", scale_HR);
mapConversionfunctions.set("Respiratory Rate", scale_RR);
mapConversionfunctions.set("SpO2", scale_SPO2);
console.log(mapConversionfunctions);

//console.log(mapConversionfunctions.get("Temperature Tympanic")(38.0));
```

```js
const transformedData = data[0].map(item => {
  console.log("Inside Data", item.axis, item.value, mapConversionfunctions.get(item.axis)(item.value));
  return {
    ...item,
    "transformedValue": mapConversionfunctions.get(item.axis)(item.value)
  }
});

console.log(transformedData);
```

```js
//const axesDomain = data[0].map(d => d.axis);
const axesDomain = ["Temperature Tympanic", "Systolic BP", "Diastolic BP", "Mean Arterial Pressure Cuff Calc", "Pulse Rate", "Respiratory Rate", "SpO2"];
const axesLength =  axesDomain.length;
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
  .range(["red","green","blue"]);

console.log("axesDomain: " + axesDomain);
console.log("axesLength: " + axesLength);
console.log("angleSlice: " + angleSlice + " radians");

```

```js
const radarLine = d3.lineRadial()
  .curve(d3.curveCardinalClosed)
  .radius(d => rScale(d))
  .angle((d, i) => i * angleSlice);
```

```js

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
  .data(d3.range(1,(axisCircles+1)).reverse()) // iterating [4,3,2,1]
  .enter()
  .append("circle")
  .attr("class", "gridCircle")
  .attr("r", (d, i) => radius/axisCircles*d)
  .style("fill", "#CDCDCD")
  .style("stroke", "silver")
  .style("fill-opacity", 0.2);

const axis = axisGrid.selectAll(".axis")
  .data(axesDomain) // iterating ["Temperature Tympanic", "Systolic BP", "Diastolic BP", "Mean Arterial Pressure Cuff Calc", "Pulse Rate", "Respiratory Rate", "SpO2"]
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
  .data(transformedData)
  .join('g')
    .attr("data-name", (d, i) => "testPatient")
    .attr("fill", "none")
    .attr("stroke", "steelblue");

plots.append('path')
  //.attr("d", d => radarLine(d.map(v => v.transformedValue)))
  .attr("d", d => radarLine(d.transformedValue) )
  .attr("fill", (d, i) => color(1))
  .attr("fill-opacity", 0.1)
  .attr("stroke", (d, i) => color(1))
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
