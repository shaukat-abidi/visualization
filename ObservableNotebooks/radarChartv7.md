# Vital Signs Dashboard - MoveToV8  

<!---
Scaling axis
--->

```js
function genPathForPolygon(objRadialLineGenerator, argRadius){
  var angleRadiusForPolygon = [
	[0, argRadius],
  [1*(2 * Math.PI / 7), argRadius],
	[2*(2 * Math.PI / 7), argRadius],
	[3*(2* Math.PI / 7), argRadius],
	[4*(2 * Math.PI / 7), argRadius],
	[5*(2 * Math.PI / 7), argRadius],
	[6*(2 * Math.PI / 7), argRadius],
	[7*(2 * Math.PI / 7), argRadius],	
  ];
  
  return objRadialLineGenerator(angleRadiusForPolygon)
}
```

```js
//Tesing block
/*
var radialLineGenerator = d3.radialLine();
var radiusPolygon = 10;
let strPath = genPathForPolygon(radialLineGenerator, radiusPolygon); 
console.log(strPath); 
*/
```
```js
function returnTransformedData(udata){
  const arrLen = udata.length;
  let retArray=[];
  for (let i=0; i<arrLen; i++) {
    retArray.push(udata[i].map(item => { return {axis:item.axis, value: mapConversionfunctions.get(item.axis)(item.unscaledvalue)}} ))
  }
  return retArray
}

function returnTransformedItem(item,index,array){
  //console.log("inside returnTransformItem");
  //console.log(item,index,array);
  return {axis:item.axis, value: mapConversionfunctions.get(item.axis)(item.unscaledvalue)}
}
```

```js
const personName = view(
  Inputs.select(
    new Map([
      ["Person-1", "P1"],
      ["Person-2", "P2"],
      ["Person-3", "P3"],
      ["Person-4", "P4"]
    ]),
    {value: "P1", label: "Name:"}
  )
);

const measurementTime = view(
  Inputs.select(
    new Map([
      ["01-05-2024T00:00:00", "T1"],
      ["01-05-2024T00:00:05", "T2"],
      ["01-05-2024T00:00:10", "T3"],
    ]),
    {value: "T1", label: "DateTime Stamp:"}
  )
);

//const vitalsigns = view(Inputs.checkbox(["Temperature", "Systolic BP", "Diastolic BP", "Arterial Pressure", "Pulse Rate", "Respiratory Rate", "Sp02"], {label: "Vital Signs"}));

```

```js
const curveType="curveLinearClosed";

const unscaledData = [

    {axis:"Systolic BP",unscaledvalue:90,time:"T1",person:"P1"},
    {axis:"Diastolic BP",unscaledvalue:60,time:"T1",person:"P1"},
    {axis:"Mean Arterial Pressure Cuff Calc",unscaledvalue:70,time:"T1",person:"P1"},
    {axis:"Pulse Rate",unscaledvalue:60,time:"T1",person:"P1"},
    {axis:"Respiratory Rate",unscaledvalue:12,time:"T1",person:"P1"},
    {axis:"SpO2",unscaledvalue:95,time:"T1",person:"P1"},
    {axis:"Temperature Tympanic",unscaledvalue:36.5,time:"T1",person:"P1"},
    

    {axis:"Systolic BP",unscaledvalue:120,time:"T2",person:"P1"},
    {axis:"Diastolic BP",unscaledvalue:80,time:"T2",person:"P1"},
    {axis:"Mean Arterial Pressure Cuff Calc",unscaledvalue:100,time:"T2",person:"P1"},
    {axis:"Pulse Rate",unscaledvalue:100,time:"T2",person:"P1"},
    {axis:"Respiratory Rate",unscaledvalue:20,time:"T2",person:"P1"},
    {axis:"SpO2",unscaledvalue:100,time:"T2",person:"P1"},
    {axis:"Temperature Tympanic",unscaledvalue:37.5,time:"T2",person:"P1"},
    

    {axis:"Systolic BP",unscaledvalue:110,time:"T3",person:"P1"},
    {axis:"Diastolic BP",unscaledvalue:75,time:"T3",person:"P1"},
    {axis:"Mean Arterial Pressure Cuff Calc",unscaledvalue:90,time:"T3",person:"P1"},
    {axis:"Pulse Rate",unscaledvalue:80,time:"T3",person:"P1"},
    {axis:"Respiratory Rate",unscaledvalue:17,time:"T3",person:"P1"},
    {axis:"SpO2",unscaledvalue:97,time:"T3",person:"P1"},
    {axis:"Temperature Tympanic",unscaledvalue:37.3,time:"T3",person:"P1"}
    

];


/*
Ranges
------
Systolic Blood Pressure SBP mmHg: (90-130)
Diastolic Blood Pressure DBP mmHg: (60-80)
Mean Arterial Pressure Cuff Calc MAP mmHg: (70-100)
Pulse rate (Heart Rate bpm) - HR: (60-100)
Respiratory Rate - RR: (12-16 breaths pm)
SPO2 (pulse oximetery %): (94-100)
temperature_tympanic (deg c): (35.0 - 38.0) 

*/

const newScale_SBP = d3.scaleLinear()
  .domain([90, 130]) //Input Range
  .range([80, 160]); //Output Range

const newScale_DBP = d3.scaleLinear()
  .domain([60, 80]) //Input Range
  .range([80, 160]); //Output Range

const newScale_MAP = d3.scaleLinear()
  .domain([70, 100]) //Input Range
  .range([80, 160]); //Output Range

const newScale_HR = d3.scaleLinear()
  .domain([60, 100]) //Input Range
  .range([80, 160]); //Output Range

const newScale_RR = d3.scaleLinear()
  .domain([12, 16]) //Input Range
  .range([80, 160]); //Output Range

const newScale_SPO2 = d3.scaleLinear()
  .domain([94, 100]) //Input Range
  .range([80, 160]); //Output Range

const newScale_tympanicTemp = d3.scaleLinear()
  .domain([35.0, 38.0]) //Input Range
  .range([80, 160]); //Output Range

const mapConversionfunctions = new Map();
mapConversionfunctions.set("Temperature Tympanic", newScale_tympanicTemp);
mapConversionfunctions.set("Systolic BP", newScale_SBP);
mapConversionfunctions.set("Diastolic BP", newScale_DBP);
mapConversionfunctions.set("Mean Arterial Pressure Cuff Calc", newScale_MAP);
mapConversionfunctions.set("Pulse Rate", newScale_HR);
mapConversionfunctions.set("Respiratory Rate", newScale_RR);
mapConversionfunctions.set("SpO2", newScale_SPO2);

const mapGetIndex = new Map();
mapGetIndex.set("Systolic BP",0);
mapGetIndex.set("Diastolic BP",1);
mapGetIndex.set("Mean Arterial Pressure Cuff Calc",2);
mapGetIndex.set("Pulse Rate",3);
mapGetIndex.set("Respiratory Rate",4);
mapGetIndex.set("SpO2",5);
mapGetIndex.set("Temperature Tympanic",6);

//console.log(mapGetIndex.get("Temperature Tympanic"));
//console.log(mapConversionfunctions);

//console.log(mapConversionfunctions.get("Temperature Tympanic")(38.0));

```


```js
console.log(personName, measurementTime);
const unscaledfilteredData = unscaledData.filter(item => item.time === measurementTime && item.person === personName);
console.log("unscaledFilteredData",  unscaledfilteredData);
//console.log(unscaledfilteredData);
```

```js
//const data = returnTransformedData(unscaledfilteredData);
const data = unscaledfilteredData.map(returnTransformedItem);
console.log("TransformedData", data);
```
```js
//console.log(data);
//const axesDomain = data[0].map(d => d.axis);
//const axesLength =  data[0].length;

const axesDomain = ["Systolic BP", "Diastolic BP", "Mean Arterial Pressure Cuff Calc", "Pulse Rate", "Respiratory Rate", "SpO2", "Temperature Tympanic"];
const axesLength = axesDomain.length;
const formatPercent = d3.format(',.0%');
const wrapWidth = 60;
const axisLabelFactor = 1.12;
const axisCircles = 5;
const dotRadius = 5;
const radius = 270;
const margin = 30;
const height = 600;
const width = 900;
const maxValue = 0.5;
const angleSlice = Math.PI * 2 / axesLength;
const color = d3.scaleOrdinal()
  .range(["red","green","blue"]);

//console.log("axesDomain: " + axesDomain);
//console.log("axesLength: " + axesLength);
//console.log("angleSlice: " + angleSlice + " radians");
```

```js
const radarLine = d3.lineRadial()
  .curve(d3.curveLinearClosed)
  .radius(d => d)
  .angle((d, i) => i * angleSlice);

//const device = d => ["iPhone", "Samsung", "Nokia"][d];
const device = d => ["Device-1", "Device-2", "Device-3"][d];


var points = [
  {xlower: 80 * Math.cos(angleSlice*0 - Math.PI/2), ypointlower: 80 * Math.sin(angleSlice*0 - Math.PI/2), xupper: 160 * Math.cos(angleSlice*0 - Math.PI/2), ypointupper: 160 * Math.sin(angleSlice*0 - Math.PI/2)},
  
  {xlower: 80 * Math.cos(angleSlice*1 - Math.PI/2), ypointlower: 80 * Math.sin(angleSlice*1 - Math.PI/2), xupper: 160 * Math.cos(angleSlice*1 - Math.PI/2), ypointupper: 160 * Math.sin(angleSlice*1 - Math.PI/2)},
  
  {xlower: 80 * Math.cos(angleSlice*2 - Math.PI/2), ypointlower: 80 * Math.sin(angleSlice*2 - Math.PI/2), xupper: 160 * Math.cos(angleSlice*2 - Math.PI/2), ypointupper: 160 * Math.sin(angleSlice*2 - Math.PI/2)},

  {xlower: 80 * Math.cos(angleSlice*3 - Math.PI/2), ypointlower: 80 * Math.sin(angleSlice*3 - Math.PI/2), xupper: 160 * Math.cos(angleSlice*3 - Math.PI/2), ypointupper: 160 * Math.sin(angleSlice*3 - Math.PI/2)},

  {xlower: 80 * Math.cos(angleSlice*4 - Math.PI/2), ypointlower: 80 * Math.sin(angleSlice*4 - Math.PI/2), xupper: 160 * Math.cos(angleSlice*4 - Math.PI/2), ypointupper: 160 * Math.sin(angleSlice*4 - Math.PI/2)},

  {xlower: 80 * Math.cos(angleSlice*5 - Math.PI/2), ypointlower: 80 * Math.sin(angleSlice*5 - Math.PI/2), xupper: 160 * Math.cos(angleSlice*5 - Math.PI/2), ypointupper: 160 * Math.sin(angleSlice*5 - Math.PI/2)},

  {xlower: 80 * Math.cos(angleSlice*6 - Math.PI/2), ypointlower: 80 * Math.sin(angleSlice*6 - Math.PI/2), xupper: 160 * Math.cos(angleSlice*6 - Math.PI/2), ypointupper: 160 * Math.sin(angleSlice*6 - Math.PI/2)}

];

var Gen = d3.area() 
          .x0((p) => p.xlower) 
          .x1((p) => p.xupper)
          .y0((p) => p.ypointlower) 
          .y1((p) => p.ypointupper)          
          // Using curveBasis 
          .curve(d3.curveLinearClosed); 
```


```js
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height + (margin*2))
    .attr("id", "idofsvg");

const containerWidth = width-(margin*2);
const containerHeight = height-(margin*2);
const container = svg.append('g')
  .attr("width", containerWidth)
  .attr("height", containerHeight)
  .attr('transform', `translate(${(width/2)+margin}, ${(height/2)+margin})`);


const axisGrid = container.append("g")
  .attr("class", "axisWrapper");

const axis = axisGrid.selectAll(".axis")
  .data(axesDomain)
  .enter()
  .append("g")
  .attr("class", "axis");

axis.append("line")
  .attr("x1", 0)
  .attr("y1", 0)
  .attr("x2", (d, i) => 300 * Math.cos(angleSlice*i - Math.PI/2) )
  .attr("y2", (d, i) => 300 * Math.sin(angleSlice*i - Math.PI/2) )
  .attr("class", "line")
  .style("stroke", "black")
  .style("stroke-width", "2px");

axis.append("text")
  .attr("class", "legend")
  .style("font-size", "11px")
  .attr("text-anchor", "middle")
  .attr("font-family", "monospace")
  .attr("dy", "0.5em")
  .attr("x", (d, i) => 310 * Math.cos(angleSlice*i - Math.PI/2))
  .attr("y", (d, i) => 310 * Math.sin(angleSlice*i - Math.PI/2))
  .text(d => d);


/*
const plots = container.append('g')
  .selectAll('g')
  .data(data) //2D array: [ [7 entries] ] 
  .join('g')
    .attr("data-name", (d, i) => {
      //console.log("data-name index: " + i);
      //console.log("printing data: " + d);
      return device(i) 
      })
    .attr("fill", "none")
    .attr("stroke", "steelblue");
*/

const plots = container.append('g')
  .selectAll('g')
  .data([data]) //2D array: [ [7 entries] ] 
  .join('g')
    .attr("patient-id", "1")
    .attr("fill", "blue")
    .attr("stroke", "black");



plots.append('path')
  .attr("d", Gen(points)) 
  .attr("fill", "lawngreen") 
  .attr("stroke", "white")
  .attr("fill-opacity", 0.3); 

plots.append('path')
  .attr("d", d => {
    //console.log("printing data in path");
    //console.log(d);
    //console.log(d.map(v => v.value));
    //console.log(radarLine(d.map(v => v.value)));
    return radarLine(d.map(v => v.value))
    }) // 
  .attr("fill", "white")
  .attr("fill-opacity", 0.0)
  .attr("stroke", "red")
  .attr("stroke-width", 2);

plots.selectAll("circle")
  .data(d => {
    //console.log(d);
    return d
    })
  .join("circle")
    .attr("r", dotRadius)
    .attr("cx", (d,i) => d.value * Math.cos(angleSlice*i - Math.PI/2))
    .attr("cy", (d,i) => d.value * Math.sin(angleSlice*i - Math.PI/2))
    .style("fill-opacity", 0.8)
    .on('mouseover', function(e,d){
      d3.select(this)
      .style('fill', 'red')

      //console.log(e,d);
      
      //Add text //mapGetIndex.get(d.axis)
      plots.append("text")
      .attr("class", "interactivelabel")
      .attr("x", d.value * Math.cos(angleSlice*mapGetIndex.get(d.axis) - Math.PI/2))
      .attr("y", d.value * Math.sin(angleSlice*mapGetIndex.get(d.axis) - Math.PI/2))
      .attr("dy", -10)
      .attr("dx", 10)
      .attr("text-anchor", "middle") // Center the text horizontally
      .text("" + mapConversionfunctions.get(d.axis).invert(d.value))
    })
    .on('mouseout', function(e,d){
      d3.select(this)
      .style('fill', 'white');

      //Removing text
      plots.selectAll(".interactivelabel").remove();
    });

/*
plots.selectAll("circle")
  .data(points)
  .join("circle")
    .attr("r", dotRadius)
    .attr("cx", function(d,i){
      //console.log(i);
      //console.log(d);
      return d.xlower
    })
    .attr("cy", function(d,i){
      //console.log(d,i);
      return d.ypointlower
    })
    .style("fill-opacity", 0.8);

  */
  
 
display(svg.node());
```

```js

```
