/**
 * Created by Gago on 11/25/2015.
 */


/*
 Circle class (subclass of Shape class)
 */
var Circle = function(x, y, radius, color, lineWidth){
    Shape.call(this,new Point(x,y),color, lineWidth);
    this.radius = radius;
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.draw = function(context){
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.point.x, this.point.y, this.radius, 0, 2*Math.PI);
    context.fill();
    context.closePath();
};
Circle.prototype.drawContour = function(context){
    context.strokeStyle = this.color;
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.arc(this.point.x, this.point.y, this.radius, 0, 2*Math.PI);
    context.stroke();
    context.closePath();
};

