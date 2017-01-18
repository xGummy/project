// Emma van Proosdij 10663657
window.onload = function() {

  var jaar = "2011"
  var sections = ['economie', 'gedrag en maatschappij', 'gezondheidszorg', 'natuur', 'recht', 'taal en cultuur', 'landbouw en natuurlijke omgeving', 'sectoroverstijgend', 'techniek']
      m = 2; // number of series

  var margin = {top: 20, right: 30, bottom: 100, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
      radius = Math.min(width, height) / 2;

  var arc = d3.svg.arc()
      .outerRadius(radius - 40)
      .innerRadius(0);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

  var y = d3.scale.linear()
      .range([height, 0]);

  var x0 = d3.scale.ordinal()
      .domain(sections)
      .rangeBands([0, width], .2);

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

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("svg:g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  prepareData(1, jaar);
  function prepareData(niveau, jaar, richting = "alle", studie = "alle") {
    svg.selectAll("*").remove();
    d3.json("datastudies_pretty.json", function(error, json) {
    if (niveau == 2){
    var data1 = json[jaar]
    var keys = []
    for (var i in data1[richting]){
      if (i != "totaal binnen richting"){
      keys.push(i);
      }
    }
    x0.domain(keys).rangeBands([0, width], .2);
    x1.domain(d3.range(m)).rangeBands([0, x0.rangeBand()]);
    console.log(keys);
    var man = [];
    var vrouw = [];
    for (var key in keys){
      man.push({"key": keys[key], "value": parseInt(data1[richting][keys[key]]["totaal binnen studie"]["man"]) })
      vrouw.push({"key": keys[key], "value": parseInt(data1[richting][keys[key]]["totaal binnen studie"]["vrouw"]) })
    }
    var data3 = [man, vrouw];
    console.log(data3);
    drawBarChart(data3, 2, richting);
  }
  if (niveau == 1){
    var data1 = json[jaar]
    var man = [];
    var vrouw = [];
    for (var section in sections){
      man.push({"key": sections[section], "value": data1[sections[section]]["totaal binnen richting"]["totaal"]["man"] })
      vrouw.push({"key": sections[section], "value": data1[sections[section]]["totaal binnen richting"]["totaal"]["vrouw"] })
    }
    var data2 = [man, vrouw];
    drawBarChart(data2, 1);
  }
  if (niveau == 3){
    var data1 = json[jaar]
    var data2 = [{"label": "man", "value": data1[richting][studie]["totaal binnen studie"]["man"]}, {"label": "vrouw", "value": data1[richting][studie]["totaal binnen studie"]["vrouw"]}]
    console.log(data2);

    var g = svg.append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
      .selectAll(".arc")
        .data(pie(data2))
        .enter().append("g")
        .attr("class", "arc")

    // append arc
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) { return z(i); });
  }
});
};

function drawBarChart(data3, niveau, richting = "alle"){
  y.domain([0, d3.max(data3, function(d, i) { return d[i].value; })]);

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
    .attr("transform", "rotate(-90)" )
    .on("mouseover", function(d) {
      d3.select(this).style("fill", "blue");
    })
    .on("mouseout", function(d) {
      d3.select(this).style("fill", "black");
    })
    .on("click", function(d) {
      if (niveau == 1){
      prepareData(2, jaar, d)
    }
    if (niveau == 2){
    prepareData(3, jaar, richting, d)
  }
    })

svg.append("g")
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
    d3.select(this).style("fill", "red");
  })
  .on("mouseout", function(d) {
    d3.select(this).style("fill", function(d, i) { return z(i); });
  })
}

}
