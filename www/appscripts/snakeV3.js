console.log("Yo, I am alive!");

// Connecting to the Server
//let iosocket = io.connect();
let uname = prompt("Please enter your name");
uname = uname || "Anon";
alert("Hello " + uname + "! Welcome to Eat or Die. The instructions are simple. You have 15 seconds to eat the mimimum number of food to survive to the next level. As the level gets higher, so does the required number of food to survive. You may adjust the speed on the left, but remember: The faster you move, the harder it is to control. At game-over, your result will be published on the right to see how you fare against your fellow eaters.")

//=================================== Canvas Code ===================================
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

//=================================== Parameters ====================================
// Cell Global Parameters
let size = 25
let numrow = pWidth/size
let numcol = pHeight/size
let direction = 'stop';
let j = 1
let newX = []
let newY = []
let points = 0
let level = 1
let minpts = 2
let mintime = 15
let slider = document.getElementById("slider")
let speedlevel = 1
let initialspeed = 100
let speed = initialspeed*speedlevel

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
        "stroke" : 'rgba(255,255,255,0.5)',
        //"stroke" : 0
    })
    pathcol[i].attr({
        "stroke" : 'rgba(255,255,255,0.5)',
        //"stroke" : 0
    })
}

//=================================== Snake Creation Code ===========================

// Creating Snake Head
head = paper.rect(size*numrow/2, size*numcol/2, size, size)
head.attr({
    'stroke-width' : 0,
    'fill' : 'rgba(0,100,50,0.5)',
})

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

let food = paper.rect(xcoord, ycoord, size, size, size/2)
food.attr({
    'fill' : 'rgba(100, 65, 30, 0.8)',
    'stroke' : 0
})

//=================================== Timer (Start) =================================

// Initializes the start time
let startTime = Date.now()
let gameTime;
let timer = 0;

//=================================== Initializing Game =============================

document.getElementById("myAside").innerHTML = "<br>Time:<br>" + timer + " sec / " + mintime + " sec"
document.getElementById("myFooter").innerHTML = "<br>Points: " + points + " / " + minpts + " to Next Level"
document.getElementById("sidebartext").innerHTML = "<br><br>Level<br>" + level

//=================================== Start Game ====================================

let start = paper.rect(pWidth*0.25,pHeight*0.44, pWidth*0.5,pHeight*0.11);
start.attr({
    "fill" : "#999",
    "stroke-width" : 1
});

let text = "Move Arrowkey to Start"
let startText = paper.text(pWidth*0.5, pHeight*0.5, text)
startText.transform("s1.5")

// Start Game State
let startGame = function(){
    
    if(direction == "stop"){
        startTime = Date.now()
        start.show()
        startText.show()
    }else{
        start.hide()
        startText.hide()
        gameTime = Date.now()
        timer = Math.floor(gameTime/100) - Math.floor(startTime/100)
        timer = timer/10
        document.getElementById("myAside").innerHTML = "<br>Time:<br>" + timer + " sec / " + mintime + " sec"
}
}

//=================================== End Game ======================================

// End Game State
let endGame = function(){
    direction = "stop"
    timer = 0
    points = 0
    document.getElementById("myFooter").innerHTML = "<br>Points: " + points
    head.xpos = size*numrow/2
    head.ypos = size*numcol/2
}

//=================================== Movement Code ==================================

// Movement Function
let move = function(){
    head.attr({'x': head.xpos, 'y': head.ypos});

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
    if (direction == "stop"){
        head.yrate = 0
        head.xrate = 0
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

        points ++

// Updates Points
        document.getElementById("myFooter").innerHTML = "Points: " + points + " / " + minpts + " to Next Level"
    }
// Updates Speed
    document.getElementById("sidebartext").innerHTML = "<br><br>Level<br>" + level +"<br><br>Speed: " + Math.floor(slider.value*40)

// If Requirements are Met, Level Up
    if(points >= minpts){
        endGame()
        level++
        minpts++
    }

// If Requirements are Not Met, End Game
    if(timer >= mintime){
// Game Over Alert
        alert("Game Over! Your Highest Level is: " + level)

// Send to Server 
        iosocket.send({
            "username" : uname,
            "data" : level,
            "speed" : Math.floor(slider.value*40)
        });

// Adds Score to Scoreboard
        document.getElementById("scores").innerHTML += uname + ": " + level + " (" + Math.floor(slider.value*40) + ")" + "<br>"
        endGame()
        level = 1
        minpts = 2

    }
}

// Set Interval for Movement
setInterval(startGame,75)
let movement = setInterval(move, speed)

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

// Event Listener for Speed Slider
document.addEventListener('input', function(ev){
    clearInterval(movement)
    speed = Math.floor(initialspeed/slider.value)
    movement = setInterval(move, speed)
})

//=============================== Header Canvas Code ================================
let header =  new Raphael(document.getElementById("myHeader"));
let hWidth = header.width;
let hHeight = header.height;

let hbg = header.rect(0,0, hWidth, hHeight);
hbg.attr({
    "stroke-width" : 0,
});

head2 = header.rect(hWidth/2-size/2, hHeight/2-size/2, size, size)
head2.attr({
    'stroke-width' : 0,
    'fill' : 'rgba(0,100,50,0.5)',
})

let headertext = header.text(hWidth/2, hHeight/2, "Eat or Die")
headertext.node.style.fontSize = "30px"
headertext.node.style.fontWeight = "bold"

// Header Movement Variables
head2.xpos = head2.attrs.x;
head2.xrate = 0.1*size

let headermove = function(){
    head2.attr({'x' : head2.xpos})
    headertext.attr({'x' : head2.xpos+100})
    head2.xpos += head2.xrate
    if (head2.xpos > hWidth-size){
        head2.xpos = 0;
    }
}

setInterval(headermove,20)

//=================================== Server Code ====================================
// Asking for Player's Name
/*let uname = prompt("Please enter your name");
uname = uname || "Anon";

// Game Instructions
alert("Hello " + uname + "! Welcome to Eat or Die. The instructions are simple. You have 15 seconds to eat the mimimum number of food to survive to the next level. As the level gets higher, so does the required number of food to survive. You may adjust the speed on the left, but remember: The faster you move, the harder it is to control. At game-over, your result will be published on the right to see how you fare against your fellow eaters.")

iosocket.on('connect', function () {
    console.log("Yo.........connected!");

// Receiving Data for Scoreboard
    iosocket.on('message', function(m){
        console.log('received')
        document.getElementById("scores").innerHTML += m.username + ": " + m.data + " (" + m.speed + ")" + "<br>"

    });
    //---------------------------------------
    
    iosocket.on('disconnect', function(){
        console.log("Disconnected")
    });
});

// Updating Name to Bottom Right
document.getElementById('myAside3').innerHTML = "<br>" + uname
*/