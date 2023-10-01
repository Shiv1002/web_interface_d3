// script1.js
// Example bar chart using D3.js
console.log('1 started')
const salesData = [
    {"region": "Canada", "sales":2496006},
    {"region": "France", "sales":2432150},
    {"region": "Germany", "sales":2346560},
    {"region": "Mexico", "sales":2094935},
    {"region": "United States of America", "sales":2502983}  
];

// Set the dimensions of the chart
const width = 500;
const height = 500;

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

console.log('2 started')

const radius = Math.min(width, height) / 2;

// Create an SVG element
const svg2 = d3.select("#graph2-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create a group for the pie chart
const g = svg2.append("g")
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
const legend = svg2.selectAll(".legend")
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
