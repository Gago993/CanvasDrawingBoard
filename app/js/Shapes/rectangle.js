/**
 * Created by Gago on 11/25/2015.
 */

/*
 Rectangle class (subclass of Shape class)
 */
var Rectangle = function(x, y, width, height, color, lineWidth){
    Shape.call(this,new Point(x,y),color, lineWidth);
    this.width = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.draw = function(context){
    context.fillStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.fillRect(this.point.x,this.point.y,this.width,this.height);
    context.closePath();
};
Rectangle.prototype.drawContour = function(context){
    context.strokeStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.strokeRect(this.point.x,this.point.y,this.width,this.height);
    context.closePath();
};
