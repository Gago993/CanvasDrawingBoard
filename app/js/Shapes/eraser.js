/**
 * Created by Gago on 11/25/2015.
 */

/*
 Eraser class
*/
var Eraser = function(x, y, width, height){
    this.point = new Point(x,y);
    this.width = width;
    this.height = height;
    this.color = "white";
    this.contour = "black";
};

Eraser.prototype.setPosition = function(x ,y){
    this.point = new Point(x,y);
};

Eraser.prototype.draw = function(context){
    context.fillStyle = this.color;
    context.beginPath();
    context.fillRect(this.point.x,this.point.y,this.width,this.height);
    context.closePath();
};
Eraser.prototype.drawContour = function(context){
    context.strokeStyle = this.contour;
    context.beginPath();
    context.strokeRect(this.point.x,this.point.y,this.width,this.height);
    context.closePath();
};

