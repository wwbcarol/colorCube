colorCube.utils.const = colorCube.utils.const || {};

colorCube.utils.config = colorCube.utils.config || {};

colorCube.utils.const.analyseImgIphon6Plus =
    [[[648, 157], [681, 140], [707, 155], [677, 104]],
    [[619, 145], [620, 106], [652, 90], [588, 89]],
    [[590, 158], [559, 144], [559, 106], [529, 160]],
    [[591, 191], [559, 211], [530, 191], [560, 243]],
    [[620, 211], [622, 244], [592, 259], [648, 261]],
    [[649, 195], [680, 212], [680, 245], [710, 193]]];

colorCube.utils.const.iphone6PlusWidth = 1242;

colorCube.utils.const.iphone6PlusHeight = 2208;

colorCube.utils.colorMap = {
    0: d3.rgb(255, 255, 255),
    1: d3.rgb(242, 103, 69),
    2: d3.rgb(123, 201, 165),
    3: d3.rgb(255, 199, 93),
    4: d3.rgb(45, 88, 126),
    5: d3.rgb(160, 100, 150),
    6: d3.rgb(55, 179, 202),
    7: d3.rgb(255, 255, 255)
};

colorCube.utils.polyC = function(r, angle){
    return {"x": r * Math.cos(angle), "y": r * Math.sin(angle)}
};

colorCube.utils.transC = function(r, pos){
    // pos = [1, 2]
    var d = Math.PI / 3;
    switch (pos[1]){
        case 0:
            return [
                colorCube.utils.polyC(0, 0),
                colorCube.utils.polyC(r, pos[0] * d),
                colorCube.utils.polyC(r, pos[0] * d + d)
            ];
        case 1:
            return [
                colorCube.utils.polyC(r, pos[0] * d),
                colorCube.utils.polyC(r, pos[0] * d + d),
                colorCube.utils.polyC(2 * r * Math.sin(d), pos[0] * d + d / 2)
            ];
        case 2:
            return [
                colorCube.utils.polyC(r, pos[0] * d),
                colorCube.utils.polyC(2 * r * Math.sin(d), pos[0] * d + d / 2),
                colorCube.utils.polyC(2 * r, pos[0] * d)
            ];
        case 3:
            return [
                colorCube.utils.polyC(r, pos[0] * d + d),
                colorCube.utils.polyC(2 * r * Math.sin(d), pos[0] * d + d / 2),
                colorCube.utils.polyC(2 * r, pos[0] * d + d)
            ]
    }
};