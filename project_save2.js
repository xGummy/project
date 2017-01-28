// Emma van Proosdij 10663657
window.onload = function() {

  var temp_richting;
  var niveau = 1;
  var jaar = "2015"
      m = 2; // number of series

  var	parseDate = d3.time.format("%Y").parse;

  var margin = {top: 20, right: 30, bottom: 150, left: 50},
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
      radius = Math.min(width, height) / 2;

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

  var y = d3.scale.linear()
      .range([height, 0]);

  var x0 = d3.scale.ordinal()

  var x1 = d3.scale.ordinal()
      .domain(d3.range(m))
      .rangeBands([0, x0.rangeBand()]);

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
      return "<span style='color:black'>" + d.key + "</span>" + "<br><strong>aantal jongens:</strong> <span style='color:white'>" + d.value + "</span>";
    });


  svg.call(tip);
  svg.call(tip_man);



    //Variable to hold autocomplete options
    var keys;

    //Load US States as options from CSV - but this can also be created dynamically
    d3.csv("names.csv",function (csv) {
        keys=csv;
        start();
    });


    //Call back for when user selects an option
    function onSelect(d) {
      temp_richting = d.richting
      changeLevelColor(3);
      prepareData(3, jaar, d.richting, d.studie, "totaal");
    }

    //Setup and render the autocomplete
    function start() {
        var mc = autocomplete(document.getElementById('test'))
                .keys(keys)
                .dataField("studie")
                .placeHolder("zoek studie")
                .width(960)
                .height(500)
                .onSelected(onSelect)
                .render();
    }



function changeLevelColor(niveau){
  var buttons = ["#n1","#n2","#n3"]
  d3.selectAll(".timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-success")
  .style("background-color","lightgrey");
  d3.select(buttons[niveau - 1])
  .style("background-color", "#00a651");
}
  d3.select("#n1")
    .on("click", function(){
      changeLevelColor(1);
      prepareData(niveau, jaar);
    })
    .style("background-color", function(){if (niveau == 1){return "#00a651"}});

    d3.select("#n2")
      .on("click", function(){
        changeLevelColor(2);
        prepareData(2, jaar, temp_richting)
      })


  prepareData(niveau, jaar);

  d3.selectAll(".btn.btn-default")
    .on("click", function(){
      jaar = this.getAttribute("id");
      prepareData(1, jaar);
      changeLevelColor(1);
    });

  function prepareData(niveau, jaar, richting = "totaal", studie = "totaal", universiteit = "totaal") {
    svg.selectAll("*").remove();
    d3.json("datastudies_3.json", function(error, json) {
      prepareDataUversities(json, niveau, jaar, richting, studie);
      prepareDataYears(json, niveau, richting, studie, universiteit);
      prepareDataMain(json, niveau, jaar, richting, studie, universiteit);
      });
    };

  function prepareDataMain(json, niveau, jaar, richting, studie, universiteit){
    if (niveau == 1){
      d3.select("#title_A1")
        .html("verschillen tussen richtingen");
        d3.select("#title_A2")
        .html("alle richtingen");
      var data = fetchData(json, json[jaar], "totaal", "key", "totaal", "totaal",jaar);
      drawBarChart(data, niveau, richting, universiteit, svg);
    }
    if (niveau == 2){
      d3.select("#title_A1")
        .html("verschillen binnen richting");
        d3.select("#title_A2")
        .html("richting: " + richting);
      data = fetchData(json, json[jaar][richting], "totaal", richting, "key", "totaal",jaar);
      drawBarChart(data, niveau, richting, universiteit, svg);
    }
    if (niveau == 3){
      d3.select("#title_A1")
        .html("verschillen binnen studie");
        d3.select("#title_A2")
        .html("studie: " + studie);
      var data = [{"label": "man", "value": json[jaar][richting][studie]["totaal"]["man"]}, {"label": "vrouw", "value": json[jaar][richting][studie]["totaal"]["vrouw"]}]
      drawPieChart(data);
    }
  }
  function prepareDataYears(json, niveau, richting, studie, universiteit){

    if (niveau == 1){
        d3.select("#title_B")
        .html("alle richtingen");
      data = fetchData(json, json, "none", "totaal", "totaal", universiteit, "key", jaar);
    }
    if (niveau == 2){
      d3.select("#title_C")
        .html("richting: " + richting);
      data = fetchData(json, json, "none", richting, "totaal", universiteit, "key", jaar);
    }
    if (niveau == 3){
      d3.select("#title_C")
        .html("studie: " + studie);
      data = fetchData(json, json, "none", richting, studie, universiteit, "key", jaar);
    }
    DrawLineChart(data);
}

  function prepareDataUversities(json, niveau, jaar, richting, studie){
    svg2.selectAll("*").remove();
    if (niveau == 1){
        d3.select("#title_C")
        .html("alle richtingen");
      data = fetchData(json, json[jaar]["totaal"]["totaal"], "totaal", "totaal", "totaal", "key", jaar)
    }
    if (niveau == 2){
      d3.select("#title_B")
        .html("richting: " + richting);
      data = fetchData(json, json[jaar][richting]["totaal"], "totaal", richting, "totaal", "key" , jaar)
    }
    if (niveau == 3){
      d3.select("#title_B")
        .html("studie: " + studie);
      data = fetchData(json, json[jaar][richting][studie], "totaal", richting, studie, "key", jaar);
    }
    drawBarChart(data, niveau, richting = "totaal", "totaal", svg2)
  }

  function fetchData(data, search, avoid, richting, studie, universiteit, jaar) {
      var man = [];
      var vrouw = [];
      var keys = []
      jaar_oud = jaar;
      richting_oud = richting;
      studie_oud = studie;
      universiteit_oud = universiteit
      for (var i in search){
        if (i != avoid){
          keys.push(i);
        }
      }
      for (var key in keys){
        if (universiteit_oud == "key")
        {
          universiteit = keys[key];
        }
        if (jaar_oud == "key")
        {
          jaar = keys[key];
        }
        if (studie_oud == "key")
        {
          studie = keys[key];
        }
        if (richting_oud == "key")
        {
          richting = keys[key];
        }
      man.push({"key": keys[key], "value": parseInt(data[jaar][richting][studie][universiteit]["man"]) })
      vrouw.push({"key": keys[key], "value": parseInt(data[jaar][richting][studie][universiteit]["vrouw"]) })
      }
      data = [man, vrouw];
      bla = [0,1];
      if (universiteit_oud == "totaal"){
        x0.domain(keys).rangeBands([0, width], .2);
      }
      else {
        x0.domain(keys).rangeBands([0, 400], .2);
      }
      x1.domain(d3.range(m)).rangeBands([0, x0.rangeBand()]);
      y.domain([0, Math.max(d3.max(vrouw, function(d) {  return d.value; }), d3.max(man, function(d) {  return d.value; }))]);
      return data;

  }

  function drawPieChart(data){
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
        tip.show(d);
      })
      .on("mouseout", function(d) {
        d3.select(this).style("fill-opacity", 1);
        tip.hide(d);
      });
}

function DrawLineChart(data){
  svg3.selectAll("*").remove();
  data[0].forEach(function(d) {
    d.key = parseDate(d.key);
    d.value = +d.value;
  });
  data[1].forEach(function(d) {
    d.key = parseDate(d.key);
    d.value = +d.value;
  });
  x_line.domain(d3.extent(data[1], function(d) { return d.key; }));
  y_line.domain([0, Math.max(d3.max(data[1], function(d) { return d.value; }), d3.max(data[0], function(d) { return d.value; }))]);

  svg3.append("path")		// Add the valueline path.
    .attr("class", "line")
    .attr("id", "male_line")
    .attr("d", valueline(data[0]));

  svg3.append("path")		// Add the valueline path.
    .attr("class", "line")
    .attr("id", "female_line")
    .attr("d", valueline(data[1]));

    svg3.selectAll("dot")
        .data(data[0])
    .enter().append("circle")
        .attr("r", 4)
        .attr("cx", function(d) { return x_line(d.key); })
        .attr("cy", function(d) { return y_line(d.value); })
        .style("fill", "steelblue")
        .on("mouseover", function(d) {
            tip_man.show(d);})
        .on("mouseout", function(d) {
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
        tip.show(d)
      })
      .on("mouseout", function(d) {
          tip.hide(d);
      });

  svg3.append("g")			// Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis_line);

  svg3.append("g")			// Add the Y Axis
    .attr("class", "y axis")
    .call(yAxis_line);
  }

function drawBarChart(data3, niveau, richting = "alle", universiteit, chart = svg){

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
      if (niveau == 1){
      temp_richting = d;
      changeLevelColor(niveau+1);
      prepareData(niveau+1, jaar, d, "totaal", universiteit);
      }
      if (niveau == 2){
        changeLevelColor(niveau+1);
        prepareData(niveau+1, jaar, richting, d, universiteit);
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
  .on("mouseover", function(d) {
    d3.select(this).style("fill-opacity", 0.8);
    if (d3.select(this).style("fill") == "rgb(70, 130, 180)"){
      tip_man.show(d);
    }
    else{
      tip.show(d);
    }
  })
  .on("mouseout", function(d) {
    d3.select(this).style("fill-opacity", 1);
    tip.hide(d);
    tip_man.hide(d);
  })
  .on("click", function(d) {
    if (niveau == 1){
    temp_richting = d.key;
    changeLevelColor(niveau+1);
    prepareData(niveau+1, jaar, d.key, "totaal", universiteit);
    tip.hide(d);
    }
    if (niveau == 2){
      changeLevelColor(niveau+1);
      prepareData(niveau+1, jaar, richting, d.key, universiteit);
      tip.hide(d);
    }
  })
}

}
