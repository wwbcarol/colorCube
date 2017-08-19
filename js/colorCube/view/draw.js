colorCube.visual.drawPolyWithFixColor = function(posList, config){
    // config = {
    //     name: "",
    //     svg: {},
    //     color: "#123345",
    //     r: 150,
    //     x: 150,
    //     y: 150,
    // };

    config.r = config.r || 100;

    var scaleX = d3.scaleLinear()
        .domain([-2 * config.r, 2 * config.r])
        .range([0, config.r]);

    var scaleY = d3.scaleLinear()
        .domain([-2 * config.r, 2 * config.r])
        .range([config.r, 0]);

    var x = config.x || 0;
    var y = config.y || 0;

    config.svg.selectAll(config.name)
        .data(posList.map(function(pos){
            return colorCube.utils.transC(config.r, pos);
        }))
        .enter()
        .append("polygon")
        .attr("points", function(d){
            return d.map(function(d) {
                return [x + scaleX(d.x), y + scaleY(d.y)].join(",");
            }).join(" ");
        })
        .attr("fill", config.color)
        .attr("stroke", config.color)
        .attr("opacity", 0.5);

    // config.svg.selectAll(config.name + "_line")
    //     .data([colorCube.utils.outlineC(config.r * 2)])
    //     .enter()
    //     .append("polyline")
    //     .attr("points", function(d){
    //         return d.map(function(d) {
    //             return [x + scaleX(d.x), y + scaleY(d.y)].join(",");
    //         }).join(" ");
    //     });
        // .attr("fill", "none");
        // .attr("stroke", config.color)
        // .attr("opacity", 0.5);
};

colorCube.visual.drawPoly = function(puzzleData, config){
    // config = {
    //     name: "",
    //     svg: {},
    //     r: 150,
    //     x: 150,
    //     y: 150,
    // };

    config.r = config.r || 100;

    var scaleX = d3.scaleLinear()
        .domain([-2 * config.r, 2 * config.r])
        .range([0, config.r]);

    var scaleY = d3.scaleLinear()
        .domain([-2 * config.r, 2 * config.r])
        .range([config.r, 0]);

    var x = config.x || 0;
    var y = config.y || 0;

    var puzzleList = [];
    for(var i = 0; i < 6; i++) {
        for(var j = 0; j < 4; j++) {
            var color = puzzleData[i][j];
            if( color > 0 && color < 7){
                puzzleList.push({"pos":[i, j],"color":color});
            }
        }
    }

    config.svg.selectAll(config.name)
        .data(puzzleList.map(function(pos){
            return {"pos":colorCube.utils.transC(config.r, pos.pos), "color": pos.color};
        }))
        .enter()
        .append("polygon")
        .attr("points", function(d){
            return d.pos.map(function(d) {
                return [x + scaleX(d.x), y + scaleY(d.y)].join(",");
            }).join(" ");
        })
        .attr("fill", function(d){
            return colorCube.utils.colorMap[d.color];
        })
        .attr("stroke", function(d){
            return colorCube.utils.colorMap[d.color];
        });
};