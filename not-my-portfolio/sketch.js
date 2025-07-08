/* MAKE CANVAS THE SIZE OF THE WEBPAGE */
var canvas;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
}


/* DRAW CIRCLES WITH PERTAINING COLORS 

var learning; 
var people; 
var reading;
var writing;
var craft;

function draw() {
  strokeWeight(3);
  fill(0, 0, 0);
  stroke(137, 216, 75);
  learning = circle(800, 400, 600);
 
  stroke(208, 133, 227);
  people = circle(800, 450, 500);
  
  stroke(133, 182, 227);
  reading = circle(800, 500, 400);
  
  stroke(243, 232, 133);
  writing = circle(800, 550, 300);

  stroke(252, 252, 252);
  craft = circle(800, 600, 200);

}
*/
  
  
  