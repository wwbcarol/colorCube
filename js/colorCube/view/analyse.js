colorCube.visual.analyse = function(img){
    var canvas = document.createElement("canvas");
    canvas.setAttribute('width', img.width);
    canvas.setAttribute('height', img.height);
    console.log(img.width);
    console.log(img.height);

    var scaleX = d3.scaleLinear()
        .domain([0, colorCube.utils.const.iphone6PlusWidth])
        .range([0, img.width]);

    var scaleY = d3.scaleLinear()
        .domain([0, colorCube.utils.const.iphone6PlusHeight])
        .range([0, img.height]);

    var context =  canvas.getContext('2d');

    context.drawImage(img,0,0);
    var puzzleData = [];
    _.forEach(colorCube.utils.const.analyseImgIphon6Plus, function(posList, areaIndex){
        puzzleData[areaIndex] = [];
        _.forEach(posList, function(pos, itemIndex){
            var rgba = context.getImageData(scaleX(pos[0]), scaleY(pos[1]), 1, 1).data;
            var minDis = 255 * 3, minIdx = -1;
            _.forEach(colorCube.utils.colorMap, function(rgb, index){
                var dis = Math.abs(rgb.r - rgba[0]) + Math.abs(rgb.g - rgba[1]) + Math.abs(rgb.b - rgba[2]);
                if(dis < minDis) {
                    minIdx = index;
                    minDis = dis;
                }
            });
            puzzleData[areaIndex][itemIndex] = minIdx;
        });
    });

    return puzzleData;
};
