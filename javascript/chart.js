


// var margin = {top: 60, right: 50, bottom: 100, left: 70},
//     width = 500,
//     height = 210;

var margin = {top: 60, right: 50, bottom: 100, left: 70},
    width = 500,
    height = 210;

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)



svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#FFFFFF");

g = svg.append("g")
    .attr("transform",
          "translate(" + margin.left + "," + (margin.top+20) + ")");



var propertyGroups = ["class1", "condos", "coops", "rentals"];
var groupDict = {"class1":"Single Family Homes", "condos":"Condos", "coops":"Coops", "rentals":"Rentals"};


drawLineChart(propertyGroups[2]);
//drawBarChart();

function drawBarChart() {

  // set the ranges
  var x = d3.scaleBand()
      .range([0, width-150])
      .padding(0.1);
  var y = d3.scaleLinear()
      .range([height, 0]).nice();

  // get the data
  d3.csv("bar_chart_1.csv", function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
      d.tx_sq = +d.tx_sq;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.group; }));
    y.domain([0, (d3.max(data, function(d) { return d.tx_sq; }) + 2)]);

    // append the rectangles for the bar chart
    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.group); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.tx_sq); })
        .attr("height", function(d) { return height - y(d.tx_sq); })
        .attr("fill", function(d) {
          if(d.group.includes("Adjacent")) {
            return "#36454f";
          } else {
            return "#DAA520";
          }
        });

    // add the x Axis
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .remove()

    // add the y Axis
    g.append("g")
        .call(d3.axisLeft(y).ticks(12));

    g.append("path")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("d", "M24 224 L 24 235 L 68 235 L 68 224");

    g.append("path")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("d", "M110 224 L 110 235 L 154 235 L 154 224");

    g.append("path")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("d", "M197 224 L 197 235 L 240 235 L 240 224");

    g.append("path")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("d", "M283 224 L 283 235 L 327 235 L 327 224");

    // text label for the y axis
    svg.append("text")             
      .attr("transform",
            "translate(30,180) rotate(-90)")
      .style("text-anchor", "middle")
      .style("font-size", 12) 
      .style("font-weight", "bold")
      .style("font-family","MarkPro")
      .text("Average tax per sq. ft. ($)");

    // chart title
    svg.append("text")             
      .attr("transform",
            "translate(240,10)")
      .style("text-anchor", "middle")
      .style("font-size", 14)
      .style("font-weight", "bold")
      .style("font-family","MarkPro")
      .text("2018 Taxes on Properties With and Without Park Access");

    // text label for the x axis
    svg.append("text")             
      .attr("transform",
            "translate(117,330)")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-family","MarkPro")
      .text("condos");

    // text label for the x axis
    svg.append("text")             
      .attr("transform",
            "translate(202,330)")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-family","MarkPro")
      .text("single-family");

    // text label for the x axis
    svg.append("text")             
      .attr("transform",
            "translate(288,330)")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-family","MarkPro")
      .text("rentals");

    // text label for the x axis
    svg.append("text")             
      .attr("transform",
            "translate(375,330)")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-family","MarkPro")
      .text("coops");

    var img = g.append("svg:image")
      .attr("xlink:href", "images/has_key.svg")
      .attr("width", 27)
      .attr("height", 27)
      .attr("x", 280)
      .attr("y",-45);

    svg.append("text")             
      .attr("transform",
            "translate(388,50)")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-family","MarkPro")
      .text("=");

    svg.append("rect")
      .attr("width",12)
      .attr("height",12)
      .attr("x",400)
      .attr("y",41)
      .attr("fill","#DAA520")

    var img = g.append("svg:image")
      .attr("xlink:href", "images/no_key2.svg")
      .attr("width", 30)
      .attr("height", 30)
      .attr("x", 280)
      .attr("y",-10);

    svg.append("text")             
      .attr("transform",
            "translate(388,90)")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-family","MarkPro")
      .text("=");

    svg.append("rect")
      .attr("width",12)
      .attr("height",12)
      .attr("x",400)
      .attr("y",81)
      .attr("fill","#36454f")

    // text label for the x axis
    svg.append("text")             
      .attr("transform",
            "translate(250,360)")
      .style("text-anchor", "middle")
      .style("font-size", 12)
      .style("font-weight", "bold")
      .style("font-family","MarkPro")
      .text("Property Group");










    // Set-up the export button
    d3.select('#saveButton').on('click', function(){
      console.log("here")
      var svgString = getSVGString(svg.node());
      svgString2Image( svgString, 2*(width+margin.left+margin.right), 2*(height+margin.top+margin.bottom), 'jpeg', save ); // passes Blob and filesize String to the callback

      function save( dataBlob, filesize ){
        saveAs( dataBlob, 'D3 vis exported to PNG.png' ); // FileSaver.js function
      }
    });


    // Below are the functions that handle actual exporting:
    // getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
    function getSVGString( svgNode ) {
      svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
      var cssStyleText = getCSSStyles( svgNode );
      appendCSS( cssStyleText, svgNode );

      var serializer = new XMLSerializer();
      var svgString = serializer.serializeToString(svgNode);
      svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
      svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

      return svgString;

      function getCSSStyles( parentElement ) {
        var selectorTextArr = [];

        // Add Parent element Id and Classes to the list
        selectorTextArr.push( '#'+parentElement.id );
        for (var c = 0; c < parentElement.classList.length; c++)
            if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
              selectorTextArr.push( '.'+parentElement.classList[c] );

        // Add Children element Ids and Classes to the list
        var nodes = parentElement.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
          var id = nodes[i].id;
          if ( !contains('#'+id, selectorTextArr) )
            selectorTextArr.push( '#'+id );

          var classes = nodes[i].classList;
          for (var c = 0; c < classes.length; c++)
            if ( !contains('.'+classes[c], selectorTextArr) )
              selectorTextArr.push( '.'+classes[c] );
        }

        // Extract CSS Rules
        var extractedCSSText = "";
        for (var i = 0; i < document.styleSheets.length; i++) {
          var s = document.styleSheets[i];
          
          try {
              if(!s.cssRules) continue;
          } catch( e ) {
                if(e.name !== 'SecurityError') throw e; // for Firefox
                continue;
              }

          var cssRules = s.cssRules;
          for (var r = 0; r < cssRules.length; r++) {
            if ( contains( cssRules[r].selectorText, selectorTextArr ) )
              extractedCSSText += cssRules[r].cssText;
          }
        }
        

        return extractedCSSText;

        function contains(str,arr) {
          return arr.indexOf( str ) === -1 ? false : true;
        }

      }

      function appendCSS( cssText, element ) {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type","text/css"); 
        styleElement.innerHTML = cssText;
        var refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore( styleElement, refNode );
      }
    }


    function svgString2Image( svgString, width, height, format, callback ) {
      var format = format ? format : 'png';

      var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      var image = new Image();
      image.onload = function() {
        context.clearRect ( 0, 0, width, height );
        context.drawImage(image, 0, 0, width, height);
        // context.fillStyle = "white"

        canvas.toBlob( function(blob) {
          var filesize = Math.round( blob.length/1024 ) + ' KB';
          if ( callback ) callback( blob, filesize );
        });

        
      };

      image.src = imgsrc;
    }

















   

  });


}




function drawLineChart(group) {

  var parseTime = d3.timeParse("%Y");

  var x = d3.scaleTime()
    .rangeRound([0, width]);

  var y = d3.scaleLinear()
    .rangeRound([height, 0]);

  var gramLine = d3.line()
    .x(function(d) { 
      return x(parseTime(d.year)); })
    .y(function(d) { 
      return y(d.val); });

  var adjLine = d3.line()
    .x(function(d) { 
      return x(parseTime(d.year)); })
    .y(function(d) { 
      return y(d.val); });

  var stuyLine = d3.line()
    .x(function(d) { 
      return x(parseTime(d.year)); })
    .y(function(d) { 
      return y(d.val); });

  d3.json("yearly-data.json", function(d) {
    var gramGroup = d.gramercy[group];
    var adjGroup  = d.adjacent[group];
    var stuyGroup = d.stuyvesant[group];
    var minClass1 = d3.min( [ (d3.extent(gramGroup, function(d) { return d.val; }))[0], (d3.extent(adjGroup, function(d) { return d.val; }))[0], (d3.extent(stuyGroup, function(d) { return d.val; }))[0] ] )
    var maxClass1 = d3.max( [ (d3.extent(gramGroup, function(d) { return d.val; }))[1], (d3.extent(adjGroup, function(d) { return d.val; }))[1], (d3.extent(stuyGroup, function(d) { return d.val; }))[1] ] )

    x.domain(d3.extent(gramGroup, function(d) { return parseTime(d.year); }));
    y.domain([minClass1, maxClass1]);

    

    //console.log(d3.extent(gramGroup, function(d) { return parseTime(d.year); }))
    
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "rotate(-20)")
        .style("text-anchor", "end");

    g.append("g")
        .call(d3.axisLeft(y))

    g.append("path")
        .datum(gramGroup)
        .attr("fill", "none")
        .attr("stroke", "#fd8d3c")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", gramLine);

    g.append("path")
        .datum(adjGroup)
        .attr("fill", "none")
        .attr("stroke", "#253494")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", adjLine);

    g.append("path")
        .datum(stuyGroup)
        .attr("fill", "none")
        .attr("stroke", "#8c6bb1")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", stuyLine);

     // text label for the x axis
      svg.append("text")             
        .attr("transform",
              "translate(" + (width/2 + 65) + " ," + 
                             (height + margin.top + 65 ) + ")")
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .style("font-weight", "bold")
        .style("font-family","MarkPro")
        .text("Year");

      // text label for the y axis
      svg.append("text")             
        .attr("transform",
              "translate(25,185) rotate(-90)")
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .style("font-weight", "bold")
        .style("font-family","MarkPro")
        .text("Average tax per sq. ft. ($)");

      // chart title
      svg.append("text")             
        .attr("transform",
              "translate(" + (width/2 + 70) + " ," + 
                             35 + ")")
        .style("text-anchor", "middle")
        .style("font-size", 14)
        .style("font-weight", "bold")
        .style("font-family","MarkPro")
        .text("Taxes on " + groupDict[group] );

      // text label for the y0 axis
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 25)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", 12)
        .style("font-weight", "bold")
        .style("font-family","MarkPro")
        .text("Average Resale Profit");  


      svg.append("rect")
        .attr("width", 8)
        .attr("height",8)
        .attr("x", 80)
        .attr("y",60)
        .attr("stroke","none")
        .attr("fill", "#fd8d3c")

      svg.append("text")
        .attr("fill", "#000")
        .attr("x",175)
        .attr("y", 67)
        .attr("font-size", "12px")
        .attr("text-anchor", "end")
        .text("Gramercy-facing");

      svg.append("rect")
        .attr("width", 8)
        .attr("height",8)
        .attr("x", 190)
        .attr("y",60)
        .attr("stroke","none")
        .attr("fill", "#253494")

      svg.append("text")
        .attr("fill", "#000")
        .attr("x",280)
        .attr("y", 68)
        .attr("font-size", "12px")
        .attr("text-anchor", "end")
        .text("1-3 blocks away");

      svg.append("rect")
        .attr("width", 8)
        .attr("height",8)
        .attr("x", 295)
        .attr("y",60)
        .attr("stroke","none")
        .attr("fill", "#8c6bb1")

      svg.append("text")
        .attr("fill", "#000")
        .attr("x",395)
        .attr("y", 68)
        .attr("font-size", "12px")
        .attr("text-anchor", "end")
        .text("Stuyvesant-facing");






    // Set-up the export button
    d3.select('#saveButton').on('click', function(){
      console.log("here")
      var svgString = getSVGString(svg.node());
      svgString2Image( svgString, 2*(width+margin.left+margin.right), 2*(height+margin.top+margin.bottom), 'jpeg', save ); // passes Blob and filesize String to the callback

      function save( dataBlob, filesize ){
        saveAs( dataBlob, 'D3 vis exported to PNG.png' ); // FileSaver.js function
      }
    });


    // Below are the functions that handle actual exporting:
    // getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
    function getSVGString( svgNode ) {
      svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
      var cssStyleText = getCSSStyles( svgNode );
      appendCSS( cssStyleText, svgNode );

      var serializer = new XMLSerializer();
      var svgString = serializer.serializeToString(svgNode);
      svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
      svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

      return svgString;

      function getCSSStyles( parentElement ) {
        var selectorTextArr = [];

        // Add Parent element Id and Classes to the list
        selectorTextArr.push( '#'+parentElement.id );
        for (var c = 0; c < parentElement.classList.length; c++)
            if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
              selectorTextArr.push( '.'+parentElement.classList[c] );

        // Add Children element Ids and Classes to the list
        var nodes = parentElement.getElementsByTagName("*");
        for (var i = 0; i < nodes.length; i++) {
          var id = nodes[i].id;
          if ( !contains('#'+id, selectorTextArr) )
            selectorTextArr.push( '#'+id );

          var classes = nodes[i].classList;
          for (var c = 0; c < classes.length; c++)
            if ( !contains('.'+classes[c], selectorTextArr) )
              selectorTextArr.push( '.'+classes[c] );
        }

        // Extract CSS Rules
        var extractedCSSText = "";
        for (var i = 0; i < document.styleSheets.length; i++) {
          var s = document.styleSheets[i];
          
          try {
              if(!s.cssRules) continue;
          } catch( e ) {
                if(e.name !== 'SecurityError') throw e; // for Firefox
                continue;
              }

          var cssRules = s.cssRules;
          for (var r = 0; r < cssRules.length; r++) {
            if ( contains( cssRules[r].selectorText, selectorTextArr ) )
              extractedCSSText += cssRules[r].cssText;
          }
        }
        

        return extractedCSSText;

        function contains(str,arr) {
          return arr.indexOf( str ) === -1 ? false : true;
        }

      }

      function appendCSS( cssText, element ) {
        var styleElement = document.createElement("style");
        styleElement.setAttribute("type","text/css"); 
        styleElement.innerHTML = cssText;
        var refNode = element.hasChildNodes() ? element.children[0] : null;
        element.insertBefore( styleElement, refNode );
      }
    }


    function svgString2Image( svgString, width, height, format, callback ) {
      var format = format ? format : 'png';

      var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      var image = new Image();
      image.onload = function() {
        context.clearRect ( 0, 0, width, height );
        context.drawImage(image, 0, 0, width, height);
        // context.fillStyle = "white"

        canvas.toBlob( function(blob) {
          var filesize = Math.round( blob.length/1024 ) + ' KB';
          if ( callback ) callback( blob, filesize );
        });

        
      };

      image.src = imgsrc;
    }






























  });

}