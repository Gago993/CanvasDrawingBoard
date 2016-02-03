/**
 * Created by Gago on 11/25/2015.
 */
/*
 Line Class (subclass from Shape)

 points - list of points
 void: addPoint() - add point to line

 */
var Line = function( x, y, color, lineWidth){
    Shape.call(this,new Point(x,y), color, lineWidth);
    this.points = [];
    this.points.push(this.point);
};

Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.addPoint = function (x,y) {
    this.points.push(new Point(x,y));
};
Line.prototype.draw = function(context) {

    for (var i = 0; i < this.points.length; i++) {

        context.beginPath();
        context.strokeStyle = this.color;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = this.lineWidth;

        if (this.points[i] && i) {
            context.moveTo(this.points[i - 1].x, this.points[i - 1].y);
        } else {
            // The x position is moved over one pixel so a circle even if not dragging
            context.moveTo(this.points[i].x - 1, this.points[i].y);
        }
        context.lineTo(this.points[i].x, this.points[i].y);
        context.stroke();
        context.closePath();
    }
};
Line.prototype.drawContour = function(context){
    this.draw(context);
};
