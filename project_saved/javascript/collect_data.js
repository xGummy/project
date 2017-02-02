// globals
var universiteit = "totaal";
var temp_studie = 0;
var temp_richting = 0;
var niveau = 1;
var jaar = "2015";
var m = 2;
var margin = {top: 20, right: 30, bottom: 150, left: 100},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    radius = Math.min(width, height) / 2;
    width_chart2 = 400

var x0 = d3.scale.ordinal()
var y = d3.scale.linear()
    .range([height, 0]);

var x1 = d3.scale.ordinal()
    .domain(d3.range(m))
    .rangeBands([0, x0.rangeBand()]);

// function to put the data into the right format for the bargraph and linechart
function fetchData(data, search, richting, studie, universiteit, jaarkey = jaar) {
  var man = [];
  var vrouw = [];
  var keys = [];
  var newkeys = [];
  var loopstring_copy = [jaarkey, richting, studie, universiteit];
  var loopstring = [jaarkey, richting, studie, universiteit];

  // add keys to list
  for (var i in search){
    if (i != "totaal"){
      keys.push(i);
    }
  }
  // loop over every key and turn the wanted loopstring value into the key so it can be fetched later
  for (var key in keys){
    for (loop in loopstring){
      if (loopstring_copy[loop] == "key"){
        loopstring[loop] = keys[key];
      }
    }
    // add data to array
    if (data[loopstring[0]][loopstring[1]][loopstring[2]].hasOwnProperty(loopstring[3])){
      man.push({"key": keys[key], "value": parseInt(data[loopstring[0]][loopstring[1]][loopstring[2]][loopstring[3]]["man"]) });
      vrouw.push({"key": keys[key], "value": parseInt(data[loopstring[0]][loopstring[1]][loopstring[2]][loopstring[3]]["vrouw"]) });
      newkeys.push(keys[key]);
    }
  }

  // set domains in this function because keys only exists here !!! (fixen als het kan)
  if (loopstring_copy[3] != "key"){
    x0.domain(newkeys).rangeBands([0, width], .2);
  }
  else {
    x0.domain(newkeys).rangeBands([0, width_chart2], .2);
  }
  x1.domain(d3.range(m)).rangeBands([0, x0.rangeBand()]);
  y.domain([0, Math.max(d3.max(vrouw, function(d) {  return d.value; }), d3.max(man, function(d) {  return d.value; }))]);
  return [man, vrouw];
}

// function that determines which graph is drawn on the main chart, and changes the titles accordingly
function drawMainChart(json, niveau, richting, studie, universiteit){
  if (niveau == 1){
    // change titles
    d3.select("#title_A1")
      .html("verschillen tussen richtingen");
      d3.select("#title_A2")
      .html("alle richtingen");

    // draw chart
    var data = fetchData(json, json[jaar], "key", "totaal", universiteit);
    drawBarChart(data, niveau, richting, universiteit, svg);
  }
  if (niveau == 2){
    // change titles
    d3.select("#title_A1")
      .html("verschillen binnen richting");
      d3.select("#title_A2")
      .html("richting: " + richting);

    // draw chart
    var data = fetchData(json, json[jaar][richting], richting, "key", universiteit);
    drawBarChart(data, niveau, richting, universiteit, svg);
  }
  if (niveau == 3){
    // change titles
    d3.select("#title_A1")
      .html("verschillen binnen studie");
      d3.select("#title_A2")
      .html("studie: " + studie);

    // draw chart
    var data = [{"label": "man", "value": json[jaar][richting][studie][universiteit]["man"], "key": studie}, {"label": "vrouw", "value": json[jaar][richting][studie][universiteit]["vrouw"], "key":studie}]
    drawPieChart(data);
  }
}

// function that determines which graph is drawn on the universities chart, and changes the titles accordingly
function drawUversitiesChart(json, niveau, jaar, richting, studie){
  // change titles and collect data
  if (niveau == 1){
      d3.select("#title_C")
      .html("alle richtingen");
    data = fetchData(json, json[jaar]["totaal"]["totaal"], "totaal", "totaal", "key")
  }
  if (niveau == 2){
    d3.select("#title_B")
      .html("richting: " + richting);
    data = fetchData(json, json[jaar][richting]["totaal"], richting, "totaal", "key")
  }
  if (niveau == 3){
    d3.select("#title_B")
      .html("studie: " + studie);
    data = fetchData(json, json[jaar][richting][studie], richting, studie, "key");
  }
  // draw chart
  drawBarChart(data, niveau, richting, universiteit, svg2)
}

// function that determines which graph is drawn on the years chart, and changes the titles accordingly
function drawYearsChart(json, niveau, richting, studie, universiteit){
  // change titles and collect data
  if (niveau == 1){
      d3.select("#title_B")
      .html("alle richtingen");
    data = fetchData(json, json, "totaal", "totaal", universiteit, "key");
  }
  if (niveau == 2){
    d3.select("#title_C")
      .html("richting: " + richting);
    data = fetchData(json, json, richting, "totaal", universiteit, "key");
  }
  if (niveau == 3){
    d3.select("#title_C")
      .html("studie: " + studie);
    data = fetchData(json, json, richting, studie, universiteit, "key");
  }

  // draw chart
  DrawLineChart(data);
}


// the function drawCharts determines which graphs should be drawn on all charts
function drawCharts(niveau, jaar, richting = "totaal", studie = "totaal", universiteit = "totaal") {
  // clear all charts
  svg.selectAll("*").remove();
  svg2.selectAll("*").remove();
  svg3.selectAll("*").remove();

  // load data
  d3.json("json/datastudies_3.json", function(error, json) {
      drawMainChart(json, niveau, richting, studie, universiteit);
      drawUversitiesChart(json, niveau, jaar, richting, studie);
      drawYearsChart(json, niveau, richting, studie, universiteit);
    });
  };

  // function changeLevelColor changes the color of the levelmenu to indicate te level you are in
  function changeLevelColor(niveau){
    var buttons = ["#n1","#n2","#n3"]
    d3.selectAll(".timeline-centered .timeline-entry .timeline-entry-inner .timeline-icon.bg-success")
     .style("background-color","lightgrey");
      d3.select(buttons[niveau - 1])
     .style("background-color", "#00a651");
    }
