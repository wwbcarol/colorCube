colorCube.logic.solve = function(result){
	var result = [6,6,4,6,6,6,6,6,2,2,2,7,6,4,4,4,6,6,4,4,6,4,4,4];//fack value

	var n = colorCube.utils.const.patches4.length;

	var choice = 1 << n;
	var resultSet = [];
	
	for(var i = choice-1; i >=0; i--){
		var choiceSet = [];
		for (var j = 0 ; j<n ; j++) {
			if( ((1<<j) & i) != 0){
				choiceSet.push(j);
			}
		}

		var size = choiceSet.length;
		var as = [];

		this.permutation(as, 0, size, choiceSet, resultSet, result);
	}

	return resultSet;
};

colorCube.logic.permutation = function(as, level, size, choiceSet, resultSet, result){
	if(level>=size){
		if(this.judge(as, choiceSet, result)){
			var tmp = [];
			for (var i = 0; i < choiceSet.length; i++) {
				var choice = choiceSet[i];
				var operation = as[i];
				tmp.push([choice,operation]);
			}
			resultSet.push(tmp);
			return;
		}
	}else{
		for (var i = 0; i < 18; i++) {
			var tmp = as[level];
			as[level] = i;
			this.permutation(as, level+1, size, choiceSet, resultSet, result);
			as[level] = tmp;
		}
	}
}

colorCube.logic.judge = function(as, choiceSet, result){
	var guessResult = new Array(24);
	for (var i = guessResult.length - 1; i >= 0; i--) {
		guessResult[i] = 0;
	}

	for (var i = 0; i <= as.length - 1; i++) {
		var x = as[i];
		var pose = Math.floor(x/3);
		var color = 1<<(x%3);

		var piece = colorCube.utils.const.patches4[choiceSet[i]];
		//adjust piece to position and change color
		for(var j = 0; j<piece.length; j++){
			var js = piece[j];
			var positionIn24th = ((js[0]+pose) % 6)*4 + js[1];
			guessResult[positionIn24th] |= color;
			guessResult[positionIn24th] %= 8;
		}
	}

	return this.judgeTwoArray(guessResult, result);
}

colorCube.logic.judgeTwoArray = function(guessResult, result) {
	for (var i = guessResult.length - 1; i >= 0; i--) {
		var j = guessResult[i];
		var x = result[i];

		if(x!=j && Math.abs(x-j)!=7){
			return false;
		}
	}
	return true;
}