var app= angular.module('app',[]);
app.factory('Score',function(){
	var scorex=0;
	var scoreo=0;
	return {
		scoreX:function(){
			scorex++;
		},
		scoreO:function(){
			scoreo++;
		},
		getScoreX:function(){
			return scorex;
		},
		getScoreO:function(){
			return scoreo;
		}
	}
})
app.factory('Board',function(){
	var A=[];
	function reset() {
		for(i=0;i<9;i++)
			A[i]="-";
	}
	reset();
	function xWin(){
		return check("x");
	}
	function oWin(){
		return check("o");
	}
	function check(symbol){
		for(i=0;i<9;i+=3){
			if(A[i]==symbol&&A[i+1]==symbol&&A[i+2]==symbol)
				return true;
		}
		for(i=0;i<3;i+=1){
			if(A[i]==symbol&&A[i+3]==symbol&&A[i+6]==symbol)
				return true;
		}
		if(A[0]==symbol&&A[4]==symbol&&A[8]==symbol)
			return true;
		if(A[2]==symbol&&A[4]==symbol&&A[6]==symbol)
			return true;
		return false;
	}
	return {
		get:function(index){
			return A[index];
		},
		set:function(index,value){
			if(A[index]!="-")
				return false;
			if(value=="o"||value=="x")
				A[index]=value;
			return true;
		},
		isSolved:function(){
			if(xWin())
				return "x";
			if(oWin())
				return "o";
			return false;
		},
		reset:reset
	}
})
app.factory('Manager',['Board','Score',function(Board,Score){
	var locked=[];
	var toMark="x";
	function reset() {
		for(i=0;i<9;i++)
			locked[i]=false;
	}
	function switchToMark(){
		if(toMark=="x"){
			toMark="o";
			return;
		}
		toMark="x";
	}
	return{
		mark:function(index){
			if(locked[index]==true){
				console.log("locked");
				return false;
			}
			else{
				Board.set(index,toMark);
				locked[index]=true;
				switchToMark();
				if(x=Board.isSolved()){
					alert(x+" wins");
					if(x=="x")
						Score.scoreX();
					else
						Score.scoreO();
					this.reset();
				}
			}
		},
		reset:function(){
			reset();
			Board.reset();
		}
	}
}])
app.controller('controller',['$scope','Board','Manager','Score',function($scope,Board,Manager,Score){
	$scope.value=function(index){
		return Board.get(index);
	}
	$scope.mark=function(index){
		Manager.mark(index);
	}
	$scope.xScore=Score.getScoreX;
	$scope.oScore=Score.getScoreO;
}])