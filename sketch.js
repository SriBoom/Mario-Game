var PLAY=1;
var END=0;
var SERVE;
var gameState=SERVE;
var backgroundImg, bg, clouds, coins, enemy, pipe, bullet, playText, gameOver;
var ground, player, marioImage,groundImg, cloudImg, coinImg, enemyImg, pipeImg,marioDeadImg, bulletImg, playTextImg, gameOverImg;
var cloudsGroup, coinGroup, enemyGroup, pipeGroup, bulletGroup;
var points = 0;
var score=0;

function preload(){
 backgroundImg = loadImage("Background Image.jpg");
 marioImage=loadAnimation("mario2.png", "mario1.png");
 groundImg=loadImage("ground.png");
 cloudImg=loadImage("cloud.png");
 coinImg=loadImage("coin.png");
 enemyImg=loadAnimation("enemy1.png", "enemy2.png");
 pipeImg=loadImage("pipes.png");
 marioDeadImg=loadAnimation("marioDead","mario_dead.png");
 bulletImg=loadImage("bullet.png");
 playTextImg=loadImage("text.png");
 gameOverImg=loadImage("gameOver.png");
}

function setup() {
 createCanvas(windowWidth,windowHeight-20);

 //bg=createSprite(windowWidth,windowHeight);
 //bg.addImage(backgroundImg);
 //bg.scale=3;

 ground = createSprite(500, 800, windowWidth, 10);
 ground.addImage(groundImg);
 ground.velocityX = -10;
 ground.x=ground.width/2;

 player = createSprite(200, 650, 50, 50);
 player.addAnimation("mario_running",marioImage);
 player.scale = 0.55;

 playText=createSprite(900, 200);
 playText.addImage(playTextImg);

 gameOver=createSprite(900, 200);
 gameOver.addImage(gameOverImg);

cloudsGroup = new Group();
coinGroup = new Group();
enemyGroup = new Group();
pipeGroup = new Group();
bulletGroup = new Group();

score=0;
}

function draw() {
 background(94, 145, 254); 

 strokeWeight(20);
 fill("white");
 text("Points: "+points, 1000, 100);
 fill("black");
 text("Score: "+ score, 1300, 100);

 if(gameState===SERVE){
   text("Press space to start", 200, 200);
    playText.visible=true;
    gameOver.visible=false;
    ground.velocityX=0;
 }

 if(keyDown("space")){
    gameState=PLAY;
    playText.visible=false;
 }

 if(gameState===PLAY){
    ground.velocityX=-10;

    gameOver.visible=false;
    
    ground.velocityX = -(4 + 3* score/100)

   score = score + Math.round(frameCount/60);

   if(ground.x < 500){
      ground.x=ground.width/2;
   }
  
   if(keyDown("UP_ARROW")){
     player.velocityY=-12;
   }

   if(keyDown("space")){
      spawnBullet();
     bullet.velocityX=15;
   }

   if(bulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      points+=3;
   }

   player.velocityY=player.velocityY+0.5;
  
   if(player.isTouching(coinGroup)){
      points+=1
      coinGroup.destroyEach();
   }
  
   if(player.isTouching(enemyGroup) || player.isTouching(pipeGroup)){
      gameState=END;
   }
   spawnClouds();
   spawnCoins();
   spawnEnemy();
   spawnPipes();
 } else if(gameState===END){
   gameOver.visible=true;
   text("Press R to reset", 200, 200);
   player.visible=false;
   //bullet.visible=false;
   player.changeAnimation("marioDead",marioDeadImg);
   enemyGroup.destroyEach();
   pipeGroup.destroyEach();
   coinGroup.destroyEach();
   cloudsGroup.destroyEach();
   ground.velocityX=0;
   points=0;
   score=0;

   if(keyDown("r")){
      reset();
   }
 }

 
 player.collide(ground);

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
     if(frameCount%100===0){
        coins=createSprite(random(300, 500), random(500, 600), 100, 100);
        coins.addImage(coinImg);
        coins.velocityX=-3;
        coins.lifetime=250;
        coinGroup.add(coins);
     }
 }

 function spawnEnemy(){
   if(frameCount%200===0){
      enemy=createSprite(800, 740, 50, 50);
      enemy.addAnimation("enemy",enemyImg);
      enemy.scale=0.2;  
      enemy.velocityX=-10;
      enemy.lifetime=250;
      enemyGroup.add(enemy);
   }
}

function spawnPipes(){
   if(frameCount%600===0){
      pipe=createSprite(800, 720, 50, 50);
      pipe.addImage(pipeImg);
      pipe.scale=0.6;
      pipe.velocityX=-4;
      pipe.lifetime=250;
      pipeGroup.add(pipe);
   }
} 

function spawnBullet(){
   bullet=createSprite(200,650,50,50);
   bullet.addImage(bulletImg);
   bullet.y=player.y;
   bulletGroup.add(bullet);
}

function reset(){
   gameState=SERVE;
   player.visible=true;
}