jaar = "2015";
d3.json("datastudies_3.json", function(error, json) {
  console.log(json);
    var data = fetchData(json, json[jaar], "key", "totaal", "totaal");
    console.log(data);
  });

// function to put the data into the right format for the bargraph and linechart
function fetchData(data, search, richting, studie, universiteit) {
  var man = [];
  var vrouw = [];
  var keys = [];
  var loopstring_copy = [richting, studie, universiteit];
  var loopstring = [richting, studie, universiteit];

  for (var i in search){
    if (i != "totaal"){
      keys.push(i);
    }
  }
  for (var key in keys){
    for (loop in loopstring){
      if (loopstring_copy[loop] == "key"){
        loopstring[loop] = keys[key];
      }
    }
    man.push({"key": keys[key], "value": parseInt(data[jaar][loopstring[0]][loopstring[1]][loopstring[2]]["man"]) })
    vrouw.push({"key": keys[key], "value": parseInt(data[jaar][loopstring[0]][loopstring[1]][loopstring[2]]["vrouw"]) })
  }
  return [man, vrouw];
}

function DrawMainChart(json, niveau, richting, studie, universiteit){
  if (niveau == 1){
    d3.select("#title_A1")
      .html("verschillen tussen richtingen");
      d3.select("#title_A2")
      .html("alle richtingen");
    var data = fetchData(json, json[jaar], "totaal", "key");
    drawBarChart(data, niveau, richting, universiteit, svg);
  }
  if (niveau == 2){
    d3.select("#title_A1")
      .html("verschillen binnen richting");
      d3.select("#title_A2")
      .html("richting: " + richting);
    var data = fetchData(json, json[jaar][richting], richting, "key", "totaal");
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

console.log(blub);
