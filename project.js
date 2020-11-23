//idea would be a scatterplot with time x axis, attention y axis. days in different colors. mouse over to see what the activity was

function init(myData) {

    console.log("hi");
    //console.log(myData);
    
    

    


    const margin = 80;
    let width = 1000 - 2 * margin;
    let height = 400 - 2 * margin;
    let colors = { Thurs: 'red', Fri: '#ffa400', Sat: 'green', Sun: '#740079'};
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
        .attr('transform', `translate(${margin}, ${margin})`);
        //console.log(svg)
    
    let yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 5]);

    let xScale = d3.scaleBand()
        .range([0, width])
        .domain(["Thurs", "Fri", "Sat", "Sun"])
        .padding(0.1)

    chart.append('g')
        .call(d3.axisLeft(yScale));

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    chart.selectAll("bars")
        .data(myData)
        .enter()
        .append("rect")
    
    
        //.attr("x", d => { return (width / 4) * day_num[d.Date] + 20 + xScale(d.Time)})
        .attr("x", d => {return xScale(d.Date) + parseHour(d.Time)*(width/96)})
        .attr("y", d => { return yScale(d.Focus)})
        .attr("height", d => { return height - yScale(d.Focus)})
        .attr("width", 8)
       /* .attr("opacity", 0.4)
        .attr("fill", d => colors[d.Date])
        .on('mouseover', function(e, d) {
            d3.select('#tooltip').text((d.Activity))
        });*/
    
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

   //xAxis = f(g)
   xAxis = g => g
       .attr("transform", `translate(0, ${height - margin})`)
       .call(d3.axisBottom(xScale).tickSizeOuter(0)) // creates new bottom axis with x as a scale
       // tickSizeOuter(0) sets outer tick to 0 and returns axis
       // outer ticks are part of domain path and determined by scale's domain extent
       // 0 suppresses square ends of domain path, producing straight line
   

    zoom(chart)
    
    function zoom(svg) {
        const extent = [[margin, margin], [width - margin, height - margin]];
        // margin refers to viewport margins?
        svg.call(d3.zoom() // calls and defines zoom behavior
            .scaleExtent([1, 8]) // set the allowed scale range
            .translateExtent(extent) //set the extent of the zoomzble world
            .extent(extent) // set extent of viewpoint
            .on("zoom", zoomed) // listen for zoom events (typenames, [listener])
            // if listener is present, sets event listener for typenames and returns zoom behavior
            // if typename is "zoom", event is after a change to the zoom transform (like on mousemove)
        );
        
        function zoomed(event) { // this is the event that happens when "zoom" happens
            xScale.range([margin, width - margin].map(d => event.transform.applyX(d))) 
            // x.range becomes the result of transformation
            
            chart.selectAll("bars") // for each selected element, selects the decedant elements that match selector string
                .attr("x", d => xScale(d.Date))
                .attr("width", 14)
                console.log('ee')
            svg.selectAll(".x-axis")
                .call(xAxis)
            console.log('zoomed')
        }
    
        function updateChart() {

            // recover the new scale
            var newX = d3.event.transform.rescaleX(x);
            //var newY = d3.event.transform.rescaleY(y);
        
            // update axes with these new boundaries
            xAxis.call(d3.axisBottom(newX))
            yAxis.call(d3.axisLeft(newY))
        
            // update circle position
            bars
              .selectAll("bar")
              .attr('cx', function(d) {return newX(d.Sepal_Length)})
              //.attr('cy', function(d) {return newY(d.Petal_Length)});
          } 
    }
}
