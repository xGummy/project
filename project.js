var man_totaal_economie = 0
var jaren = ["2011", "2012", "2013", "2014", "2015"]
d3.json("datastudies.json", function(data){
  data1 = data["2011"]["economie"];
  console.log(data1);
  for (i in data1){
    var obj = data1[i];
    for (var prop in obj) {
      obj2 = obj[prop];
      for (var prop2 in obj2){
        man_totaal_economie = man_totaal_economie + obj2["man"];

      }
      }
  }
  console.log(man_totaal_economie/2);
})
