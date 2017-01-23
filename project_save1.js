// Emma van Proosdij 10663657
window.onload = function() {

  var jaar = "2015"
      m = 2; // number of series

  var	parseDate = d3.time.format("%Y").parse;

  var margin = {top: 20, right: 30, bottom: 100, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
      radius = Math.min(width, height) / 2;

  var	x_line = d3.time.scale().range([0, width]);
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
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var svg3 = d3.select("#chart_C")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  prepareData(1, jaar);

  d3.selectAll(".uni")
    .on("click", function(){
      jaar = this.getAttribute("id");
      prepareData(1, jaar);
    });

  function prepareData(niveau, jaar, richting = "alle", studie = "alle", universiteit = "alle universiteiten") {
    svg.selectAll("*").remove();
    d3.json("datastudies_pretty.json", function(error, json) {
      prepareDataUversities(json, niveau, jaar, richting, studie);
      prepareDataYears(json, niveau, richting, studie, universiteit);
      prepareDataMain(json, niveau, jaar, richting, studie, universiteit);
      });
    };

  function prepareDataMain(json, niveau, jaar, richting, studie, universiteit){
    if (niveau == 1){
      var data = fetchData(json, json[jaar], "totaal binnen jaar", "key", "totaal binnen richting", "totaal");
      drawBarChart(data, niveau, richting, universiteit, svg);
    }
    if (niveau == 2){
      data = fetchData(json, json[jaar][richting], "totaal binnen richting", richting, "key", "totaal binnen studie");
      drawBarChart(data, niveau, richting, universiteit, svg);
    }
    if (niveau == 3){
      var data = [{"label": "man", "value": json[jaar][richting][studie]["totaal binnen studie"]["man"]}, {"label": "vrouw", "value": json[jaar][richting][studie]["totaal binnen studie"]["vrouw"]}]
      drawPieChart(data);
    }
  }
  function prepareDataYears(json, niveau, richting, studie, universiteit){

    if (niveau == 1){
      data = fetchData(json, json, "none", "totaal binnen jaar", "alle studies", universiteit, "key");
    }
    if (niveau == 2){
      if (universiteit == "alle universiteiten"){
        universiteit = "totaal"
      }
      data = fetchData(json, json, "none", richting, "totaal binnen richting", universiteit, "key");
    }
    if (niveau == 3){
      if (universiteit == "alle universiteiten"){
        universiteit = "totaal binnen studie"
      }
      data = fetchData(json, json, "none", richting, studie, universiteit, "key");
    }
    DrawLineChart(data);
}

  function prepareDataUversities(json, niveau, jaar, richting, studie){
    if (niveau == 1){
      svg2.selectAll("*").remove();
      data = fetchData(json, json[jaar]["totaal binnen jaar"]["alle studies"], "alle universiteiten", "totaal binnen jaar", "alle studies", "key")
    }
    if (niveau == 2){
      svg2.selectAll("*").remove();
      data = fetchData(json, json[jaar][richting]["totaal binnen richting"], "totaal", richting, "totaal binnen richting", "key")
    }
    if (niveau == 3){
      svg2.selectAll("*").remove();
      data = fetchData(json, json[jaar][richting][studie], "totaal binnen studie", richting, studie, "key");
    }
    drawBarChart(data, niveau, richting = "alle", "alle", svg2)
  }

  function fetchData(data, search, avoid, richting, studie, universiteit, jaar = "2015") {
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
          console.log(jaar);
        }
        if (studie_oud == "key")
        {
          studie = keys[key];
          console.log(studie);
        }
        if (richting_oud == "key")
        {
          richting = keys[key];
        }
      man.push({"key": keys[key], "value": parseInt(data[jaar][richting][studie][universiteit]["man"]) })
      vrouw.push({"key": keys[key], "value": parseInt(data[jaar][richting][studie][universiteit]["vrouw"]) })
      }
      data = [man, vrouw];
      x0.domain(keys).rangeBands([0, width], .2);
      x1.domain(d3.range(m)).rangeBands([0, x0.rangeBand()]);
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
      .style("fill", function(d, i) { return z(i); });
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

  svg3.append("g")			// Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis_line);

  svg3.append("g")			// Add the Y Axis
    .attr("class", "y axis")
    .call(yAxis_line);
  }

function drawBarChart(data3, niveau, richting = "alle", universiteit, chart = svg){
  y.domain([0, d3.max(data3, function(d, i) { return d[i].value; })]);

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
    .attr("transform", "rotate(-90)" )
    .on("mouseover", function(d) {
      d3.select(this).style("fill", "blue");
    })
    .on("mouseout", function(d) {
      d3.select(this).style("fill", "black");
    })
    .on("click", function(d) {
      if (niveau == 1){
      prepareData(2, jaar, d, "alle", universiteit)
      }
      if (niveau == 2){
        prepareData(3, jaar, richting, d, universiteit)
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
  })
  .on("mouseout", function(d) {
    d3.select(this).style("fill-opacity", 1);
  })
}

}
