// script2.js
// Example pie chart using D3.js

const salesData = [
    { region: "Region A", sales: 25000 },
    { region: "Region B", sales: 35000 },
    { region: "Region C", sales: 42000 },
];

// Set the dimensions of the chart
const width = 500;
const height = 300;
const radius = Math.min(width, height) / 2;

// Create an SVG element
const svg = d3.select("#graph2-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create a group for the pie chart
const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Define the color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Define the pie layout
const pie = d3.pie()
    .value(d => d.sales);

// Generate the pie chart slices
const arcs = g.selectAll(".arc")
    .data(pie(salesData))
    .enter()
    .append("g")
    .attr("class", "arc");

// Create the pie chart arcs
arcs.append("path")
    .attr("d", d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
    )
    .attr("fill", d => color(d.data.region));

// Add labels for pie chart slices
arcs.append("text")
    .attr("transform", d => `translate(${d3.arc().centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data.region);

// Add a legend
const legend = svg.selectAll(".legend")
    .data(salesData.map(d => d.region))
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(0,${i * 20})`);

legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", (d, i) => color(i));

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(d => d);
