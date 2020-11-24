function init(myData) {

    //console.log(myData);
    
    

    


    const margin = 80;
    let width = 1000 - 2 * margin;
    let height = 400 - 2 * margin;
    let colors = { Thurs: 'red', Fri: 'blue', Sat: 'green', Sun: '#740079'};
    let svg = d3.select('svg');
    let day_num = { Thurs: 0, Fri: 1, Sat: 2, Sun:3};

    let parseHour = function(time, S){
        let formatter = d3.timeFormat("%H");
        let parser = d3.timeParse("%I %p")
        let i = parser(time);
        i = formatter(i)
        i = parseInt(i)
        return i;
      }

    let chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`)

    
    let yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 5]);

    let xScale = d3.scaleBand()
        .range([0, width])
        .domain(["Thurs", "Fri", "Sat", "Sun"])


    chart.append('g')
        .call(d3.axisLeft(yScale));

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .attr("class", "x-axis")
        .call(d3.axisBottom(xScale).tickSizeOuter(0));

    chart.selectAll("bars")
        .data(myData)
        .enter()
        .append("rect")
    
    
        .attr("x", d => {return xScale(d.Date) + parseHour(d.Time)*(width/96)})
        .attr("y", d => { return yScale(d.Focus)})
        .attr("height", d => { return height - yScale(d.Focus)})
        .attr("width", 8)
        .attr("opacity", 0.4)
        .attr("fill", d => colors[d.Date])
        
        .on('mouseover', function(e, d, i) {
          /*console.log(e)
          console.log(d, i)
          console.log(this)*/
          let this_act = d.Activity
          d3.select('#tooltip').text((d.Activity))
          d3.selectAll("rect").transition()
            .filter(d => {return d.Activity == this_act})
            //console.log(this_act)
            .duration("200")
            .attr("fill", "orange")
        })
        .on('mouseout', function(e, d, i){
           let this_act = d.Activity
           d3.selectAll("rect").transition()
            //.filter(d => {return d.Activity == this_act})
            .duration("50")
            .attr("fill", d => colors[d.Date])})
    
    const xText = svg.append("text")
        .attr("x", width / 2 + 80)
        .attr("y", 370)
        .attr("text-anchor","middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "24px")
        .attr("fill", "black")
        .text("Time");
      
    const yText = svg.append("text")
        .attr("x", height / 2 - 80)
        .attr("y", 30)
        //.attr("text-anchor","middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "24px")
        .attr("fill", "black")
        //.attr("transform", "translate(0,0) rotate()")
        .attr("transform", "translate(10,300) rotate(-90)")
        .text("Focus Level");
    
    /*
     var zoom = d3.zoom()
        .scaleExtent([.5, 20])
        .extent([0,0], [width, height])
        .on("zoom", zoomed) // listen for zoom events (typenames, [listener])
                // if listener is present, sets event listener for typenames and returns zoom behavior
                // if typename is "zoom", event is after a change to the zoom transform (like on mousemove)
            
        function zoomed(event) { // this is the event that happens when "zoom" happens
            var newX = d3.event.transform.rescaleX(x)
            xAxis.call(d3.axisBottom(newX))
            console.log("zoom")
    }
    */
    zoom(chart)
    
    function zoom(svg) {
        const extent = [[0, 0], [width, height]];
        svg.call(d3.zoom() // calls and defines zoom behavior
            .scaleExtent([1, 7]) // set the allowed scale range
            .translateExtent(extent) //set the extent of the zoomable world
            .extent(extent) // set extent of viewpoint
            .on("zoom", zoomed) // listen for zoom events (typenames, [listener])
            // if listener is present, sets event listener for typenames and returns zoom behavior
            // if typename is "zoom", event is after a change to the zoom transform (like on mousemove)
        );
        
        function zoomed(event) { // this is the event that happens when "zoom" happens
            console.log("before", xScale.range())
            xScale.range([0, width].map(d => event.transform.applyX(d))) 
            // x.range becomes the result of transformation
            console.log("after", xScale.range())
            chart.selectAll("rect") 
                .attr("x", d => xScale(d.Date) + (parseHour(d.Time))*(xScale.bandwidth()/24))
                .attr("width", (xScale.bandwidth()/24)-(xScale.bandwidth()/24/8))
            console.log(xScale.bandwidth())
            
            chart.selectAll(".x-axis")
                .attr("class", "x-axis")
                .call(d3.axisBottom(xScale).tickSizeOuter(0));
        }
    }
}