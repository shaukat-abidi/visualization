# Vital Signs Dashboard - InProgress  

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


/*
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
*/

const timeInterval = view(
  Inputs.range([1,3], {
  label: "Time",
  step: 1, 
  placeholder: "Time",
  })
);

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

// Red Low Region
const r0_RedLow=0;
const r1_RedLow=80;

// Yellow Low Region
const r0_YellowLow=80;
const r1_YellowLow=100;

// White Normal Region
const r0_WhiteNormal=100;
const r1_WhiteNormal=150;

// Yellow High Region
const r0_YellowHigh=150;
const r1_YellowHigh=170;

// Red High Region
const r0_RedHigh=170;
const r1_RedHigh=220;


const newScale_SBP = d3.scaleLinear()
  .domain([50, 90, 100, 130, 180, 200] ) //Input Range
  .range( [r0_RedLow, r0_YellowLow, r0_WhiteNormal, r0_YellowHigh, r0_RedHigh, r1_RedHigh]); //Output Range

const newScale_DBP = d3.scaleLinear()
  .domain([40, 50, 60, 80, 90, 120]) //Input Range
  .range( [r0_RedLow, r0_YellowLow, r0_WhiteNormal, r0_YellowHigh, r0_RedHigh, r1_RedHigh]); //Output Range

const newScale_MAP = d3.scaleLinear()
  .domain([40, 50, 60, 70, 100, 110, 140]) //Input Range
  .range( [r0_RedLow, r0_YellowLow, r0_WhiteNormal, r0_YellowHigh, r0_RedHigh, r1_RedHigh]); //Output Range

const newScale_HR = d3.scaleLinear()
  .domain([20, 40, 50, 120, 140, 200]) //Input Range
  .range( [r0_RedLow, r0_YellowLow, r0_WhiteNormal, r0_YellowHigh, r0_RedHigh, r1_RedHigh]); //Output Range

const newScale_RR = d3.scaleLinear()
  .domain([2, 5, 10, 25, 30, 50]) //Input Range
  .range( [r0_RedLow, r0_YellowLow, r0_WhiteNormal, r0_YellowHigh, r0_RedHigh, r1_RedHigh]); //Output Range

const newScale_SPO2 = d3.scaleLinear()
  .domain([80, 90, 95, 100, 110, 120]) //Input Range
  .range( [r0_RedLow, r0_YellowLow, r0_WhiteNormal, r0_YellowHigh, r0_RedHigh, r1_RedHigh]); //Output Range

const newScale_tympanicTemp = d3.scaleLinear()
  .domain([30, 34, 35.0, 38.0, 40, 45]) //Input Range
  .range( [r0_RedLow, r0_YellowLow, r0_WhiteNormal, r0_YellowHigh, r0_RedHigh, r1_RedHigh]); //Output Range


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
//measurementTime = "T" + string(selectTime);
//console.log(personName, measurementTime);
const measurementTime = "T"+timeInterval
console.log("PersonName: ", personName, "MeasurementTime: ", measurementTime, typeof measurementTime);
console.log("TimeInterval: ", timeInterval, typeof timeInterval);
const unscaledfilteredData = unscaledData.filter(item => item.time === measurementTime && item.person === "P1");
console.log("unscaledFilteredData",  unscaledfilteredData);
//console.log(unscaledfilteredData);
```

```js
//const data = returnTransformedData(unscaledfilteredData);
const data = unscaledfilteredData.map(returnTransformedItem);
console.log("TransformedData", data);
```

```js
const axesDomain = ["Systolic BP", "Diastolic BP", "Mean Arterial Pressure Cuff Calc", "Pulse Rate", "Respiratory Rate", "SpO2", "Temperature Tympanic"];
const axesLength = axesDomain.length;
const dotRadius = 5;
const margin = 30;
const height = 600;
const width = 900;
const angleSlice = Math.PI * 2 / axesLength;

//console.log("axesDomain: " + axesDomain);
//console.log("axesLength: " + axesLength);
//console.log("angleSlice: " + angleSlice + " radians");
```

```js
const radarLineOld = d3.lineRadial()
  .curve(d3.curveLinearClosed)
  .radius(d => d)
  .angle((d, i) => i * angleSlice);

const radarLine = d3.lineRadial()
  .curve(d3.curveLinearClosed)
  .radius(d => d.value)
  .angle((d, i) =>  mapGetIndex.get(d.axis) * angleSlice);

// red-low: 60-80
// yellow-low: 80-90
// white-normal: 90-150
// yellow-high: 150-160
// red-high: 160-180

const pointsForRedLow = [
  {xlower: r0_RedLow * Math.cos(angleSlice*0 - Math.PI/2), ypointlower: r0_RedLow * Math.sin(angleSlice*0 - Math.PI/2), xupper: r1_RedLow * Math.cos(angleSlice*0 - Math.PI/2), ypointupper: r1_RedLow * Math.sin(angleSlice*0 - Math.PI/2)},
  
  {xlower: r0_RedLow * Math.cos(angleSlice*1 - Math.PI/2), ypointlower: r0_RedLow * Math.sin(angleSlice*1 - Math.PI/2), xupper: r1_RedLow * Math.cos(angleSlice*1 - Math.PI/2), ypointupper: r1_RedLow * Math.sin(angleSlice*1 - Math.PI/2)},
  
  {xlower: r0_RedLow * Math.cos(angleSlice*2 - Math.PI/2), ypointlower: r0_RedLow * Math.sin(angleSlice*2 - Math.PI/2), xupper: r1_RedLow * Math.cos(angleSlice*2 - Math.PI/2), ypointupper: r1_RedLow * Math.sin(angleSlice*2 - Math.PI/2)},

  {xlower: r0_RedLow * Math.cos(angleSlice*3 - Math.PI/2), ypointlower: r0_RedLow * Math.sin(angleSlice*3 - Math.PI/2), xupper: r1_RedLow * Math.cos(angleSlice*3 - Math.PI/2), ypointupper: r1_RedLow * Math.sin(angleSlice*3 - Math.PI/2)},

  {xlower: r0_RedLow * Math.cos(angleSlice*4 - Math.PI/2), ypointlower: r0_RedLow * Math.sin(angleSlice*4 - Math.PI/2), xupper: r1_RedLow * Math.cos(angleSlice*4 - Math.PI/2), ypointupper: r1_RedLow * Math.sin(angleSlice*4 - Math.PI/2)},

  {xlower: r0_RedLow * Math.cos(angleSlice*5 - Math.PI/2), ypointlower: r0_RedLow * Math.sin(angleSlice*5 - Math.PI/2), xupper: r1_RedLow * Math.cos(angleSlice*5 - Math.PI/2), ypointupper: r1_RedLow * Math.sin(angleSlice*5 - Math.PI/2)},

  {xlower: r0_RedLow * Math.cos(angleSlice*6 - Math.PI/2), ypointlower: r0_RedLow * Math.sin(angleSlice*6 - Math.PI/2), xupper: r1_RedLow * Math.cos(angleSlice*6 - Math.PI/2), ypointupper: r1_RedLow * Math.sin(angleSlice*6 - Math.PI/2)}

];

const pointsForYellowLow = [
  {xlower: r0_YellowLow * Math.cos(angleSlice*0 - Math.PI/2), ypointlower: r0_YellowLow * Math.sin(angleSlice*0 - Math.PI/2), xupper: r1_YellowLow * Math.cos(angleSlice*0 - Math.PI/2), ypointupper: r1_YellowLow * Math.sin(angleSlice*0 - Math.PI/2)},
  
  {xlower: r0_YellowLow * Math.cos(angleSlice*1 - Math.PI/2), ypointlower: r0_YellowLow * Math.sin(angleSlice*1 - Math.PI/2), xupper: r1_YellowLow * Math.cos(angleSlice*1 - Math.PI/2), ypointupper: r1_YellowLow * Math.sin(angleSlice*1 - Math.PI/2)},
  
  {xlower: r0_YellowLow * Math.cos(angleSlice*2 - Math.PI/2), ypointlower: r0_YellowLow * Math.sin(angleSlice*2 - Math.PI/2), xupper: r1_YellowLow * Math.cos(angleSlice*2 - Math.PI/2), ypointupper: r1_YellowLow * Math.sin(angleSlice*2 - Math.PI/2)},

  {xlower: r0_YellowLow * Math.cos(angleSlice*3 - Math.PI/2), ypointlower: r0_YellowLow * Math.sin(angleSlice*3 - Math.PI/2), xupper: r1_YellowLow * Math.cos(angleSlice*3 - Math.PI/2), ypointupper: r1_YellowLow * Math.sin(angleSlice*3 - Math.PI/2)},

  {xlower: r0_YellowLow * Math.cos(angleSlice*4 - Math.PI/2), ypointlower: r0_YellowLow * Math.sin(angleSlice*4 - Math.PI/2), xupper: r1_YellowLow * Math.cos(angleSlice*4 - Math.PI/2), ypointupper: r1_YellowLow * Math.sin(angleSlice*4 - Math.PI/2)},

  {xlower: r0_YellowLow * Math.cos(angleSlice*5 - Math.PI/2), ypointlower: r0_YellowLow * Math.sin(angleSlice*5 - Math.PI/2), xupper: r1_YellowLow * Math.cos(angleSlice*5 - Math.PI/2), ypointupper: r1_YellowLow * Math.sin(angleSlice*5 - Math.PI/2)},

  {xlower: r0_YellowLow * Math.cos(angleSlice*6 - Math.PI/2), ypointlower: r0_YellowLow * Math.sin(angleSlice*6 - Math.PI/2), xupper: r1_YellowLow * Math.cos(angleSlice*6 - Math.PI/2), ypointupper: r1_YellowLow * Math.sin(angleSlice*6 - Math.PI/2)}

];

const pointsForWhiteNormal = [
  {xlower: r0_WhiteNormal * Math.cos(angleSlice*0 - Math.PI/2), ypointlower: r0_WhiteNormal * Math.sin(angleSlice*0 - Math.PI/2), xupper: r1_WhiteNormal * Math.cos(angleSlice*0 - Math.PI/2), ypointupper: r1_WhiteNormal * Math.sin(angleSlice*0 - Math.PI/2)},
  
  {xlower: r0_WhiteNormal * Math.cos(angleSlice*1 - Math.PI/2), ypointlower: r0_WhiteNormal * Math.sin(angleSlice*1 - Math.PI/2), xupper: r1_WhiteNormal * Math.cos(angleSlice*1 - Math.PI/2), ypointupper: r1_WhiteNormal * Math.sin(angleSlice*1 - Math.PI/2)},
  
  {xlower: r0_WhiteNormal * Math.cos(angleSlice*2 - Math.PI/2), ypointlower: r0_WhiteNormal * Math.sin(angleSlice*2 - Math.PI/2), xupper: r1_WhiteNormal * Math.cos(angleSlice*2 - Math.PI/2), ypointupper: r1_WhiteNormal * Math.sin(angleSlice*2 - Math.PI/2)},

  {xlower: r0_WhiteNormal * Math.cos(angleSlice*3 - Math.PI/2), ypointlower: r0_WhiteNormal * Math.sin(angleSlice*3 - Math.PI/2), xupper: r1_WhiteNormal * Math.cos(angleSlice*3 - Math.PI/2), ypointupper: r1_WhiteNormal * Math.sin(angleSlice*3 - Math.PI/2)},

  {xlower: r0_WhiteNormal * Math.cos(angleSlice*4 - Math.PI/2), ypointlower: r0_WhiteNormal * Math.sin(angleSlice*4 - Math.PI/2), xupper: r1_WhiteNormal * Math.cos(angleSlice*4 - Math.PI/2), ypointupper: r1_WhiteNormal * Math.sin(angleSlice*4 - Math.PI/2)},

  {xlower: r0_WhiteNormal * Math.cos(angleSlice*5 - Math.PI/2), ypointlower: r0_WhiteNormal * Math.sin(angleSlice*5 - Math.PI/2), xupper: r1_WhiteNormal * Math.cos(angleSlice*5 - Math.PI/2), ypointupper: r1_WhiteNormal * Math.sin(angleSlice*5 - Math.PI/2)},

  {xlower: r0_WhiteNormal * Math.cos(angleSlice*6 - Math.PI/2), ypointlower: r0_WhiteNormal * Math.sin(angleSlice*6 - Math.PI/2), xupper: r1_WhiteNormal * Math.cos(angleSlice*6 - Math.PI/2), ypointupper: r1_WhiteNormal * Math.sin(angleSlice*6 - Math.PI/2)}

];

const pointsForYellowHigh = [
  {xlower: r0_YellowHigh * Math.cos(angleSlice*0 - Math.PI/2), ypointlower: r0_YellowHigh * Math.sin(angleSlice*0 - Math.PI/2), xupper: r1_YellowHigh * Math.cos(angleSlice*0 - Math.PI/2), ypointupper: r1_YellowHigh * Math.sin(angleSlice*0 - Math.PI/2)},
  
  {xlower: r0_YellowHigh * Math.cos(angleSlice*1 - Math.PI/2), ypointlower: r0_YellowHigh * Math.sin(angleSlice*1 - Math.PI/2), xupper: r1_YellowHigh * Math.cos(angleSlice*1 - Math.PI/2), ypointupper: r1_YellowHigh * Math.sin(angleSlice*1 - Math.PI/2)},
  
  {xlower: r0_YellowHigh * Math.cos(angleSlice*2 - Math.PI/2), ypointlower: r0_YellowHigh * Math.sin(angleSlice*2 - Math.PI/2), xupper: r1_YellowHigh * Math.cos(angleSlice*2 - Math.PI/2), ypointupper: r1_YellowHigh * Math.sin(angleSlice*2 - Math.PI/2)},

  {xlower: r0_YellowHigh * Math.cos(angleSlice*3 - Math.PI/2), ypointlower: r0_YellowHigh * Math.sin(angleSlice*3 - Math.PI/2), xupper: r1_YellowHigh * Math.cos(angleSlice*3 - Math.PI/2), ypointupper: r1_YellowHigh * Math.sin(angleSlice*3 - Math.PI/2)},

  {xlower: r0_YellowHigh * Math.cos(angleSlice*4 - Math.PI/2), ypointlower: r0_YellowHigh * Math.sin(angleSlice*4 - Math.PI/2), xupper: r1_YellowHigh * Math.cos(angleSlice*4 - Math.PI/2), ypointupper: r1_YellowHigh * Math.sin(angleSlice*4 - Math.PI/2)},

  {xlower: r0_YellowHigh * Math.cos(angleSlice*5 - Math.PI/2), ypointlower: r0_YellowHigh * Math.sin(angleSlice*5 - Math.PI/2), xupper: r1_YellowHigh * Math.cos(angleSlice*5 - Math.PI/2), ypointupper: r1_YellowHigh * Math.sin(angleSlice*5 - Math.PI/2)},

  {xlower: r0_YellowHigh * Math.cos(angleSlice*6 - Math.PI/2), ypointlower: r0_YellowHigh * Math.sin(angleSlice*6 - Math.PI/2), xupper: r1_YellowHigh * Math.cos(angleSlice*6 - Math.PI/2), ypointupper: r1_YellowHigh * Math.sin(angleSlice*6 - Math.PI/2)}

];

const pointsForRedHigh = [
  {xlower: r0_RedHigh * Math.cos(angleSlice*0 - Math.PI/2), ypointlower: r0_RedHigh * Math.sin(angleSlice*0 - Math.PI/2), xupper: r1_RedHigh * Math.cos(angleSlice*0 - Math.PI/2), ypointupper: r1_RedHigh * Math.sin(angleSlice*0 - Math.PI/2)},
  
  {xlower: r0_RedHigh * Math.cos(angleSlice*1 - Math.PI/2), ypointlower: r0_RedHigh * Math.sin(angleSlice*1 - Math.PI/2), xupper: r1_RedHigh * Math.cos(angleSlice*1 - Math.PI/2), ypointupper: r1_RedHigh * Math.sin(angleSlice*1 - Math.PI/2)},
  
  {xlower: r0_RedHigh * Math.cos(angleSlice*2 - Math.PI/2), ypointlower: r0_RedHigh * Math.sin(angleSlice*2 - Math.PI/2), xupper: r1_RedHigh * Math.cos(angleSlice*2 - Math.PI/2), ypointupper: r1_RedHigh * Math.sin(angleSlice*2 - Math.PI/2)},

  {xlower: r0_RedHigh * Math.cos(angleSlice*3 - Math.PI/2), ypointlower: r0_RedHigh * Math.sin(angleSlice*3 - Math.PI/2), xupper: r1_RedHigh * Math.cos(angleSlice*3 - Math.PI/2), ypointupper: r1_RedHigh * Math.sin(angleSlice*3 - Math.PI/2)},

  {xlower: r0_RedHigh * Math.cos(angleSlice*4 - Math.PI/2), ypointlower: r0_RedHigh * Math.sin(angleSlice*4 - Math.PI/2), xupper: r1_RedHigh * Math.cos(angleSlice*4 - Math.PI/2), ypointupper: r1_RedHigh * Math.sin(angleSlice*4 - Math.PI/2)},

  {xlower: r0_RedHigh * Math.cos(angleSlice*5 - Math.PI/2), ypointlower: r0_RedHigh * Math.sin(angleSlice*5 - Math.PI/2), xupper: r1_RedHigh * Math.cos(angleSlice*5 - Math.PI/2), ypointupper: r1_RedHigh * Math.sin(angleSlice*5 - Math.PI/2)},

  {xlower: r0_RedHigh * Math.cos(angleSlice*6 - Math.PI/2), ypointlower: r0_RedHigh * Math.sin(angleSlice*6 - Math.PI/2), xupper: r1_RedHigh * Math.cos(angleSlice*6 - Math.PI/2), ypointupper: r1_RedHigh * Math.sin(angleSlice*6 - Math.PI/2)}

];


var generateRegion = d3.area() 
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
  .attr("x2", (d, ) => 220 * Math.cos(angleSlice * mapGetIndex.get(d) - Math.PI/2) )
  .attr("y2", (d, ) => 220 * Math.sin(angleSlice * mapGetIndex.get(d) - Math.PI/2) )
  .attr("class", "line")
  .style("stroke", "black")
  .style("stroke-width", "2px");

axis.append("text")
  .attr("class", "legend")
  .style("font-size", "14px")
  .style("font-weight", "bold")
  .attr("text-anchor", "middle")
  .attr("font-family", "monospace")
  .attr("dy", "-0.1em")
  .attr("x", (d, ) => 245 * Math.cos(angleSlice * mapGetIndex.get(d) - Math.PI/2))
  .attr("y", (d, ) => 245 * Math.sin(angleSlice * mapGetIndex.get(d) - Math.PI/2))
  .text(d => {
    //console.log("Printing text: ", d, typeof d);
    if (d==="Systolic BP") return "SBP";
    if (d==="Diastolic BP") return "DBP";
    if (d==="Mean Arterial Pressure Cuff Calc") return "MAP";
    if (d==="Pulse Rate") return "PR";
    if (d==="Respiratory Rate") return "RR";
    if (d==="SpO2") return "SpO2";
    if (d==="Temperature Tympanic") return "Temperature";
    else return d;
  });


const plots = container.append('g')
  .selectAll('g')
  .data([data]) //2D array: [ [7 entries] ] 
  .join('g')
    .attr("patient-id", "1")
    .attr("fill", "white")
    .attr("stroke", "black");

plots.append('path')
  .attr("d", generateRegion(pointsForRedLow)) 
  .attr("fill", "red") 
  .attr("stroke", "red")
  .attr("fill-opacity", 0.5);

plots.append('path')
  .attr("d", generateRegion(pointsForYellowLow)) 
  .attr("fill", "yellow") 
  .attr("stroke", "yellow")
  .attr("fill-opacity", 0.9);

plots.append('path')
  .attr("d", generateRegion(pointsForWhiteNormal)) 
  .attr("fill", "white") 
  .attr("stroke", "white")
  .attr("fill-opacity", 0.3); 

plots.append('path')
  .attr("d", generateRegion(pointsForYellowHigh)) 
  .attr("fill", "yellow") 
  .attr("stroke", "yellow")
  .attr("fill-opacity", 0.9);

plots.append('path')
  .attr("d", generateRegion(pointsForRedHigh)) 
  .attr("fill", "red") 
  .attr("stroke", "red")
  .attr("fill-opacity", 0.5);

plots.append('path')
  .attr("d", d => {
    console.log("printing data in path");
    console.log(d);
    return radarLine(d)
    }) // 
  .attr("fill", "white")
  .attr("fill-opacity", 0.0)
  .attr("stroke", "green")
  .attr("stroke-width", 2.5);

plots.selectAll("circle")
  .data(d => {
    console.log("In Cirles:", d);
    return d
    })
  .join("circle")
    .attr("r", dotRadius)
    .attr("cx", (d,) => d.value * Math.cos(angleSlice*mapGetIndex.get(d.axis) - Math.PI/2))
    .attr("cy", (d,) => d.value * Math.sin(angleSlice*mapGetIndex.get(d.axis) - Math.PI/2))
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

