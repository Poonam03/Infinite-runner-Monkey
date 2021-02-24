//Global Variables
var monkey, mImage, ground, gImage, banana, bImage, jungle,jImage, stone,sImage, gameOver, goImage, restart, rImage,iGround, foodGroup, obstaclesGroup, score;

var PLAY=1;
var END=0;
var gameState= PLAY;

function preload()
{
  mImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  gImage = loadImage("ground2.png");
  bImage= loadImage ("banana.png");
  jImage = loadAnimation("jungle2.jpg","jungle2.jpg","jungle2.jpg","jungle2.jpg","jungle2.jpg");
  sImage =loadImage ("stone.png");
  goImage = loadImage("gameOver.png");
  rImage = loadImage ("restart.png");
}
function setup()
{
  createCanvas(600,300);
  
  jungle = createSprite(300,150,20,20);
  jungle.addAnimation("jungle",jImage);
    
  monkey = createSprite(200,280,20,20);
  monkey.addAnimation("walking",mImage);
  monkey.scale=0.1;
  
  gameOver = createSprite(monkey.x,160,20,20);
  gameOver.addImage("game over",goImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart = createSprite(monkey.x,200,20,20);
  restart.addImage("restart",rImage);
  restart.scale=0.5;
  restart.visible=false;
  
  iGround=createSprite(300,290,600,20);
  iGround.visible=false;
  
  foodGroup=createGroup();
  ObstaclesGroup=createGroup();
  
  score=0;
}

function draw(){
 background("white"); 
  //console.log(monkey.y);
  monkey.collide(iGround);
 
  if(gameState===1)
  {
    camera.x=monkey.x
    iGround.x=monkey.x
    jungle.x=monkey.x
    if(keyIsDown(RIGHT_ARROW))
    {
      monkey.x+=5
    }
    if(keyIsDown(LEFT_ARROW))
    {
      monkey.x-=5
    }
    //jungle.velocityX=-4;
  
    /*if(jungle.x<0)
    {
      jungle.x=jungle.width/2;
    }*/

      if(keyDown("space")&&monkey.y>=249)
    {
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.5;

      spawnObstacle();
    spawnFood();
    
    if(foodGroup.isTouching(monkey))
    {
      score=score+2;
      foodGroup.destroyEach();
    }

    switch(score){
      case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break;
      case 40: monkey.scale=0.18;
      break;
      default: break;
    }
    
    if(ObstaclesGroup.isTouching(monkey))
    {
     monkey.scale=0.1;
      gameState=0;
      gameOver.visible=true;
      restart.visible=true;
      gameOver.x=monkey.x+200
      restart.x=monkey.x+200
    }

}
  else if(gameState===0)
  {
    jungle.velocityX=0;
    monkey.velocityY=0;
    ObstaclesGroup.setVelocityEach(0,0);
    foodGroup.setVelocityEach(0,0);
    ObstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
   
  }
  if(mousePressedOver(restart))
  {
      reset();
  }
  drawSprites();
  fill("white")
  text("Survival Rate: "+score, monkey.x,100);
}

function reset()
{
    gameState=1;
    ObstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    monkey.scale=0.1;
    gameOver.visible=false;
    restart.visible=false;
    score=0;
}
function spawnFood()
{
  if(frameCount%100===0)
  {
    banana = createSprite(monkey.x+100,random(120,140),20,20);
    banana.addImage("banana",bImage);
    banana.scale=0.07;
    //banana.velocityX=-6;
    banana.lifetime=50;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    foodGroup.add(banana);
  }
}
function spawnObstacle()
{
  if(frameCount%200===0)
  {
  
    stone = createSprite(monkey.x+200,260,20,20);
    stone.addImage("stone",sImage);
    stone.scale=0.1;
   // stone.velocityX=-6;
    stone.lifetime=50;
    ObstaclesGroup.add(stone);
  }
}