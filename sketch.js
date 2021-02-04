var dog, happyDog, dogImg;
var foodS, foodStock;
var database;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 300, 100, 100);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() { 
  background("green");
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog);
  }
  fill(255);
  text("food remaining : " + foodS, 200, 100);
  text("Press up arrow to feed this hungry dog", 10, 20);
  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({
    Food : x
  });
}