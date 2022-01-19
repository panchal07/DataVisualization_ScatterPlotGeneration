var cp_pos0 = [{ cx: 50, cy: 250 }, { cx: 200, cy: 50 }];
var cp_pos0_data = [{ x: 50, y: 250 }, { x: 200, y: 50 }];
var cp_pos1 = [{ cx: 50, cy: 250 }, { cx: 150, cy: 50 }, { cx: 200, cy: 50 }];
var cp_pos1_data = [{ x: 50, y: 250 }, { x: 150, y: 50 }, { x: 200, y: 50 }];
var cp_pos2 = [{ cx: 50, cy: 250 }, { cx: 150, cy: 50 }, { cx: 200, cy: 50 }, { cx: 250, cy: 250 }];
var cp_pos2_data = [{ x: 50, y: 250 }, { x: 150, y: 50 }, { x: 200, y: 50 }, { x: 250, y: 250 }];
var cp_pos3 = [{ cx: 50, cy: 250 }, { cx: 150, cy: 50 }, { cx: 200, cy: 50 }, { cx: 250, cy: 250 }, { cx: 250, cy: 100 }];
//var cp_pos3 = [{ cx: 50, cy: 250 }, { cx: 150, cy: 50 }, { cx: 200, cy: 50 }, { cx: 250, cy: 250 }, { cx: 250, cy: 100 }];
var cp_pos3_data = [{ x: 50, y: 250 }, { x: 150, y: 50 }, { x: 200, y: 50 }, { x: 250, y: 250 }, { x: 250, y: 100 }];



var curve_been_created = false;

var lineFunction = d3.line()
    .x(function (d, i) { return d.cx; })
    .y(function (d, i) { return d.cy; })

//invoking generate_bezier_curve function whenever slider is moved
d3.select("#slider").on("input", generate_bezier_curve)


// function to handle drag event on control points
var dragEventHandler0 = d3.drag().on('drag', function (d, i) {
    cp_pos0[i].cx = d3.event.x;
    cp_pos0[i].cy = d3.event.y;
    generate_bezier_curve()
}
);

var dragEventHandler1 = d3.drag().on('drag', function (d, i) {
    cp_pos1[i].cx = d3.event.x;
    cp_pos1[i].cy = d3.event.y;
    generate_bezier_curve()
}
);

var dragEventHandler2 = d3.drag().on('drag', function (d, i) {
    cp_pos2[i].cx = d3.event.x;
    cp_pos2[i].cy = d3.event.y;
    generate_bezier_curve()

}

);

var dragEventHandler3 = d3.drag().on('drag', function (d, i) {
    cp_pos3[i].cx = d3.event.x;
    cp_pos3[i].cy = d3.event.y;
    generate_bezier_curve()

}
);

function linear_line() {

    var drag = dragEventHandler0;

    var cps0 = d3.select(".control_points0").selectAll("circle").data(cp_pos0);
    cps0.enter().append("circle").merge(cps0)
        .call(drag)
        .attr("cx", function (d) { return d.cx; })
        .attr("cy", function (d) { return d.cy; })
        .attr("r", 6)
        .exit().remove();
    var ctp_line0 = d3.select("#path_0")
        .attr("d", lineFunction(cp_pos0))
        .attr("stroke", "Black")
        .attr("stroke-width", 2)
        .attr("fill", "none");

}

function quadratic_line() {

    var drag = dragEventHandler1;

    var cps1 = d3.select(".control_points1").selectAll("circle").data(cp_pos1);
    cps1.enter().append("circle").merge(cps1)
        .call(drag)
        .attr("cx", function (d) { return d.cx; })
        .attr("cy", function (d) { return d.cy; })
        .attr("r", 6)
        .exit().remove();
    var ctp_line1 = d3.select("#path_1")
        .attr("d", lineFunction(cp_pos1))
        .attr("stroke", "Black")
        .attr("stroke-width", 2)
        .attr("fill", "none");

}

function cubic_line() {

    var drag = dragEventHandler2;

    var cps2 = d3.select(".control_points2").selectAll("circle").data(cp_pos2);
    cps2.enter().append("circle").merge(cps2)
        .call(drag)
        .attr("cx", function (d) { return d.cx; })
        .attr("cy", function (d) { return d.cy; })
        .attr("r", 6)
        .exit().remove();
    var ctp_line2 = d3.select("#path_2")
        .attr("d", lineFunction(cp_pos2))
        .attr("stroke", "Black")
        .attr("stroke-width", 2)
        .attr("fill", "none");

}

function quartic_line() {

    var drag = dragEventHandler3;

    var cps3 = d3.select(".control_points3").selectAll("circle").data(cp_pos3);
    cps3.enter().append("circle").merge(cps3)
        .call(drag)
        .attr("cx", function (d) { return d.cx; })
        .attr("cy", function (d) { return d.cy; })
        .attr("r", 6)
        .exit().remove();
    var ctp_line3 = d3.select("#path_3")
        .attr("d", lineFunction(cp_pos3))
        .attr("stroke", "Black")
        .attr("stroke-width", 2)
        .attr("fill", "none");

}


function generate_bezier_curve() {
    var count = d3.select("#slider").property("value")

    var count1;
    count1 = count / 100;
    var i = 0;
    var j = 0;
    var k = 0;
    var l = 0;

    var data_bz0 = [];
    var data_bz1 = [];
    var data_bz2 = [];
    var data_bz3 = [];

    var radiobuttoncomp = document.getElementById("comp");
    var radiobuttonprog = document.getElementById("prog");

    if (radiobuttoncomp.checked) {
        for (var x = 0; x < count; x++) {
            var p = x / (count - 1);
            var x_coord0 = calculate_b0(cp_pos0, "cx", p);
            var y_coord0 = calculate_b0(cp_pos0, "cy", p);
            
            var data_bzpnt0 = { cx: x_coord0, cy: y_coord0 };
            data_bz0.push(data_bzpnt0);            

        }
        linearSelection(data_bz0)

        for (var y = 0; y < count; y++) {
            var q = y / (count - 1);
            var x_coord1 = calculate_b1(cp_pos1, "cx", q);
            var y_coord1 = calculate_b1(cp_pos1, "cy", q);
            var data_bzpnt1 = { cx: x_coord1, cy: y_coord1 };
            data_bz1.push(data_bzpnt1);
            console.log(data_bz1)

        }
        quadraticSelection(data_bz1)

        for (var z = 0; z < count; z++) {
            var r = z / (count - 1);
            var x_coord2 = calculate_b2(cp_pos2, "cx", r);
            var y_coord2 = calculate_b2(cp_pos2, "cy", r);
            var data_bzpnt2 = { cx: x_coord2, cy: y_coord2 };
            data_bz2.push(data_bzpnt2);

        }
        cubicSelection(data_bz2)

        for (var w = 0; w < count; w++) {
            var s = w / (count - 1);
            var x_coord3 = calculate_b3(cp_pos3, "cx", s);
            var y_coord3 = calculate_b3(cp_pos3, "cy", s);
            var data_bzpnt3 = { cx: x_coord3, cy: y_coord3 };
            data_bz3.push(data_bzpnt3);

        }
        quarticSelection(data_bz3)

    }
    else if (radiobuttonprog.checked) {
        while (i <= count1) {
            var x_coord4 = calculate_b0(cp_pos0_data, "x", i);
            var y_coord4 = calculate_b0(cp_pos0_data, "y", i);            
            var data_bzpnt0 = { cx: x_coord4, cy: y_coord4 };
            data_bz0.push(data_bzpnt0);
            i = i + 0.01;
        }
        linearSelection(data_bz0)

        while (j <= count1) {
            var x_coord5 = calculate_b1(cp_pos1_data, "x", j);
            var y_coord5 = calculate_b1(cp_pos1_data, "y", j);
            var data_bzpnt1 = { cx: x_coord5, cy: y_coord5 };
            data_bz1.push(data_bzpnt1);
            j = j + 0.01;
        }
        quadraticSelection(data_bz1)

        while (k <= count1) {
            var x_coord6 = calculate_b2(cp_pos2_data, "x", k);
            var y_coord6 = calculate_b2(cp_pos2_data, "y", k);
            var data_bzpnt2 = { cx: x_coord6, cy: y_coord6 };
            data_bz2.push(data_bzpnt2);
            k = k + 0.01;
        }
        cubicSelection(data_bz2)

        while (l <= count1) {
            var x_coord7 = calculate_b3(cp_pos3_data, "x", l);
            var y_coord7 = calculate_b3(cp_pos3_data, "y", l);
            var data_bzpnt3 = { cx: x_coord7, cy: y_coord7 };
            data_bz3.push(data_bzpnt3);
            l = l + 0.01;
        }
        quarticSelection(data_bz3)
    }

    function linearSelection(data_bz0) {
        var linear_selection = d3.select(".bezier_points0").selectAll("circle").data(data_bz0)
            .attr("cx", function (d, i) { return d.cx; })
            .attr("cy", function (d, i) { return d.cy; })
            .attr("r", 3)
        linear_selection.enter().append("circle").merge(linear_selection)
            .attr("cx", function (d, i) { return d.cx; })
            .attr("cy", function (d, i) { return d.cy; })
            .attr("r", 3)
        linear_line()
        linear_selection.exit().remove()
    }



    function quadraticSelection(data_bz1) {
        var quadratic_selection = d3.select(".bezier_points1").selectAll("circle").data(data_bz1)
            .attr("cx", function (d, i) { return d.cx; })
            .attr("cy", function (d, i) { return d.cy; })
            .attr("r", 3)
        quadratic_selection.enter().append("circle").merge(quadratic_selection)
            .attr("cx", function (d, i) { return d.cx; })
            .attr("cy", function (d, i) { return d.cy; })
            .attr("r", 3)
        quadratic_line()
        quadratic_selection.exit().remove()
    }
    function cubicSelection(data_bz2) {
        var cubic_selection = d3.select(".bezier_points2").selectAll("circle").data(data_bz2)
            .attr("cx", function (d, i) { return d.cx; })
            .attr("cy", function (d, i) { return d.cy; })
            .attr("r", 3)
        cubic_selection.enter().append("circle").merge(cubic_selection)
            .attr("cx", function (d, i) { return d.cx; })
            .attr("cy", function (d, i) { return d.cy; })
            .attr("r", 3)
        cubic_line()
        cubic_selection.exit().remove()
    }
    function quarticSelection(data_bz3) {
        var quartic_selection = d3.select(".bezier_points3").selectAll("circle").data(data_bz3)
            .attr("cx", function (d, i) { return d.cx; })
            .attr("cy", function (d, i) { return d.cy; })
            .attr("r", 3)
        quartic_selection.enter().append("circle").merge(quartic_selection)
            .attr("cx", function (d, i) { return d.cx; })
            .attr("cy", function (d, i) { return d.cy; })
            .attr("r", 3)
        quartic_line()
        quartic_selection.exit().remove()
    }
}


function calculate_b0(cp_pos, attr, p) {

console.log("cp_pos[0][attr]==>",attr,cp_pos[0][attr])

    var result0 = ((1 - p) * cp_pos[0][attr]) + (p * cp_pos[1][attr])

    return result0;
}
function calculate_b1(cp_pos, attr, q) {

    var result1 = ((1 - q) * (1 - q)) * cp_pos[0][attr] + 2 * (1 - q) * (q * cp_pos[1][attr]) + (q * q) * cp_pos[2][attr]
    return result1;
}

function calculate_b2(cp_pos, attr, r) {
    var result2 = ((1 - r) * (1 - r) * (1 - r)) * cp_pos[0][attr] + 3 * ((1 - r) * (1 - r)) * (r * cp_pos[1][attr]) + 3 * ((1 - r)) * (r * r) * cp_pos[2][attr] + (r * r * r) * cp_pos[3][attr]
    return result2;
}

function calculate_b3(cp_pos, attr, s) {

    //var result3 = (((1 - s) * (1 - s) * (1 - s) * (1 - s)) * cp_pos[0][attr]) + (4 * ((1 - s) * (1 - s) * (1 - s)) * (s * cp_pos[1][attr])) + (6 * ((1 - s) * (1 - s)) * (s * s) * cp_pos[2][attr]) + (4 * (1 - s) * (s * s * s) * cp_pos[3][attr]) + (s * s * s * s * cp_pos[3][attr])
    var result3 = (((1-s)*(1-s)*(1-s)*(1-s))*cp_pos[0][attr])+(4*((1-s)*(1-s)*(1-s)*(s*cp_pos[1][attr])))+((6*cp_pos[2][attr])*(s*s)*((1-s)*(1-s)))+((4*cp_pos[3][attr])*(s*s*s)*(1-s))+(cp_pos[4][attr]*s*s*s*s)
                  
    return result3;                                 
            
}
generate_bezier_curve();