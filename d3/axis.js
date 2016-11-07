 function renderAxes(svg,width,height,top,bottom,left,right){ 
        var xAxis = d3.svg.axis()
                .scale(d3.scale.linear().range([0, width - left - right]))
                .orient("bottom");            
                
        var yAxis = d3.svg.axis()
                .scale(d3.scale.linear().range([height - top - bottom, 0]))
                .orient("left");
        
        svg.append("g")        
            .attr("class", "axis")
            .attr("transform", function(){
                return "translate(" + left 
                    + "," + (height - bottom) + ")";
            })
            .call(xAxis);
            
        svg.append("g")        
            .attr("class", "axis")
            .attr("transform", function(){
                return "translate(" + left 
                    + "," + top + ")";
            })
            .call(yAxis);
    }