//snake
var s;

//variable to keep track of grid size
var scl = 20;

//object the snake attempts to eat
var food;

// for red, green, and blue color values
var r, g, b;

//scoring feature 
var scoreElem;


//sets up canvas which is actual a grid and drawing ability 
function setup(){

    //score setup
    scoreElem = createDiv('Score = 0');
    scoreElem.position(20, 20);
    scoreElem.id = 'score';
    scoreElem.style('color', 'black');

    // width, height of canvas
    createCanvas(900, 500)
    s = new Snake();
    frameRate(10);
    pickLocation(); 

    //used for change colors of food
    r = random(255);
    g = random(255);
    b = random(255);

}

// carries out the rendering elements to make everything visible
function draw(){
    background(10);
    s.update();
    s.show();
    if (s.eat(food)){
        pickLocation();
    }
    //var food features and changes color at keyPressed function
    fill(r, g, b)
    rect(food.x, food.y, scl, scl) 
    //checkGameStatus();

}

// puts the snake's food in a random location after it is eaten
function pickLocation(){
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl)
    
    //updates the score each time the food is eaten
    prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
}


// key press functions from P5 Library 
function keyPressed(){
    if (keyCode === UP_ARROW){
        s.dir(0, -1)
        r = random(255);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
        g = random(255);
    }
    else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
        b = random(255);
    }
    else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
        r = random(255);
    }
}

//actual snake object (well, an not actual snake)
function Snake(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0; 
    //snake starts off as one block (the 0 index)
    this.total = 0;
    //as it grows, the tail gets longer with each new index in the array
    this.tail = [];

    //created function dir for keyPressed
    this.dir = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(pos){
        var d = dist(this.x, this.y, pos.x, pos.y)
        if (d < 1){
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.update = function(){
        if (this.total === this.tail.length){
            //for loop to increase tail size
            for (var i = 0; i < this.tail.length - 1; i++){
                this.tail[i] = this.tail[i+1];
            }  
        }
        
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);


    }

    this.show = function(){
        // draws tail and extends tail
        fill(255);
        for (var i = 0; i < this.tail.length - 1; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }  
        for (var i = 0; i < this.total; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl)
        }
        rect(this.x, this.y, scl, scl)
    }
}

//




  function checkGameStatus() {
    if (this.x[this.x.length - 1] > width ||
        this.x[this.x.length - 1] < 0 ||
        this.y[this.y.length - 1] > height ||
        this.y[this.y.length - 1] < 0 ||
        checkSnakeCollision()) {
        
            var scoreVal = parseInt(scoreElem.html().substring(8));
            scoreElem.html('Game ended! Your score was : ' + scoreVal);
        }
  }



  /*
 
*/
function checkSnakeCollision() {
    var snakeHeadX = this.x[this.x.length - 1];
    var snakeHeadY = this.y[this.y.length - 1];
    for (var i = 0; i < this.x.length - 1; i++) {
      if (this.x[i] === snakeHeadX && this.y[i] === snakeHeadY) {
        return true;
      }
    }
  }
