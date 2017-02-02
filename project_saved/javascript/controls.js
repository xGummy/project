window.onload = function() {
// load first data
$(".type").click(function(){
   $(".type").removeClass("active");
   $(this).addClass("active");
});
drawCharts(1, jaar, "totaal", "totaal", universiteit);

  // set onclick events for the first button
  d3.select("#n1")
    .on("click", function(){
      // go to level 1
      changeLevelColor(1);
      drawCharts(1, jaar, "totaal", "totaal", universiteit);
    })
    .style("background-color", function(){
      if (niveau == 1){
        return "#00a651"
      }
    })
    .on("mouseover", function() {
        d3.select(this).style("border", "2px solid black");
      })
    .on("mouseout", function() {
        d3.select(this).style("border", "none");
    });

    // set onclick events for the second button
    d3.select("#n2")
      .on("click", function(){
        // make sure a 'richting' is selected
        if (temp_richting == 0)
        {
          alert("kies een richting op de barchart om naar het volgende niveau te gaan");
        }
        else {
        // display data of level 3
          changeLevelColor(2);
          drawCharts(2, jaar, temp_richting, "totaal", universiteit);
        }
      })
      .on("mouseover", function() {
          d3.select(this).style("border", "2px solid black");
        })
      .on("mouseout", function() {
          d3.select(this).style("border", "none");
      })

      // set onclick events for the third button
      d3.select("#n3")
        .on("click", function(){
          // make sure a 'studie' is selected
          if (temp_studie == 0 || universiteit != "totaal")
          {
            alert("kies een richting en studie op de barchart om naar het volgende niveau te gaan");
          }
          else {
          // display data of level 3
            changeLevelColor(3);
            drawCharts(3, jaar, temp_richting, temp_studie, universiteit);
          }
        })
        .on("mouseover", function() {
            d3.select(this).style("border", "2px solid black");
          })
        .on("mouseout", function() {
            d3.select(this).style("border", "none");
        })

      // make the year buttons responsive
      d3.selectAll(".btn.btn-default")
        .on("click", function(){
          jaar = this.getAttribute("id");
          drawCharts(1, jaar, "totaal", "totaal", universiteit);
          changeLevelColor(1);
        });

    // set up search function
    d3.json("json/datastudies_values.json", function(error, json) {
      var data = json;
        //load names for search function
        $("#studie").select2({
          data: data,
          placeholder: 'zoek studie'
        })

        // go to correct data when selected
        $('#studie').on('select2:select', function (evt) {
        temp_richting = evt.params.data.id;
        temp_studie = evt.params.data.text;
        changeLevelColor(3);
        drawCharts(3, jaar, evt.params.data.id, evt.params.data.text, "totaal");
      });
    });

    // set up universities selector
    $("#universiteit").select2();

    // go to correct data when selected
    $('#universiteit').on('select2:select', function (evt) {
      if (evt.params.data.text != "alle universiteiten"){
        universiteit = evt.params.data.text;
        d3.select("#studie_title").html("studie zoeken kan alleen binnen alle universiteiten");
        $("#studie").select2('enable', false);
      }
      else{
        universiteit = "totaal";
        d3.select("#studie_title").html("zoek studie");
        d3.select("#studie")[0][0].disabled = false;
      }
      drawCharts(1, jaar, "totaal", "totaal", universiteit)
      changeLevelColor(1);
      // ajust titles
      d3.select("#title_A3")
        .html(evt.params.data.text);
      d3.select("#title_C1")
        .html(evt.params.data.text);
    });
}
