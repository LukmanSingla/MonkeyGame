
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime=0, ground,rate=0.1;
const PLAY=1;
const END=0;
var gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500,400)
  monkey=createSprite(50,250,50,50);

  monkey.addAnimation("monkey",monkey_running);


  monkey.scale=0.1;
  ground=createSprite(250,270,500,20);
  FoodGroup=new Group();
  obstacleGroup=new Group();
}


function draw() {
    background("white");
    drawSprites();
if(gameState==PLAY){

  if((keyDown("space") && monkey.y>228) || (keyDown("up") && monkey.y>228)){
    monkey.velocityY=-20;
  }
      monkey.velocityY++;
  if(frameCount%110==0){
     spawnBanana();
   }

  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }


  survivalTime=survivalTime+rate;
  if(frameCount%250==0){
    spawnObstacles();
   }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
    monkey.setVelocity(0,0);
  }

}else{
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
    text("GAME OVER",230,150);
  if(mouseWentDown("left")){
    gameState=PLAY;
    survivalTime=0;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
  }
}
  monkey.collide(ground);


  text(mouseX + ","+mouseY,mouseX,mouseY);
  text("Survival Time: " + Math.floor(survivalTime),220,30);
  

}

function spawnBanana(){
  banana=createSprite(500,Math.round(random(50,140)),50,50);
  banana.addAnimation("banana",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-5-(Math.floor(frameCount/500));
  banana.lifetime=100;
  FoodGroup.add(banana);
}

function spawnObstacles(){
  obstacle=createSprite(500,240,50,50);
  obstacle.addAnimation("obstacle",obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-5-(Math.floor(frameCount/500));
  obstacle.lifetime=100;
  obstacleGroup.add(obstacle);
}
