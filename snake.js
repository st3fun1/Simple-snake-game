var gameIsRunning = true;
var grid = {
	tiles: 40
	, parentContainer: document.getElementById("game")
};
var snake = {
	head: [20, 20],
	body:[]
	, initialDirection: 'r'
	, currentDirection: null
	, innerContent: 'O'
	, size: 1
};


var food = {
	spawnPlace: null,
	coords: []
};
function spawnFood(tiles=grid.tiles){
	var x = Math.floor(Math.random()*tiles);
	var y = Math.floor(Math.random()*tiles);
	return {
		x: x,
		y: y
	}
}
function render(tiles, innerVal, container, snakeObj) {
	for (var i = 0; i < tiles; i++) {
		for (var j = 0; j < tiles; j++) {
			var $tile = $('<div>').addClass('square');
//			if (j == tiles - 1) {
//				$tile.addClass('last-tile-row');
//			}
			if (i == snakeObj.head[0] && j == snakeObj.head[1]) {
				$tile.addClass('snake-head');
			}
			$tile.attr('id', i + '-' + j);
			$('#game').append($tile);
		}
	}
	var coords = spawnFood(tiles);
	changeIdVal(coords.x,coords.y,'food',1);
	food.coords[0] = coords.x;
	food.coords[1] = coords.y;
}
function move(dir){
	if (dir == 'u') {
			snake.head[0] -= 1;
		}
		else if (dir == 'd') {
			snake.head[0] += 1;
		}
		else if (dir == 'l') {
			snake.head[1] -=1;
		}
		else if (dir == 'r') {
			snake.head[1] +=1;
		}
}

function changeIdVal(x,y,className,action){
	if(action == 1){
		$('#' + x + '-' + y).addClass(className);
	}else{
		$('#' + x + '-' + y).removeClass(className);
	}
}
render(grid.tiles, grid.innerVal, grid.parentContainer, snake);

$(document).keydown(function (e) {
	var keyCode = e.keyCode;
	if(keyCode == 38) snake.initialDirection = 'u';
	else if(keyCode == 40) snake.initialDirection = 'd';
	else if(keyCode == 37) snake.initialDirection = 'l';
	else if(keyCode == 39) snake.initialDirection = 'r';
});

var timer = setInterval(function () {

   
	if(snake.head[0] == food.coords[0] && snake.head[1]  == food.coords[1]){
        changeIdVal(food.coords[0],food.coords[1],'food',0);
        changeIdVal(food.coords[0],food.coords[1],'snake-head',1);
        snake.size++;
        snake.body.unshift([food.coords[0],food.coords[1]]);
        changeIdVal(food.coords[0],food.coords[1],'snake-body',1);
        console.log('food eaten','; size: ', snake.size);
        var coords = spawnFood(snake.tiles);
	    changeIdVal(coords.x,coords.y,'food',1);
	    food.coords[0] = coords.x;
	    food.coords[1] = coords.y;
    }else{
        if(snake.size >= 2){
            snake.body.unshift([snake.head[0],snake.head[1]]);
            changeIdVal(snake.head[0],snake.head[1],'snake-body',1);
            changeIdVal(snake.body[snake.body.length-1][0],snake.body[snake.body.length-1][1],'snake-body',0);
            snake.body.pop();
        }
    }
    changeIdVal(snake.head[0],snake.head[1],'snake-head',0);
    move(snake.initialDirection);
    changeIdVal(snake.head[0],snake.head[1],'snake-head',1);
    
    //collision with wall
     
     if(snake.head[0] == -1 || snake.head[0] == grid.tiles || snake.head[1] == -1 || snake.head[1] == grid.tiles){
				
				
				snake.head[0] = snake.head[1] =  20;//default coords
				snake.body = [];
                $('.square').attr('class','square');
                changeIdVal(snake.head[0],snake.head[1],'snake-head',1)
                var coords = spawnFood(snake.tiles);
	            changeIdVal(coords.x,coords.y,'food',1);
	            food.coords[0] = coords.x;
	            food.coords[1] = coords.y;
                clearInterval(timer);
     }
    
    //collision with itself
    
    
    for(var i=0;i<snake.body.length;i++){
        if(snake.body[i][0] == snake.head[0] && snake.body[i][1] == snake.head[1]){
            snake.head[0] = snake.head[1] =  20;//default coords
				snake.body = [];
                $('.square').attr('class','square');
                changeIdVal(snake.head[0],snake.head[1],'snake-head',1)
                var coords = spawnFood(snake.tiles);
	            changeIdVal(coords.x,coords.y,'food',1);
	            food.coords[0] = coords.x;
	            food.coords[1] = coords.y;
                clearInterval(timer);
        }
    }
    
    
},100);

//to add: obstacles, requestAnimationFrame, maybe canvas, UI
/*window.requestAnimationFrame(timer);*/


