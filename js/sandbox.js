var l = 1000;

var svg = d3.select("body").append("svg")
    .attr("width", l)
    .attr("height", l);

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

            var patches = colorCube.utils.const.patches4;
            for(var i = 0; i < patches.length; i++){
                colorCube.visual.drawPolyWithFixColor(patches[i], {
                    name: "polygon" + i,
                    svg: svg,
                    color: colorCube.utils.colorGray,
                    x: 50 + 120 * i,
                    y: 400
                });
            }

            // // generate input data
            // // var input = colorCube.visual.serialize(puzzleData);
            // // var output = colorCube.logic.solve(inputData, patches);

            var output = [[[0,5],[1,1],[3,5]],
                [[0,5],[1,1],[2,17],[3,5]]
            ];

            for(var j = 0; j < output.length; j++){
                for(var k = 0; k < output[j].length; k++){
                    var poly = patches[output[j][k][0]];
                    var moves = Math.floor(output[j][k][1] / 3);
                    var color = 1 << output[j][k][1] % 3;
                    var movedPoly = [];
                    for(var t = 0; t < poly.length; t++) {
                        movedPoly.push([poly[t][0] + moves, poly[t][1]]);
                    }

                    colorCube.visual.drawPolyWithFixColor(movedPoly, {
                        name: "poly" + j + "-" + k,
                        svg: svg,
                        color: colorCube.utils.colorMap[color],
                        x: 50 + 120 * k,
                        // x: 50,
                        y: 550 + j * 150
                    });
                }
            }
        };
    };
    fr.readAsDataURL(imgFile);
});