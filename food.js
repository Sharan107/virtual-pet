class food{

 constructor(){
   this.foodStock = 0;
   this.image = loadImage("images/Milk.png");
   this.lastfed;
 }

 updatefoodStock(foodStock){
   this.foodStock= foodStock;
 }

 getFedTime(lastfed){
   this.lastfed=lastfed;
 }

 deductFood(){
    if(this.foodStock >0){
        this.foodStock= this.foodStock-1;
    }
 }

 getFoofStock(){
    return this.foodStock;
 }

 display(){
    var x=30 , y=100;
    this.imageMode(CENTER);
    image(this.image,720,220,70,70);

    if(this.foodStock !=0){
        for(var i=0; i<this.foodStock; i++){
            if(i%10==0){
                x=80
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+10;
        }
    }
 }
    
}