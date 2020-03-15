
console.log("Yo, I am alive!");
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

// Cell Global Parameters
let size = 70
let numrow = pWidth/size
let numcol = pHeight/size
let row = []
let col = []
let pathrow = []
let pathcol = []


// Creating Grid Parameters
let i = 0
let j = 0
let psrow = []
let pscol = []
let pscell = []
let cell = []
let rownext = []
let colnext = []
let grid = []

// Cell Creation Function
/*
let draw = function(){
	cell[i] = paper.rect(row[i], col[j], size, size)
	cell[i].attr({
		'fill' : 'rgba(255,0,0,0.3)'
	})
}
*/

while (i <= numrow){
// Creating Background Grid
	row[i] = 0 + size*i
	col[i] = 0 + size*i
	
	psrow[i] = "M " + row[i] + ",0 L " + row[i] + "," + pHeight
	pscol[i] = "M 0," + col[i] + " L " + pWidth + "," + col[i]
	pathrow[i] = paper.path(psrow[i])
	pathcol[i] = paper.path(pscol[i])
	pathrow[i].attr({
		"stroke" : '#BBB'
	})
	pathcol[i].attr({
		"stroke" : '#BBB'
	})

// Add to Array
	i++
}

let toptog = true
let righttog = true
let bottomtog = true
let lefttog = true
// Creating Individual Cell Obj
for (j=0; j<=numcol; j++){
	for (i=0; i<numrow; i++){
		//draw()
		cell[i] = paper.rect(row[i], col[j], size, size)
		let top = "M " + row[i] + "," + col[j] + " L " + row[i+1] + "," + col[j]
		let right = "M " + row[i+1] + "," + col[j] + " L " + row[i+1] + "," + col[j+1]
		let bottom = "M " + row[i+1] + "," + col[j+1] + " L " + row[i] + "," + col[j+1]
		let left = "M " + row[i] + "," + col[j+1] + " L " + row[i] + "," + col[j]
		cell[i].attr({
			'fill' : 'rgba(255,0,0,0.3)',
			"stroke-width" : 0,
		})
		if (toptog == true){
			cell[i].attr({
				"top" : paper.path(top),
		})
		}
		if (righttog == true){
			cell[i].attr({
				"right" : paper.path(right),
		})
		}
		if (bottomtog == true){
			cell[i].attr({
				"top" : paper.path(bottom),
		})
		}
		if (lefttog == true){
			cell[i].attr({
				"top" : paper.path(left),
		})
		}
		if (cell[i].visited == true){
			cell[i].attr({
				'fill' : 'rgba(255,0,0,0.3)',
		})
			
		}
	}
}

// Maze Generator
/*
let start = paper.getById(23)
//paper.getById(23).hide()
start = ({
	"visited" : true
})
console.log(start.visited)
*/