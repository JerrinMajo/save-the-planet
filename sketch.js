var Hawkeye,HawkeyeImg;
var backgroundImg,backgroun1Img;
var arrow,arrowImg,arrowGroup;
var zombies,zombieImg,zombiesGroup;
var gameState="serve";
var score=0;
var start,startImg;
var restart,restartImg;
var heart1,heart1Img;
var heart2,heart2Img;
var heart3,heart3Img;
var life=3;
var gameOver,gameOverImg;
var beware,bewareImg;



function preload(){
  HawkeyeImg=loadImage("assets/hawkeye1.png");
  backgroundImg=loadImage("assets/background.png");
  arrowImg=loadImage("assets/arrow.png");
  zombieImg=loadImage("assets/chitauri2.png");
  startImg=loadImage("assets/start.png");
  restartImg=loadImage("assets/restart.png");
  heart1Img=loadImage("assets/heart_1.png");
  heart2Img=loadImage("assets/heart_2.png");
  heart3Img=loadImage("assets/heart_3.png");
  gameOverImg=loadImage("assets/gameOver.png");
  background1Img=loadImage("assets/background1.jfif");
  bewareImg=loadImage("assets/beware.png");

}

function setup(){
  createCanvas(windowWidth,windowHeight);

  Hawkeye=createSprite(200,450);
  Hawkeye.addImage("player",HawkeyeImg);
  Hawkeye.scale=0.7;
  
  //player.debug=true;
  Hawkeye.setCollider("rectangle",-20,-15,100,250);
  
  start=createSprite(650,500);
  start.addImage("start",startImg);
  start.scale=0.5;

  

  heart1=createSprite(1080,150);
  heart1.addImage("heart1",heart1Img);
  heart1.scale=0.3;
  heart1.visible=false;

  heart2=createSprite(1080,150);
  heart2.addImage("heart1",heart2Img);
  heart2.scale=0.3;
  heart2.visible=false;

  heart3=createSprite(1080,150);
  heart3.addImage("heart1",heart3Img);
  heart3.scale=0.3;
  heart3.visible=false;

  gameOver=createSprite(650,150);
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.scale=1;
  gameOver.visible=false;

  restart=createSprite(650,200);
  restart.addImage("restart",restartImg);
  restart.scale=0.4;
  restart.visible=false;

  beware=createSprite(420,395);
  beware.addImage("beware",bewareImg);
  beware.scale=0.2;
  beware.visible=false;

  zombiesGroup=new Group();
  arrowGroup=new Group();

}
function draw(){
  

  if(gameState === "serve"){
    background(background1Img);
    Hawkeye.visible=false;
    beware.visible=true;
    textSize(30);
    strokeWeight(5)
    stroke("red");
    fill("yellow");
    text("You are Hawkeye",520,100);
    textSize(30);
    stroke("red");
    fill("yellow")
    text("trying to save a planet from Chitauri army",370,150);
    textSize(30);
    stroke("blue");
    fill("white")
    text("Kill the Chitauri army before",460,200);
    textSize(30);
    stroke("blue");
    fill("white")
    text("they conquor the planet",480,250);
    textSize(30);
    stroke("yellow");
    fill("blue")
    text("Use Up and Down arrows to move Hawkeye and",330,300);
    textSize(30);
    stroke("yellow");
    fill("blue")
    text("space key to shoot arrows",470,350);
    textSize(30);
    stroke("black");
    fill("red");
    text(": Their speed increase with time",500,400);
    start.visible=true;
    
    
    }  

    if(mousePressedOver(start) && gameState === "serve"){
      gameState="play";
      
    }


    if(gameState === "play"){
      background(backgroundImg);
     
      start.visible=false;
      Hawkeye.visible=true;
      beware.visible=false;
      if(life===3){
        heart3.visible=true;
        heart2.visible=false;
        heart1.visible=false;
      }

      if(life===2){
        heart3.visible=false;
        heart2.visible=true;
        heart1.visible=false;
      }

      if(life===1){
        heart3.visible=false;
        heart2.visible=false;
        heart1.visible=true;
      }

      if(life===0){
        gameState="end";
      }
      
      if(keyDown(UP_ARROW)){
        Hawkeye.y=Hawkeye.y-7;
      }
    
      if(keyDown(DOWN_ARROW)){
        Hawkeye.y=Hawkeye.y+7;
      }
    
      
      if(keyDown("space")){
        createArrow();
      }
    
      textSize(40);
      fill("blue");
      text("Score: "+score,1000,100);

      
    
    
    
    
      if(zombiesGroup.isTouching(arrowGroup)){
        for(var i=0;i<zombiesGroup.length; i++){
          if(zombiesGroup[i].isTouching(arrowGroup)){
            score=score+1;
            zombiesGroup[i].destroy();
            arrowGroup.destroyEach();
           }
        }
      }
    
          if (zombiesGroup.isTouching(Hawkeye)){
          for(var i=0;i<zombiesGroup.length; i++){
            if(zombiesGroup[i].isTouching(Hawkeye)){
              zombiesGroup[i].destroy();
              life=life-1;
          }
        }
      }
    
      

      createZombies();
    }
    
      if(gameState==="end"){
        zombiesGroup.setLifetimeEach(-1);
        zombiesGroup.setVelocityXEach(0);
        heart1.visible=false;
        restart.visible=true;
        gameOver.visible=true;
        beware.visible=false;

        if(mousePressedOver(restart)){
          reset();
        }
      }
   
      

  drawSprites();
}

function createArrow(){
   arrow=createSprite(100,100,10,10);
   arrow.addImage(arrowImg);
   arrow.scale=0.05;
   arrow.x=Hawkeye.x+40;
   arrow.y=Hawkeye.y-45;
   arrow.velocityX=4;
   arrow.lifetime=windowHeight/4;
   arrowGroup.add(arrow);
}

function createZombies(){
  if(frameCount%60===0){
    zombies=createSprite(random(600,1000),random(300,500),40,40);
    zombies.addImage(zombieImg);
    zombies.scale=0.25;
    zombies.setCollider("rectangle",50,-100,400,500);
    //zombies.debug=true;
    zombies.velocityX=-(4 + score/2);
    zombies.lifetime=400;
    zombiesGroup.add(zombies);
  }
 
}

function reset(){
  gameState="play";
  restart.visible=false;
  gameOver.visible=false;
  score=0;
  life=3;
  zombiesGroup.destroyEach();
  arrowGroup.destroyEach();
}
