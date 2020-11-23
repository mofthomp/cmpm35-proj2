//idea would be a scatterplot with time x axis, attention y axis. days in different colors. mouse over to see what the activity was

function init(myData) {

    console.log("hi");
    //console.log(myData);
    
    
    
    


    const margin = 80;
    let width = 700 - 2 * margin;
    let height = 400 - 2 * margin;
    let colors = { Thurs: 'red', Fri: '#ffa400', Sat: 'green', Sun: '#740079'};
    let svg = d3.select('svg');

    let chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
        //console.log(svg)
    
    let yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 5]);
    let xScale = d3.scaleBand()
        .range([0, width])
        .domain(["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM"]);
    chart.append('g')
        .call(d3.axisLeft(yScale));

    chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
    chart.selectAll("circle")
        .data(myData)
        .enter()
        .append("circle")
        .attr("cx", d => { return 20 + xScale(d.Time) })
        .attr("cy", d => { return yScale(d.Focus)})
        .attr("r", 7)
        .attr("opacity", 0.4)
        .attr("fill", d => colors[d.Date])
        .on('mouseover', function(e, d) {
            d3.select('#tooltip').text((d.Activity))
        });
  
   function mousehover(svg) {
          
 
       /*.bar{
  fill: orange;
}*/
        

        .bar:hover {
        fill: orangered ;
         }

        .x.axis path {
        display: none;
         }
    
    
    
    
    
    function zoom(svg) {
  const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

  svg.call(d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent(extent)
      .extent(extent)
      .on("zoom", zoomed));

    
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

