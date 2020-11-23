function zoom(svg) {
    const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
    // margin refers to viewport margins?
    console.log('hello')
    svg.call(d3.zoom() // calls and defines zoom behavior
        .scaleExtent([1, 8]) // set the allowed scale range
        .translateExtent(extent) //set the extent of the zoomzble world
        .extent(extent) // set extent of viewpoint
        .on("zoom", zoomed) // listen for zoom events (typenames, [listener])
        // if listener is present, sets event listener for typenames and returns zoom behavior
        // if typename is "zoom", event is after a change to the zoom transform (like on mousemove)
    );
    
    function zoomed(event) { // this is the event that happens when "zoom" happens
        xScale.range([margin.left, width - margin.right].map(d => event.transform.applyX(d))) 
        // x.range becomes the result of transformation
        svg.selectAll(".bars rect") // for each selected element, selects the decedant elements that match selector string
            .attr("x", d => x(d.Date)) 
            .attr("width", xScale.bandwidth())
        svg.selectAll(".x-axis")
            .call(xAxis)
    }
}

//x = f(i)
xScale = d3.scaleBand() 
    .domain(["Thurs", "Fri", "Sat", "Sun"]) 
    .range([margin.left, width - margin.right])
    .padding(0.1)

//y = f(n)
yScale = d3.scaleLinear() // new continuous scale with specified domain and range
    .domain([0, d3.max(data, d => d.focus)]).nice() // goes from 0 to max y and rounds values
    .range([height - margin.bottom, margin.top])

//xAxis = f(g)
xAxis = g => g
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickSizeOuter(0)) // creates new bottom axis with x as a scale
    // tickSizeOuter(0) sets outer tick to 0 and returns axis
    // outer ticks are part of domain path and determined by scale's domain extent
    // 0 suppresses square ends of domain path, producing straight line

//yAxis = f(g)
yAxis = g => g 
    .attr("transform", `translate(${margin.left}, 0)`) // translates axis to edge of viewport?
    .call(d3.axisLeft(yScale)) // new left axis with y as scale
    .call(g => g.select(".domain").remove())