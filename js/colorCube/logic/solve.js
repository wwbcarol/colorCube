colorCube.logic.patches = [];
colorCube.logic.forbidden = {status:[], patch:[]};

colorCube.logic.solve = function(answer, patches){

    colorCube.logic.patches = patches;

	var n = patches.length;

	var choice = 1 << n;
	var resultSet = [];

	this.prepare(answer, patches);

	for(var i = 0; i < choice ; i++){
		var choiceSet = [];
		for (var j = 0 ; j<n ; j++) {
			if( ((1 << j) & i) !== 0){
				choiceSet.push(j);
			}
		}

		
		if(!this.verifyChoice(choiceSet)){
			continue;
		}

		var as = [];
		var size = choiceSet.length;
		var result = this.permutation(as, 0, size, choiceSet, answer);
		if(result != null){
			resultSet.push(result);
			return resultSet;
		}
	}

	return resultSet;
};

/**
* forbidden is {status:[[]], patch:[]}
* calculate for the forbidden status for every piece. 
* for example, piece have 3 color and 6 position, so it have 3*6=18 status.
* Namely: (red,p0),(green,p0),(blue,p0),(red,p1),(green,p1),(blue,p1),...
* Call them status : 0 - 17.
* And according to the answer, piece 0 can not in status 3,5,7,8,9.
* Piece 1 can not in all status. 
* Then return {status: [[3,5,7,8,9],[1,2,3...,17],...], patch:[1]}
*/
colorCube.logic.prepare = function(answer, patches){
	var x = 1;
	for (var i = 0; i < patches.length ; i++) {
		var patch = patches[i];
		var subStatus = [];
		for (var j = 0; j < 18; j++){
			var status = this.parseStatus(j);
			for (var k = 0; k < patch.length; k++){
				var positionIn24th = this.convertPointTo24th(status.pos, patch[k]);
				//judge status
				var colorInAnswer = parseInt(answer[positionIn24th]);
				if(colorInAnswer !== 0 && (colorInAnswer & status.color) === 0){
					subStatus.push(j);
					break;
				}

			}
		}
		this.forbidden.status.push(subStatus);
		if(subStatus.length === 18)
			this.forbidden.patch.push(i);
		else{
			x *= (18-subStatus.length);
		}
	}
	console.log(x+" kinds of possibilities!");
};

colorCube.logic.verifyChoice = function(choiceSet){
	for (var i = choiceSet.length - 1; i >= 0; i--) {
		var choice = choiceSet[i];
		if(this.forbidden.patch.indexOf(choice)>0){
			choiceSet.splice( this.forbidden.patch.indexOf(choice), 1 );
		}
	}

	if(choiceSet.length<3){ 
		//Treat that the solution should including at least 3 patches.
		return false;
	}else{
		return true;
	}
};

colorCube.logic.permutation = function(as, level, size, choiceSet, answer){
	if(level>=size){
		if(this.judge(as, choiceSet, answer)){
			var tmp = [];
			for (var i = 0; i < choiceSet.length; i++) {
				var choice = choiceSet[i];
				var operation = as[i];
				tmp.push([choice,operation]);
			}
			return tmp;
		}else{
			return null;
		}
	}else{
		var choice = choiceSet[level];
		for (var i = 0; i < 18; i++) {
			if(this.forbidden.status[choice].indexOf(i) === -1){
				as[level] = i;
				var result = this.permutation(as, level+1, size, choiceSet, answer);
				if(result != null)
					return result;
			}
		}
	}
};

colorCube.logic.judge = function(as, choiceSet, answer){
	var guessResult = new Array(24);
	for (var i = guessResult.length - 1; i >= 0; i--) {
		guessResult[i] = 0;
	}

	for (var i = 0; i < as.length; i++) {
		var status = this.parseStatus(as[i]);

		var patch = colorCube.logic.patches[choiceSet[i]];
		//adjust piece to position and change color
		for(var j = 0; j<patch.length; j++){
			var positionIn24th = this.convertPointTo24th(status.pos, patch[j]);
			guessResult[positionIn24th] |= status.color;
			guessResult[positionIn24th] %= 8;
		}
	}

	return this.judgeTwoArray(guessResult, answer);
};

colorCube.logic.parseStatus = function(status){
	var position = Math.floor(status/3);
	var color = 1<<(status%3);
	return {'pos':position, 'color':color};
};

colorCube.logic.convertPointTo24th = function(pos, point){
	return ((point[0]+pos) % 6)*4 + point[1];
};

colorCube.logic.judgeTwoArray = function(guessResult, answer) {
	for (var i = guessResult.length - 1; i >= 0; i--) {
		var j = guessResult[i];
		var x = answer[i];

		if(x != j && Math.abs(x - j) != 7){
			return false;
		}
	}
	return true;
};

