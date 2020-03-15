
console.log("Yo, I am alive!");
// Creating Canvas
let paper =  new Raphael(document.getElementById("svgcanvas"));
let pWidth = paper.width;
let pHeight = paper.height;
//console.log(pWidth,pHeight);

let bg = paper.rect(0,0, pWidth,pHeight);
bg.attr({
	"fill" : "#fff",
	"stroke-width" : 0,
	"fill-opacity" : 0.2
});

// Cell Global Parameters
let size = 10
let numrow = pWidth/size
let numcol = pHeight/size
let row = []
let col = []
let pathrow = []
let pathcol = []
let direction = 'right';
let growth = false
let body = [];
let bodyX = 0
let bodyY = 0


// Creating Grid Parameters
let i = 0
let j = 0
let psrow = []
let pscol = []
let pscell = []
let cell = []
let rownext = []
let colnext = []

while (i <= numrow){
// Creating Background Grid
	row[i] = 0 + size*i
	col[i] = 0 + size*i

	psrow[i] = "M " + row[i] + ",0 L " + row[i] + "," + pHeight
	pscol[i] = "M 0," + col[i] + " L " + pWidth + "," + col[i]
	pathrow[i] = paper.path(psrow[i])
	pathcol[i] = paper.path(pscol[i])
	pathrow[i].attr({
		//"stroke" : '#BBB',
		"stroke" : 0
	})
	pathcol[i].attr({
		//"stroke" : '#BBB',
		"stroke" : 0
	})

// Add to Array
	i++
}
// Creating Snake
let start = paper.rect(size*numrow/2, size*numcol/2, size, size)
start.attr({
	'stroke-width' : 0,
	'fill' : 'rgba(0,100,50,0.5)'
})

// Creating Snake Tail
let tail = paper.rect(size*numrow/2, size*numcol/2, size, size)
tail.attr({
	'stroke-width' : 0,
	'fill' : 'rgba(0,100,50,0.5)'
})

//Creating Body
let grow = function(){
    body[j] = paper.rect(bodyX, bodyY, size, size)
    body[j].attr({
		'stroke-width' : 0,
		'fill' : 'rgba(0,100,50,0.5)',
	})
    console.log(j)
}

// Snake Movement Variables
start.xpos = start.attrs.x;
start.ypos = start.attrs.y;
start.xrate = size
start.yrate = size

// Event Listeners for Arrowkey presses
document.addEventListener('keydown', function(event){
	if(event.which == 37 && !(direction === 'right')) {
    direction = "left"
	}
	if(event.which == 38 && !(direction === 'down')) {
    direction = "up"
	}
	if(event.which == 39 && !(direction === 'left')) {
    direction = "right"
	}
	if(event.which == 40 && !(direction === 'up')) {
    direction = "down"
	}
})

// Creating food
function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let xcoord = randInt(pWidth)
xcoord = xcoord - xcoord%size

let ycoord = randInt(pHeight)
ycoord = ycoord - ycoord%size

let food = paper.rect(xcoord, ycoord, size, size, size/4)
food.attr({
	'fill' : 'rgba(100, 65, 30, 0.8)',
	'stroke' : 0
})

// Snake & Food Movement Function
var move = function(){
	start.attr({'x': start.xpos, 'y': start.ypos});
	tail.attr({'x': tail.xpos, 'y': tail.ypos})
//	body[j-1].attr({'x': body[j-1].xpos, 'y': body[j-1].ypos})

// Head Movement
    if (start.xpos > pWidth) {
        start.xpos = -size;
    }
    if (start.xpos < -size) {
        start.xpos = pWidth;
    }
    if (start.ypos > pHeight) {
        start.ypos = -size;
    }
    if (start.ypos < -size) {
        start.ypos = pHeight;
    }

// Head Movement
	if (direction == "up"){
    	start.xrate = 0
    	start.yrate = size
    	start.ypos += -start.yrate;
    }
    if (direction == "right"){
    	start.yrate = 0
    	start.xrate = size
    	start.xpos += start.xrate;
    }
    if (direction == "down"){
    	start.xrate = 0
    	start.yrate = size
    	start.ypos += start.yrate;
    }
    if (direction == "left"){
    	start.yrate = 0
    	start.xrate = size
    	start.xpos += -start.xrate;
    }
    
// Tail Movement
    if (direction == 'up'){
    	tail.xpos = start.xpos
    	tail.ypos = start.ypos
    	tail.attr({'x': tail.xpos, 'y': tail.ypos});
    }
    if (direction == 'right'){
    	tail.xpos = start.xpos
    	tail.ypos = start.ypos
    	tail.attr({'x': tail.xpos, 'y': tail.ypos});
    }
    if (direction == 'down'){
    	tail.xpos = start.xpos
    	tail.ypos = start.ypos
    	tail.attr({'x': tail.xpos, 'y': tail.ypos});
    }
    if (direction == 'left'){
    	tail.xpos = start.xpos
    	tail.ypos = start.ypos
    	tail.attr({'x': tail.xpos, 'y': tail.ypos});
    }
/*
// Body Movement
    if (direction == 'up'){
    	bodyX = tail.xpos
    	bodyY = tail.ypos + size
    	body[j].attr({'x': bodyX, 'y': bodyY});
    }
    if (direction == 'right'){
    	bodyX = tail.xpos - size
    	bodyY = tail.ypos
    	body[j].attr({'x': bodyX, 'y': bodyY});
    }
    if (direction == 'down'){
    	bodyX = tail.xpos
    	bodyY = tail.ypos - size
    	body[j].attr({'x': bodyX, 'y': bodyY});
    }
    if (direction == 'left'){
    	bodyX = tail.xpos + size
    	bodyY = tail.ypos
    	body[j].attr({'x': bodyX, 'y': bodyY});
    }
*/
// Refreshing Food After Eaten
    if(start.attrs.x == food.attrs.x && start.attrs.y == food.attrs.y){
		
		xcoord = randInt(pWidth)
		xcoord = xcoord - xcoord%size
		ycoord = randInt(pHeight)
		ycoord = ycoord - ycoord%size
		food.attr({
			'x' : xcoord,
			'y' : ycoord
		})

// Grow State Changes to True
		growth = true
		//console.log(growth)
	}

        
    

// Creating Snake Body when Growth is True
	if(growth == true){
		grow()
		growth = false
        body[j].attr({'x': bodyX, 'y': bodyY});
        
        if (direction == 'up'){
            bodyX = tail.xpos
            bodyY = tail.ypos + size
        }
        if (direction == 'right'){
            bodyX = tail.xpos - size
            bodyY = tail.ypos
        }
        if (direction == 'down'){
            bodyX = tail.xpos
            bodyY = tail.ypos - size
        }
        if (direction == 'left'){
            bodyX = tail.xpos + size
            bodyY = tail.ypos
        }
        j++
	}
      
// Updating bodyX and bodyY
    

// Move Created Body to Follow Tail
}


// Set Interval for Snake Movement
setInterval(move,75)

// Questions
// How to refer to j while outside of the if loop?
// How to make a new body (array) in an if loop (when food is eaten), while still referencing the start coordinates?
// How to make a new body take the coordinates of the old body in an array?
// How to trigger when the head hits the body?
