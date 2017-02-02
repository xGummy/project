
  var	parseDate = d3.time.format("%Y").parse;
  var formatTime = d3.time.format("%Y");

  var	x_line = d3.time.scale().range([0, 400]);
  var	y_line = d3.scale.linear().range([height, 0]);

  var	xAxis_line = d3.svg.axis().scale(x_line)
    .orient("bottom").ticks(5);

  var	yAxis_line = d3.svg.axis().scale(y_line)
    .orient("left").ticks(5);

  var	valueline = d3.svg.line()
    .x(function(d) { return x_line(d.key); })
    .y(function(d) { return y_line(d.value); });

  var arc = d3.svg.arc()
      .outerRadius(radius - 40)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });


  var z = d3.scale.ordinal()
      .range(["steelblue", "#ff1a8c"])

  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#chart_A")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg2 = d3.select("#chart_B")
  .attr("width", 400 + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg3 = d3.select("#chart_C")
    .attr("width", 400 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<span style='color:black'>" + d.key + "</span>" + "<br><strong>aantal meisjes:</strong> <span style='color:white'>" + d.value + "</span>";
    });

  var tip_man = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<span style='color:black'>" + d["key"] + "</span>" + "<br><strong>aantal jongens:</strong> <span style='color:white'>" + d.value + "</span>";
    });

    svg.call(tip);
    svg.call(tip_man);

    // function that draws pie chart
  function drawPieChart(data, studie){
      // display if no data available
      if (data[0].value + data[1].value == 0){
        var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .append("text")
        .style("text-anchor", "middle")
        .text("deze studie heeft geen studenten in " + jaar);
      }
      else {
        var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")

        // append arc
        g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return z(i); })
        .on("mouseover", function(d) {
          d3.select(this).style("fill-opacity", 0.8);
          // display tooltips on hover
          if (d3.select(this).style("fill") == "rgb(70, 130, 180)"){
            d.key = d.data.key;
            tip_man.show(d);
          }
          else{
            d.key = d.data.key;
            tip.show(d);
          }
        })
        .on("mouseout", function(d) {
          d3.select(this).style("fill-opacity", 1);
          tip.hide(d);
          tip_man.hide(d);
        });
      }
    }


  // function that draws linechart
  function DrawLineChart(data){
      svg3.selectAll("*").remove();

      // format data
      data[0].forEach(function(d) {
        d.key = parseDate(d.key);
        d.value = +d.value;
      });
      data[1].forEach(function(d) {
        d.key = parseDate(d.key);
        d.value = +d.value;
      });

    // set domains
    x_line.domain(d3.extent(data[1], function(d) { return d.key; }));
    y_line.domain([0, Math.max(d3.max(data[1], function(d) { return d.value; }), d3.max(data[0], function(d) { return d.value; }))]);

    // add lines
    svg3.append("path")
      .attr("class", "line")
      .attr("id", "male_line")
      .attr("d", valueline(data[0]));

    svg3.append("path")
      .attr("class", "line")
      .attr("id", "female_line")
      .attr("d", valueline(data[1]));

    // add scatterplots
    svg3.selectAll("dot")
        .data(data[0])
        .enter().append("circle")
          .attr("r", 4)
          .attr("cx", function(d) { return x_line(d.key); })
          .attr("cy", function(d) { return y_line(d.value); })
          .style("fill", "steelblue")
          .on("mouseover", function(d) {
            // display tooltip on hover
            d3.select(this).style("fill-opacity", 0.8);
            if (typeof(d.key) != "string"){
              d.key = formatTime(d.key);
            };
            tip_man.show(d);
          })
          .on("mouseout", function(d) {
            d3.select(this).style("fill-opacity", 1);
            tip_man.hide(d);
          });

    svg3.selectAll("dot")
      .data(data[1])
        .enter().append("circle")
        .attr("r", 4)
        .attr("cx", function(d) { return x_line(d.key); })
        .attr("cy", function(d) { return y_line(d.value); })
        .style("fill", "#ff1a8c")
        .on("mouseover", function(d) {
          d3.select(this).style("fill-opacity", 0.8);
          if (typeof(d.key) != "string"){
            d.key = formatTime(d.key);
          };
          tip.show(d)
        })
        .on("mouseout", function(d) {
          d3.select(this).style("fill-opacity", 1);
          tip.hide(d);
        });

    // add x axis
    svg3.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis_line);

    // add y axis
    svg3.append("g")
      .attr("class", "y axis")
      .call(yAxis_line);
    }

    function drawBarChart(data3, niveau, richting = "alle", universiteit, chart = svg){
      // add y axis
      chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

      chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-45)" )
        .on("mouseover", function(d) {
          d3.select(this).style("fill", "blue");
        })
        .on("mouseout", function(d) {
          d3.select(this).style("fill", "black");
        })
        .on("click", function(d) {
          // display data of next level when clicked
          if (chart == svg){
            if (niveau == 1){
              temp_richting = d;
              changeLevelColor(niveau+1);
              drawCharts(niveau+1, jaar, d, "totaal", universiteit);
            }
            if (niveau == 2){
              temp_studie = d;
              changeLevelColor(niveau+1);
              drawCharts(niveau+1, jaar, richting, d, universiteit);
            }
          }
        })

      chart.append("g")
        .attr("class", "bargroup")
        .selectAll("g")
        .data(data3)
          .enter().append("g")
          .attr("class", "bars")
          .style("fill", function(d, i) { return z(i); })
          .attr("transform", function(d, i) { return "translate(" + x1(i) + ",0)"; })
          .selectAll("rect")
          .data(function(d) { return d; })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("height", function(d) {return height - y(d.value)})
            .attr("x", function(d) { return x0(d.key); })
            .attr("y", function(d) { return y(d.value)})
              .style("fill-opacity", function(d) {
                // make univerity bars light if one is selected
                if (chart == svg2 && universiteit != "totaal" && d.key != universiteit){
                  return 0.4
                }
              })
            .on("mouseover", function(d) {
              d3.select(this).style("fill-opacity", 0.8);
              // show tooltips
              if (d3.select(this).style("fill") == "rgb(70, 130, 180)"){
                tip_man.show(d);
              }
              else{
                tip.show(d);
              }
            })
            .on("mouseout", function(d) {
              if (chart == svg2 && universiteit != d.key && universiteit != "totaal"){
                d3.select(this).style("fill-opacity", 0.4);
              }
              else{
                d3.select(this).style("fill-opacity", 1);
              }
              tip_man.hide(d);
              tip.hide(d);
            })
            .on("click", function(d) {
              // diplay data of next level when clicked
              if (chart == svg){
                if (niveau == 1){
                  temp_richting = d.key;
                  changeLevelColor(niveau+1);
                  drawCharts(niveau+1, jaar, d.key, "totaal", universiteit);
                  tip.hide(d);
                  tip_man.hide(d);
                }
                if (niveau == 2){
                  temp_studie = d.key;
                  changeLevelColor(niveau+1);
                  drawCharts(niveau+1, jaar, richting, d.key, universiteit);
                  tip.hide(d);
                  tip_man.hide(d);
                }
              }
            })
          }
