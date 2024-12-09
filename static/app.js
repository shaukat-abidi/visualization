// Example data for the bar graphs
var melbourneData = [5, 10, 15, 20, 25];
var sydneyData = [7, 14, 21, 28, 35];
var barColors = ["red", "green", "yellow", "orange", "grey"];
var increaseAmount = 20; 


var barWidth = 8;
var barSpacing = 0.1;

// Coordinates for Melbourne and Sydney
var melbourneLatLng = [-37.8136, 144.9631];
var sydneyLatLng = [-33.8688, 151.2093];


// mapid is the id of the div where the map will appear
var map = L
    .map('mapid')
    .setView(sydneyLatLng, 5);   // center position + zoom

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 6,
}).addTo(map);

// Add a svg layer to the map
// L.svg().addTo(map);
var melbourneSvg = L.svg().addTo(map);
var sydneySvg = L.svg().addTo(map);

// Convert to pixel coordinates
var melbournePoint = map.latLngToLayerPoint(melbourneLatLng);
var sydneyPoint = map.latLngToLayerPoint(sydneyLatLng);

// Select the SVG layer for Melbourne and draw bars
d3.select("#mapid .leaflet-overlay-pane svg")
  .selectAll("rect.melbourneBar")
  .data(melbourneData)
  .enter()
  .append("rect")
    .attr("class", "melbourneBar")
    .attr("x", function(d, i) { return melbournePoint.x + (i * (barWidth + barSpacing)); })
    .attr("y", function(d) { return melbournePoint.y - d; }) // Subtract 'd' to grow bars upwards
    .attr("width", barWidth)
    .attr("height", function(d) { return d; })
    .attr("style", "pointer-events: auto;")
    .style("fill", function(d, i) { return barColors[i]; }) // Set color based on index
    .on("mouseover", function(event, d) {
        d3.select(this)
          .transition() // Smooth transition
          .duration(100) // Duration in milliseconds
          .attr("y", function(d) { return melbournePoint.y - d - increaseAmount; }) // Move up
          .attr("height", function(d) { return d + increaseAmount; }); // Increase height
    })
    .on("mouseout", function(event, d) {
        d3.select(this)
          .transition() // Smooth transition
          .duration(100) // Duration in milliseconds
          .attr("y", function(d) { return melbournePoint.y - d; }) // Return to original position
          .attr("height", function(d) { return d; }); // Return to original height
    });

// Add similar code for Sydney, adjusting the class, data, and positions
// Select the SVG layer for Melbourne and draw bars
d3.select("#mapid .leaflet-overlay-pane svg")
  .selectAll("rect.sydneyBar")
  .data(sydneyData)
  .enter()
  .append("rect")
    .attr("class", "sydneyBar")
    .attr("x", function(d, i) { return sydneyPoint.x + (i * (barWidth + barSpacing)); })
    .attr("y", function(d) { return sydneyPoint.y - d; }) // Subtract 'd' to grow bars upwards
    .attr("width", barWidth)
    .attr("height", function(d) { return d; })
    .attr("style", "pointer-events: auto;")
    .style("fill", function(d, i) { return barColors[i]; }); // Set color based on index
    
// Select the svg area and add circles:
/*
d3.select("#mapid")
    .select("svg")
    .selectAll("circle")
    .data(markers)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x; })
    .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y; })
    .attr("r", 14)
    .style("fill", "red")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("fill-opacity", .4)
    .attr("style", "pointer-events: auto;")
    .on("mouseover", function (event, d) {
        console.log("Mouseover detected");
        d3.select(this)
        .style("fill", "green")
        .attr("r", 20); 
    })
    .on("mouseout", function (event, d) {
        console.log("Mouseover out");
        d3.select(this).style("fill", "red").attr("r", 14);; 
    });
// Function that update circle position if something change
function update() {
    d3.selectAll("circle")
        .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
        .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
}

// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update);
*/

map.on("moveend", function() {
    // Recalculate Melbourne and Sydney points
    var newMelbournePoint = map.latLngToLayerPoint(melbourneLatLng);
    var newSydneyPoint = map.latLngToLayerPoint(sydneyLatLng);
  
    // Update positions of Melbourne bars
    d3.selectAll(".melbourneBar")
      .attr("x", function(d, i) { return newMelbournePoint.x + (i * (barWidth + barSpacing)); })
      .attr("y", function(d) { return newMelbournePoint.y - d; });
  
    // Similar update for Sydney bars
    d3.selectAll(".sydneyBar")
      .attr("x", function(d, i) { return newSydneyPoint.x + (i * (barWidth + barSpacing)); })
      .attr("y", function(d) { return newSydneyPoint.y - d; });
  });
  
