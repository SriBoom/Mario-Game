var backgroundImg, bg;
var ground, player, image;

function preload(){
 backgroundImg = loadImage("Background Image.jpg");
 image=loadAnimation("mario2.png", "mario1.png");
}



function setup() {
 createCanvas(windowWidth,windowHeight);

 ground = createSprite(500, 530, 5000, 10);
 ground.visible = false;

 player = createSprite(200, 300, 50, 50);
 player.scale = 0.01;
 player.addAnimation("mario_running",image);

 bg=createSprite(0,0, windowWidth, windowHeight);
 bg.addImage(backgroundImg);
 bg.scale=3;
 bg.velocityX = -7;
}

function draw() {
 background("blue"); 

 if(bg.x<0){
  bg.x=bg.width/2;
 }

 // player.collide(ground);
 drawSprites();
}