d3.csv("iris.data").then(function(data){

    data.forEach(element => {
        element.sepal_length = +element.sepal_length;
        element.sepal_width = +element.sepal_width;

        element.petal_length = +element.petal_length;
        element.petal_width = +element.petal_width;

    });

var mapped_objects = data.map(function(entry){
    return{
        X : entry.sepal_length,
        Y : entry.sepal_width,
        A : entry.petal_length,
        B : entry.petal_width,
        P : entry.class 
    };
});
console.log(data);
console.log(mapped_objects);

var x_min = d3.min(mapped_objects.map(function(entry){
    return entry.X;
}));

var x_max = d3.max(mapped_objects.map(function(entry){
    return entry.X;
}));
console.log(x_min+" "+ x_max);

var y_min = d3.min(mapped_objects.map(function(entry){
    return entry.Y;
}));

var y_max = d3.max(mapped_objects.map(function(entry){
    return entry.Y;
}));
console.log(y_min+" "+ y_max);

//SCATTER PLOT FOR PETAL LENGTH & WIDTH
var a_min = d3.min(mapped_objects.map(function(entry){
    return entry.A;
}));

var a_max = d3.max(mapped_objects.map(function(entry){
    return entry.A;
}));
console.log(a_min+" "+ a_max);

var b_min = d3.min(mapped_objects.map(function(entry){
    return entry.B;
}));

var b_max = d3.max(mapped_objects.map(function(entry){
    return entry.B;
}));
console.log(b_min+" "+ b_max);

var padding = 25;

var x_scale = d3.scaleLinear()
                .domain([x_min,x_max])
                .range([85,500-padding]);

var y_scale = d3.scaleLinear()
                .domain([y_min,y_max])
                .range([500-padding,padding]);

var a_scale = d3.scaleLinear()
                .domain([a_min,a_max])
                .range([44,500-padding]);

var b_scale = d3.scaleLinear()
                .domain([b_min,b_max])
                .range([500-padding,padding]);

var dummy_svg =d3.select("body").append("svg")
                .attr("width",100)
                .attr("height",0)
                .style("background","white");

var sepal_svg = d3.select("body").append("svg")
                .attr("width",600)
                .attr("height",550)
                .style("background","white");

var petal_svg = d3.select("body").append("svg")
                  .attr("width",600)
                  .attr("height",550)
                  .style("background","white");

var colorScale = d3.scaleOrdinal(d3.schemeAccent);

var circles_sp = sepal_svg.selectAll("circle").data(mapped_objects);
circles_sp.enter().append("circle").merge(circles_sp)
          .attr("cx",function(data,index){
              return x_scale(data.X);
          })
          .attr("cy",function(data,index){
            return y_scale(data.Y);
         })
         .attr("fill",function(entry){
             return colorScale(entry.P);
         })
         .attr("r",4)
         .on('mouseover',function() {
            d3.select(this)
                .attr('stroke-width',0)
                .attr('r',10)
          })
          .on('mouseout',function () {
            d3.select(this)
              .attr('stroke-width',0)
              .attr('r',4)
          })
         .exit().remove();

var scatter_sepal_x= sepal_svg.append("text")
         .attr("x",190)
         .attr("y",510)
         .text("Sepal Width") 
         
var scatter_sepal_y= sepal_svg.append("text")
         .attr("x",150)
         .attr("y",-30)
         .attr("transform","rotate(90)")
         .text("Sepal Length") 

var circles_ptl = petal_svg.selectAll("circle").data(mapped_objects);
circles_ptl.enter().append("circle").merge(circles_ptl)
           .attr("cx",function(data,index){
            return a_scale(data.A);
            })
          .attr("cy",function(data,index){
            return b_scale(data.B);
            })
          .attr("fill",function(entry){
            return colorScale(entry.P);
            })
          .attr("r",4)
          .exit().remove();

var scatter_petal_x = petal_svg.append("text")
          .attr("x",180)
          .attr("y",510)
          .text("Petal Width") 
          
 var scatter_petal_y = petal_svg.append("text")
          .attr("x",150)
          .attr("y",0)
          .attr("transform","rotate(90)")
          .text("Petal Length") 

var xAxis = d3.axisBottom().scale(x_scale);
var yAxis = d3.axisLeft().scale(y_scale);
var aAxis = d3.axisBottom().scale(a_scale);
var bAxis = d3.axisLeft().scale(b_scale);

sepal_svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(0,"+ 478 + ")")
            .call(xAxis);

sepal_svg.append("g")
            .attr("class","axis")
            .attr("transform", "translate(" + 80 + ",0)")
            .call(yAxis); 
            
petal_svg.append("g")
            .attr("class","axis")
            .attr("transform","translate(0,"+ 478 + ")")
            .call(aAxis);

petal_svg.append("g")
            .attr("class","axis")
            .attr("transform", "translate(" + 40 + ",0)")
            .call(bAxis); 
})


.catch(function(error){
    
})