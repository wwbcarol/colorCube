var l = 1000;
var r = 100;

var svg = d3.select("body").append("svg")
    .attr("width", l)
    .attr("height", l);

// colorCube.visual.drawPolyWithFixColor([[1,0],[1,1],[1,2],[1,3]], {
//         name: "polygon1",
//         svg: svg,
//         color: colorCube.utils.colorMap[1 | 2],
//         r: r,
//         x: 500,
//         y: 150
// });

// var img = document.getElementById('img');
// var puzzleData = colorCube.visual.analyse(img);
// colorCube.visual.drawPoly(puzzleData, {
//     name: "puzzle",
//     svg: svg,
//     r: 300,
//     x: 150,
//     y: 100
// });

$('#inputFile').on('change', function(event) {
    var imgFile = event.target.files[0];
    var fr = new FileReader();
    fr.onloadend = function(e){
        document.getElementById("inputFileImg").src = e.target.result;
        var img = document.getElementById('inputFileImg');
        img.onload = function(){
            var puzzleData = colorCube.visual.analyse(img);
            $("svg").empty();
            colorCube.visual.drawPoly(puzzleData, {
                name: "puzzle",
                svg: svg,
                r: 300,
                x: 150,
                y: 100
            });
        };
        // var puzzleData = colorCube.visual.analyse(img);
        // // generate input data
        // // var input = colorCube.visual.serialize(puzzleData);
        // // var output = colorCube.logic.solve(inputData, patches);
        // $("svg").empty();
        // colorCube.visual.drawPoly(puzzleData, {
        //     name: "puzzle",
        //     svg: svg,
        //     r: 300,
        //     x: 150,
        //     y: 100
        // });
    };
    fr.readAsDataURL(imgFile);
});