var dog,sadDog,happyDog;
var foodobj;
var foods,foodStock;
var fedTime, lastfed, feed, addFood;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  
  foodobj=new food();

  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addingFoods);

}

function draw() {
  background(46,139,87);

  foodobj.display();

  fedTime=database.ref("fedtime");
  fedTime.on("value",function(data){
    lastfed=data.val();
  })

  fill(255,255,254);
  textSize(15)
  if(lastfed>=12){
    text("last Feed: "+lastfed%12+"PM",350,30);
  }
  else if(lastfed==0){
    text("last Feed: 12PM",350,30);
  }
  else{
    text("Last Feed: " +lastfed+"AM",350,30);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foods=data.val();
  foodobj.updatefoodStock(foods);
}

//function to update food stock and last fed time
function feedDog(){

  dog.addImage(happyDog);

  foodobj.updatefoodStock(foodobj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodobj.getFoodStock(),
    fedTime: hour()
  })
}

//function to add food in stock
function addingFoods(){
  foods++;
  database.ref("/").update({
    Food:foods
  })
}