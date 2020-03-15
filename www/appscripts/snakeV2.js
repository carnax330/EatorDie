
console.log("Yo, I am alive!");

//=================================== Canvas Code ===================================
// Creating Canvas
let paper =  new Raphael(document.getElementById("svgcanvas"));
let pWidth = paper.width;
let pHeight = paper.height;
console.log(pWidth,pHeight);

let bg = paper.rect(0,0, pWidth,pHeight);
bg.attr({
	"fill" : "#fff",
	"stroke-width" : 0,
	"fill-opacity" : 0.2
});

//=================================== Parameters ====================================
// Cell Global Parameters
let size = 25
let numrow = pWidth/size
let numcol = pHeight/size
let direction = 'right';
let snake = []
let growth = false
let j = 1
let newX = []
let newY = []

// Creating Grid Parameters
let row = []
let col = []
let pathrow = []
let pathcol = []
let psrow = []
let pscol = []
let pscell = []
let cell = []
let rownext = []
let colnext = []

//=================================== Grid Code ====================================

// Creating Background Grid
for (i = 0; i < numrow; i++){
    row[i] = 0 + size*i
    col[i] = 0 + size*i

    psrow[i] = "M " + row[i] + ",0 L " + row[i] + "," + pHeight
    pscol[i] = "M 0," + col[i] + " L " + pWidth + "," + col[i]
    pathrow[i] = paper.path(psrow[i])
    pathcol[i] = paper.path(pscol[i])
    pathrow[i].attr({
        "stroke" : '#BBB',
        //"stroke" : 0
    })
    pathcol[i].attr({
        "stroke" : '#BBB',
        //"stroke" : 0
    })
}

//=================================== Snake Creation Code ===========================

// Creating Snake Head
snake[0] = paper.rect(size*numrow/2, size*numcol/2, size, size)
let head = snake[0]
head.attr({
    'stroke-width' : 0,
    'fill' : 'rgba(0,100,50,0.5)',
})

// Creating Snake Tail
let grow = function(){
    snake.push(paper.rect(newX[j], newY[j], size, size))
    snake[j].attr({
    'stroke-width' : 0,
    'fill' : 'rgba(0,100,50,0.5)',
    })
}

// Snake Movement Variables
head.xpos = head.attrs.x;
head.ypos = head.attrs.y;
head.xrate = size
head.yrate = size

//=================================== Food Creation Code =============================

// Random Generator Function
function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
let xcoord = randInt(pWidth)
xcoord = xcoord - xcoord%size

let ycoord = randInt(pHeight)
ycoord = ycoord - ycoord%size

let food = paper.rect(xcoord, ycoord, size, size, size/3)
food.attr({
    'fill' : 'rgba(100, 65, 30, 0.8)',
    'stroke' : 0
})

//=================================== Movement Code ==================================

// Movement Function
let move = function(){
    head.attr({'x': head.xpos, 'y': head.ypos});
    //console.log(snake)

// Movement States
    if (direction == "up"){
        head.xrate = 0
        head.yrate = size
        head.ypos += -head.yrate;
    }
    if (direction == "right"){
        head.yrate = 0
        head.xrate = size
        head.xpos += head.xrate;
    }
    if (direction == "down"){
        head.xrate = 0
        head.yrate = size
        head.ypos += head.yrate;
    }
    if (direction == "left"){
        head.yrate = 0
        head.xrate = size
        head.xpos += -head.xrate;
    }

// Removing Wall Boundaries
    if (head.xpos > pWidth-size) {
        head.xpos = 0;
    }
    if (head.xpos < 0) {
        head.xpos = pWidth-size;
    }
    if (head.ypos > pHeight-size) {
        head.ypos = 0;
    }
    if (head.ypos < 0) {
        head.ypos = pHeight-size;
    }

// Refreshing Food After Eaten
    if(head.attrs.x == food.attrs.x && head.attrs.y == food.attrs.y){
        
        xcoord = randInt(pWidth)
        xcoord = xcoord - xcoord%size
        ycoord = randInt(pHeight)
        ycoord = ycoord - ycoord%size
        food.attr({
            'x' : xcoord,
            'y' : ycoord
        })

        growth = true
    }

// Snake Growth with Food
    if (growth == true){
        grow()
        growth = false
        j++
    }
    //console.log(snake[j-1])
    snake[j-1].attr({'x' : newX[j-1], 'y' : newY[j-1]})
    newX[j-1] = head.xpos
    newY[j-1] = head.ypos
}

// Set Interval for Snake Movement
setInterval(move,75)

//=================================== Event Listeners ====================================

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