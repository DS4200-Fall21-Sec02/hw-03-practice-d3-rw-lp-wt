// write your javascript code here.
// feel free to change the preset attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// first visualization
let svg1 = d3.select('#vis1')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

let data1 = d3.csv("data/cars.csv"),function(row){
  //console.log(row)
  return{
    Car: row.Car,
    Origin: row.Origin, 
    Horsepower: +row.Horsepower
    
  }}.then(function(data)){
    //console.log(data)
  }
  d3.csv("data/cars.csv", function(data){
   // Removing headers from the data 
    var subgroups = data.columns.slice(1)

  // X-axis initialization (Car Maker)
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));

  // Y-axis initialization (Horsepower)
  var y = d3.scaleLinear()
    .domain([0, 40])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Adding on scale for the subgroup, being country of origin 
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])
     // Show the bars
  svg.append("g")
  .selectAll("g")
  // Enter in data = loop group per group
  .data(data)
  .enter()
  .append("g")
    .attr("transform", function(d) { return "translate(" + x(d.group) + ",0)"; })
  .selectAll("rect")
  .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
  .enter().append("rect")
    .attr("x", function(d) { return xSubgroup(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", xSubgroup.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d) { return color(d.key); });
  }}

// second visualization
let svg2 = d3.select('#vis2')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '100%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', '#ccc') // change the background color to light gray
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

let data2 = d3.csv("data/grad_rates.csv"),function(row){
    //console.log(row)
    return{
      School_Name: row.School_Name,
      All_Subgroups_Percentage_Graduated: +row.All_Subgroups_Percentage_Graduated
      
    }}.then(function(data)){
      //console.log(data)
    }
    d3.csv("data/grad_rates.csv", function(data){
      // Removing headers from the data 
       var subgroups = data.columns.slice(1)

  function(data) {

    // X-axis initialization: Year (2012-2020)
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y-axis initliazation: Graduation Rate % (Among all subgroups in Tempe schools)
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Physical addition of the line for the chart 
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.value) })
        .y(function(d) { return y(d.value) })
        )

})






