var s;

//variable to keep track of grid size
var scl = 20;

//object the snake attempts to eat
var food;

//sets up canvas which is actual a grid and drawing ability 
function setup(){
    createCanvas(600, 600)
    s = new Snake();
    frameRate(10);
    pickLocation();
}

// puts the snake's food in a random location after it is eaten
function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl)
}

// carries out the rendering elements to make everything visible
function draw(){
    background(51);
    s.update();
    s.show();
    if (s.eat(food)){
        pickLocation();
    }

    //var food features
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl)
}

// key press functions from P5 Library 
function keyPressed(){
    if (keyCode === UP_ARROW){
        s.dir(0, -1)
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    }
    else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    }
    else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}

//actual snake object (well not actual snake)
function Snake(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0; 

    //created function dir for keyPressed
    this.dir = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(pos){
        var d = dist(this.x, this.y, pos.x, pos.y)
        if (d < 1){
            return true;
        } else {
            return false;
        }
    }

    this.update = function(){
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);

    }

    this.show = function(){
        fill(255);
        rect(this.x, this.y, scl, scl)
    }
}