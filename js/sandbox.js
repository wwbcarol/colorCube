var l = 1000;
var r = 100;

var svg = d3.select("body").append("svg")
    .attr("width", l)
    .attr("height", l);

colorCube.visual.drawPolyWithFixColor([[1,0],[1,1],[1,2],[1,3]], {
        name: "polygon1",
        svg: svg,
        color: colorCube.utils.colorMap[1 | 2],
        r: r,
        x: 500,
        y: 150
});

var img = document.getElementById('img');
colorCube.visual.analyse(img);