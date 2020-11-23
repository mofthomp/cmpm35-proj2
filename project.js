
    function init(myData) {

    console.log("Hi");
    console.log(myData);
    
    
    
    


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
        .attr('transform', `translate(${margin}, ${margin})`);
        //console.log(svg)
    
    let yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 5]);

    let xScale = d3.scaleBand()
        .range([0, width])
        .domain(["Thurs", "Fri", "Sat", "Sun"]);
  
    // console.log(myData.map(d => height - yScale(d.Focus))) // debug heigh binding
  
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
        .attr("opacity", 0.4)
        .attr("fill", d => colors[d.Date])
        .on('mouseover', function(e, d, i) {
          console.log(e)
          console.log(d, i)
          console.log(this)
      
          d3.select(this).transition()
            .duration("200")
            .attr("fill", "orange")
        })
        .on('mouseout', function(e, d, i){
           d3.select(this).transition()
             .duration("200")
             .attr("fill", d => colors[d.Date])
      
      
    }
        )
      
  
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
    

}
