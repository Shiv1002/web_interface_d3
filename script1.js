// script1.js
// Example bar chart using D3.js

const salesData = [
    { region: "Region A", sales: 25000 },
    { region: "Region B", sales: 35000 },
    { region: "Region C", sales: 42000 },
];

// Set the dimensions of the chart
const width = 500;
const height = 300;

// Create an SVG element
const svg = d3.select("#graph1-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Define the scales
const xScale = d3.scaleBand()
    .domain(salesData.map(d => d.region))
    .range([0, width])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(salesData, d => d.sales)])
    .nice()
    .range([height, 0]);

// Create the bars
svg.selectAll(".bar")
    .data(salesData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.region))
    .attr("y", d => yScale(d.sales))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.sales));

// Add labels
svg.selectAll("text")
    .data(salesData)
    .enter()
    .append("text")
    .text(d => d.sales)
    .attr("x", d => xScale(d.region) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.sales) - 10)
    .attr("text-anchor", "middle");

// Add axes
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));
