colorCube.visual.analyse = function(img){
    var canvas = document.createElement("canvas");
    canvas.setAttribute('width', img.width);
    canvas.setAttribute('height', img.height);
    var context =  canvas.getContext('2d');

    context.drawImage(img,0,0);
    var data = context.getImageData(649, 157, 1, 1).data;
    console.log(data);
};
