colorCube.visual.drawPolyWithFixColor = function(posList, config){
    // config = {
    //     name: "",
    //     svg: {},
    //     color: "#123345",
    //     r: 150,
    //     x: 150,
    //     y: 150,
    // };

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
        .attr("stroke", config.color);
};