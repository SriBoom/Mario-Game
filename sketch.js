var backgroundImg, bg, clouds, coins, enemy;
var ground, player, marioImage,groundImg, cloudImg, coinImg, enemyImg;
var cloudsGroup, coinGroup, enemyGroup;

function preload(){
 backgroundImg = loadImage("Background Image.jpg");
 marioImage=loadAnimation("mario2.png", "mario1.png");
 groundImg=loadImage("ground.png");
 cloudImg=loadImage("cloud.png");
 coinImg=loadImage("coin.png");
 enemyImg=loadAnimation("enemy1.png", "enemy2.png");
}

function setup() {
 createCanvas(windowWidth/0.5,windowHeight);

 //bg=createSprite(windowWidth,windowHeight);
 //bg.addImage(backgroundImg);
 //bg.scale=3;

 ground = createSprite(500, 800, windowWidth, 10);
 ground.addImage(groundImg);
 ground.velocityX = -10;
 ground.x=ground.width/2;

 player = createSprite(200, 620, 50, 50);
 player.addAnimation("mario_running",marioImage);
 player.scale = 0.5;

cloudsGroup = new Group();
coinGroup = new Group();
enemyGroup = new Group();
}

function draw() {
 background(94, 145, 254); 

 if(ground.x < 500){
    ground.x=ground.width/2;
 }

 if(keyDown("space")){
   player.velocityY=-10;
 }
 player.velocityY=player.velocityY+0.5;

 if(player.isTouching(coinGroup)){
    coinGroup.destroyEach();
 }

 
 player.collide(ground);
 spawnClouds();
 spawnCoins();
 spawnEnemy();
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

 function spawnCoins(){
     if(frameCount%50===0){
        coins=createSprite(random(300, 500), random(500, 600), 100, 100);
        coins.addImage(coinImg);
        coins.velocityX=-3;
        coins.lifetime=250;
        coinGroup.add(coins);
     }
 }

 function spawnEnemy(){
    if(frameCount%200===0){
       enemy-createSprite(random(400, 600), 620, 50, 50);
       enemy.addAnimation("enemy",enemyImg);
       enemy.velocityX=-6;
       enemy.lifetime=250;
       enemyGroup.add(enemy);
    }
 }