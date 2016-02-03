/**
 * Created by Gago on 11/25/2015.
 */
/*
 Shape class (super class of all the shapes)
 */
var Shape = function( point, color, lineWidth){
    this.point = point;
    this.color = color;
    this.lineWidth = lineWidth;
};

Shape.prototype.draw = function(){
    console.log("draw");
};

Shape.prototype.drawContour = function(){
    console.log("drawContour");
};

Shape.prototype.getPosition = function(){
    return this.point;
};

Shape.prototype.setPosition = function(x,y){
    this.point = new Point(x,y);
};

Shape.prototype.getColor = function(){
    return this.color;
};
