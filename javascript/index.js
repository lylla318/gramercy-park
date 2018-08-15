

$(document).ready(function() {

  d3.csv("data-processing/gramercy_parcel_data.csv", function(data) {
    formatData(data);
  })


  function formatData(completeData) {

    var gramercyBuildings = [];
    d3.csv("data/gramercy-bbl.csv",function(data){
      for (var i = 0 ; i < data.length ; i++) {
        gramercyBuildings.push(data[i].BBLE)
      }
    });

    var gramercyBins = [];
    d3.csv("data-processing/output/gramercy_parcel_data.csv",function(data){
      for (var i = 0 ; i < data.length ; i++) {
        //console.log(data[i].bin_no)
        gramercyBins.push(data[i].bin_no)
      }
    });

    var adjacentBins = [];
    d3.csv("data-processing/output/adjacent_parcel_data.csv",function(data){
      for (var i = 0 ; i < data.length ; i++) {
        //console.log(data[i].bin_no)
        adjacentBins.push(data[i].bin_no)
      }
    });

    var stuyvesantBins = [];
    d3.csv("data-processing/output/stuyvesant_parcel_data.csv",function(data){
      for (var i = 0 ; i < data.length ; i++) {
        //console.log(data[i].bin_no)
        stuyvesantBins.push(data[i].bin_no)
      }
    });

    var adjacentBuildings = [];
    d3.csv("data/adjacent-bbl.csv",function(data){
      for (var i = 0 ; i < data.length ; i++) {
        adjacentBuildings.push(data[i].BBLE)
      }
    });

    var parcelTXCL = {};
    fileNames = ["data/gramercy.csv", "data/adjacent.csv", "data/gramercy_neighborhood.csv"]
    for (let fileName of fileNames) {
      d3.csv(fileName,function(data){
        for (var i = 0 ; i < data.length ; i++) {          
          parcelTXCL[(data[i].BBLE).toString()] = data[i].TXCL;
          if(i === 8565) {
            startDrawing(completeData);
          }
        }
      });
    }

    function startDrawing(completeData) {
      var data = completeData;
      dataByBin = {}
      for (var i = 0 ; i < data.length ; i++) {
        if(data[i]["bin"]) {
          dataByBin[(data[i]["bin"]).toString()] = data[i]
        }
      }

      d3.json("map-data/gramercy_buildings.json",function(data){
        drawMap(data, dataByBin, gramercyBuildings, adjacentBuildings, parcelTXCL, gramercyBins, adjacentBins, stuyvesantBins);
      });

    }

    // console.log("TXCL DATA: ", parcelTXCL);

  }


  function drawMap(gramercy, dataByBin, gramercyBuildings, adjacentBuildings, parcelTXCL, gramercyBins, adjacentBins, stuyvesantBins) {

    var margin = {top: 5, right: 5, bottom: 5, left: 5};
    var width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;
    var strokeColor = "#000"

    var gramercyFeatures = topojson.feature(gramercy,gramercy.objects.gramercy_buildings);

    var max_area   = d3.max( gramercyFeatures.features, function(d) { 
      return d.properties.shape_area; 
    });


    var svg = d3.select(".map")
        .append("svg")
          .attr("class", "map")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) { 
        address = "";
        if(d.properties.hnum_hi === d.properties.hnum_lo) {
          address = d.properties.hnum_lo + " " + d.properties.str_name;
        } else if (! d.properties.hnum_hi || !d.properties.hnum_lo) {
          address = d.properties.str_name;
        } else {
          address = d.properties.hnum_lo + "-" + d.properties.hnum_hi + " " + d.properties.str_name;
        }
        return "Block: " + d.properties.block 
        + "<br>" + "Lot: " + d.properties.lot  
        + "<br>" + "BIN: " + d.properties.bin 
        + "<br>" + "TXCL: " + d.properties.TXCL
        + "<br>" + "Address: " + address; 
      });

    svg.append("rect")
      .attr("width","100%")
      .attr("height","100%")
      .attr("fill","#FFFFFF")
      .style("cursor","pointer")
    
    svg.call(tool_tip);
    
    var path = d3.geoPath()
        .projection(d3.geoAlbersUsa()
        .fitSize([width-margin.top, height-margin.top], gramercyFeatures));
   
    addData(gramercyBins, adjacentBins, stuyvesantBins);

   function addData(gramercyBins, adjacentBins, stuyvesantBins) {
      // console.log(dataByBin)

      // ADD THE SCRAPED DATA //
      var fields = ["bbl", "block", "lot", "bin_no", "hnum_lo", "hnum_hi", "str_name", "condo_no", "coop_no"]
      for(var i = 0 ; i < gramercyFeatures.features.length ; i++) {
        for (var j = 0 ; j < fields.length ; j++ ) {
          var key = fields[j]
          var tmp = gramercyFeatures.features[i].properties

          if(tmp && tmp.bin && dataByBin[tmp.bin] && dataByBin[tmp.bin][key]) {
            gramercyFeatures.features[i].properties[key] = dataByBin[tmp.bin][key];
          }          
        }
        var tmpBBL = gramercyFeatures.features[i].properties["bbl"];
        if(parcelTXCL[tmpBBL]) {
          gramercyFeatures.features[i].properties["TXCL"] = parcelTXCL[tmpBBL];
        } else {
          console.log("not there.")
        }

      }

      addFeatures(gramercyBins, adjacentBins, stuyvesantBins);

    }

    function addFeatures(gramercyBins, adjacentBins, stuyvesantBins) {
      console.log(gramercyBins)
      var bins = []
      var nyPaths = svg.selectAll(".gramercy-buildings")
          .data(gramercyFeatures.features)
          .enter().append("path")
            .attr("id","building")
            .attr("d", function(d) { 
              //bins.push(d.properties.bin);
              return path(d); })
            .style("stroke-width", 1)
            .style("stroke", "#000")
            .style("cursor", "pointer")
            .style("fill", function(d) {
              var parcel = d.properties;
              if(gramercyBins.includes(String(parcel.bin))) {
                return "#fd8d3c"
              } else if (adjacentBins.includes(String(parcel.bin)) || String(parcel.bin) === "1017945") {
                return "#253494"
              } else if (stuyvesantBins.includes(String(parcel.bin))) {
                return "#8c6bb1"
              }
              return "#ddd";

              
            })
            .on("mouseover", function(d) {
              tool_tip.show(d)
            })
            .on("mouseout", tool_tip.hide)
            .on("click", function(d) {
              //$(".output").append(", " + d.properties.bin)
            })


      // ADD TITLE //

      // svg.append("text")             
      //   .attr("transform",
      //         "translate(10,70)")
      //   // .style("text-anchor", "middle")
      //   .style("font-size", 24)
      //   .style("font-weight", "bold")
      //   .style("font-family","MarkPro")
      //   .style("font-family","GT-America")
      //   .text("GRAMERCY PARK" );

      svg.append("text")             
        .attr("transform",
              "translate(300,470) rotate(15)")
        .style("font-size", 11)
        .style("font-weight", "bold")
        .style("font-family","MarkPro")
        .style("font-family","GT-America")
        .text("GRAMERCY PARK" ); 

      svg.append("text")             
        .attr("transform",
              "translate(510,860) rotate(-75)")
        .style("font-size", 11)
        .style("font-weight", "bold")
        .style("font-family","MarkPro")
        .style("font-family","GT-America")
        .text("STUYVESANT PARK" );

      // ADD STREETS //

      d3.json("map-data/gramercy_streets.json",function(streets){
        var gramercyStreets = topojson.feature(streets,streets.objects.gramercy_streets);
        var streets = d3.geoPath()
          .projection(d3.geoAlbersUsa()
          .fitSize([width-margin.top, height-margin.top], gramercyStreets));
        var streetShapes = svg.selectAll(".streets")
          .data(gramercyStreets.features)
          .enter().append("path")
            .attr("d", function(d) { 
              return path(d); })
            .style("stroke-width", 1)
            .style("stroke", "#000")
            .style("fill", "none")
      });

    }


  }

});
