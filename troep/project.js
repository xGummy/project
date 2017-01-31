// Emma van Proosdij 10663657
window.onload = function() {

  var sections = ['economie', 'gedrag en maatschappij', 'gezondheidszorg', 'natuur', 'recht', 'taal en cultuur', 'landbouw en natuurlijke omgeving', 'sectoroverstijgend', 'techniek']
  var n = 9, // number of samples
      m = 2; // number of series

  var margin = {top: 20, right: 30, bottom: 100, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var y = d3.scale.linear()
      .range([height, 0]);

  var x0 = d3.scale.ordinal()
      .domain(sections)
      .rangeBands([0, width], .2);

  var x1 = d3.scale.ordinal()
      .domain(d3.range(m))
      .rangeBands([0, x0.rangeBand()]);

  var z = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom")


  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("datastudies_pretty.json", function(error, json) {
    var data1 = json["2015"]
    var studies = []
    for (var i in data1["economie"]){
      studies.push(i);
    }
    console.log(studies);
    var data_man = [];
    var data_vrouw = [];
    for (var section in sections){
      data_man.push({"richting": sections[section], "aantal": data1[sections[section]]["totaal binnen richting"]["totaal"]["man"] })
      data_vrouw.push({"richting": sections[section], "aantal": data1[sections[section]]["totaal binnen richting"]["totaal"]["vrouw"] })
    }
    var data2 = [data_man, data_vrouw];
    console.log(data2);
    y.domain([0, d3.max(data2, function(d, i) { return d[i].aantal; })]);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );


  svg.append("g")
  .attr("class", "bargroup")
  .selectAll("g")
      .data(data2)
    .enter().append("g")
    .attr("class", "bar")
    .style("fill", function(d, i) { return z(i); })
    .attr("transform", function(d, i) { return "translate(" + x1(i) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("height", function(d) {return height - y(d.aantal)})
    .attr("x", function(d) { return x0(d.richting); })
    .attr("y", function(d) { return y(d.aantal)});
      })

};
