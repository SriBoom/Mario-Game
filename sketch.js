var backgroundImg, bg, clouds;
var ground, player, marioImage,groundImg, cloudImg;
var cloudsGroup;

function preload(){
 backgroundImg = loadImage("Background Image.jpg");
 marioImage=loadAnimation("mario2.png", "mario1.png");
 groundImg=loadImage("ground.png");
 cloudImg=loadImage("cloud.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight);

 //bg=createSprite(windowWidth,windowHeight);
 //bg.addImage(backgroundImg);
 //bg.scale=3;

 ground = createSprite(500, 750, windowWidth, 10);
 ground.addImage(groundImg);
 ground.velocityX = -10;
 ground.x=ground.width/2;

 player = createSprite(200, 620, 50, 50);
 player.addAnimation("mario_running",marioImage);
 //player.scale = 0.01;

cloudsGroup = new Group();
}

function draw() {
 background(94, 145, 254); 

 if(ground.x < 500){
    ground.x=ground.width/2;
 }

 
 // player.collide(ground);
 spawnClouds();
drawSprites();
}

 function spawnClouds(){
     if(frameCount%50===0){
     clouds = createSprite(1500, random(200, 450), 100, 100);
     clouds.addImage(cloudImg);
     clouds.scale=3;
     clouds.velocityX=-15;
     clouds.lifetime = 200;
     cloudsGroup.add(clouds);
    }
 }