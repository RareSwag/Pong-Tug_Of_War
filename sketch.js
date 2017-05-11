var swidth = 600;
var sheight = 400;
var verticalr = sheight / 2;
var verticall = sheight / 2;
var ball = {
    x : swidth / 2,
    y : sheight / 2,
    size : 10,
    speedx : 5,
    speedy : 5,
    r : 255,
    g : 255,
    b : 255
};
var tug = {
  p1 : 300,
};
var turnl = false;
var turnr = false;

function setup() {
  createCanvas(swidth, sheight);
}



function makeTug(){
  stroke(0)
  fill(255, 255, 255);
  rect(tug.p1, 0, 600, 600);
}

function pongBars(){
  fill(255, 255, 255);
  noStroke();
  rect(50, verticall, 10, 100);
  fill(0, 0, 0);
  noStroke();
  rect(swidth - 50, verticalr, 10, 100);
}

function makeBall(){
    fill(ball.r, ball.g, ball.b);
    noStroke();
    rect(ball.x , ball.y, ball.size, ball.size);
}


function moveRightBars(){
  //Move Bars
  if (keyIsDown(UP_ARROW)){
    verticalr = verticalr - 3;
  } else if (keyIsDown(DOWN_ARROW)){
      verticalr = verticalr + 3;
    }
  //Bars can't go offscreen
    if (verticalr < 0){
      verticalr = 0;
    } else if (verticalr + 100 > sheight) {
      verticalr = sheight - 100;
  }
}

function moveLeftBars(){
  //Move Bars
  if (keyIsDown(87)){
    verticall = verticall - 3;
  } else if (keyIsDown(83)){
      verticall = verticall + 3;
    }
  //Bars can't go offscreen
  if (verticall < 0){
    verticall = 0;
  } else if (verticall + 100 > sheight) {
    verticall = sheight - 100;
  }
}

function moveBall(){
    ball.x = ball.x + ball.speedx;
    ball.y = ball.y + ball.speedy;
    if (ball.y < 0) {
    ball.speedy = ball.speedy * -1;
  } else if (ball.y > sheight -6){
    ball.speedy = ball.speedy * -1;
  }

  if (ball.x < 0) {
      ball.speedx = ball.speedx * -1;
    } else if (ball.x > swidth - 5){
      ball.speedx = ball.speedx * -1;
  }
}

function update() {
  if (ball.x <= 56 && ball.x >= 50 && ball.y >= verticall && ball.y <= verticall + 100 ){
    turnl = true;
  } else {
    turnl = false;
}

if (ball.x <= swidth - 50 && ball.x >= swidth - 56 && ball.y >= verticalr && ball.y <= verticalr + 100 ){
  turnr = true;
} else {
  turnr = false;
}

  if(turnl === true || turnr === true){
   ball.speedx = ball.speedx * -1;
  }

  if (ball.x <= -1) {
    tug.p1 = tug.p1 - 25
  }
  if(ball.x >= swidth - 4){
    tug.p1 = tug.p1 + 25
  }
}

function colorChange(){
  if(ball.x > tug.p1){
    ball.r = 0;
    ball.g = 0;
    ball.b = 0;
  } else {
    ball.r = 255;
    ball.g = 255;
    ball.b = 255;
  }
}

function checkWin(){
  if(tug.p1 <= 50){
    ball.speedx = 0;
    ball.sppedy = 0;
    ball.size = 0;
    fill(255);
    rect(0 , 0, swidth - 1, sheight - 2);
    fill(0);
    noStroke();
    textSize(40);
    textAlign(CENTER);
    text("RIGHT SIDE WINS!" , swidth / 2, sheight / 2);
  } else if (tug.p1 >= 550){
    ball.speedx = 0;
    ball.sppedy = 0;
    ball.size = 0;
    fill(0);
    rect(0 , 0, swidth - 1, sheight - 2);
    fill(255);
    noStroke();
    textSize(40);
    textAlign(CENTER);
    text("LEFT SIDE WINS!" , swidth / 2, sheight / 2);
  }
}


function draw() {
  background(0);
  makeTug();
  pongBars();
  makeBall();
  moveLeftBars();
  moveRightBars();
  moveBall();
  update();
  colorChange();
  checkWin();
  fill(0, 0, 0, 0)
  stroke(0);
  rect(0 , 0, swidth - 1, sheight - 2);
}
