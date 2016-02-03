/**
 * Created by Gago on 11/24/2015.
 */



var TestModul = {

    initImage: function(imgSrc) {

        canvas.width = canvas.width;
        if(shapes != null || shapes != undefined){
            shapes = [];
        }

        image.src = imgSrc;
        image.onload = function(){
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            paintBoard();
        }
    }
};




/*
    Main Part
*/
var canvas;
var context;
var canvas2,context2;

var shape;
var shapes;
var painting;

var eraser;

var color = "#000000";
var lineWidth = 1;
var image = new Image();

var SHAPE_TYPE = function(){};
SHAPE_TYPE.CIRCLE = "circle";
SHAPE_TYPE.RECTANGLE = "rectangle";
SHAPE_TYPE.LINE = "line";
SHAPE_TYPE.ERASER = "eraser";
SHAPE_TYPE.FILL = "fill";


//Variables needed

var movePosition;
var startPosition;
var endPosition;
var object;



function init(){
    canvas = document.getElementById('board');
    context = canvas.getContext('2d');

    canvas2 = document.getElementById('board2');
    context2 = canvas2.getContext('2d');

    $('.canvas-boards').css('cursor', 'url(../imgs/tools/brush.png) 0 130, auto');

    shape = SHAPE_TYPE.LINE;
    shapes = [];
    painting = false;

    eraser = new Eraser(0,0,0,0);

    canvas2.onmousedown = onMouseDown;
    canvas2.onmouseup = onMouseUp;
    canvas2.onmousemove = onMouseMove;


}


function setLine(){
    shape = SHAPE_TYPE.LINE;
    $('.canvas-boards').css('cursor', 'url(../imgs/tools/brush.png) 0 130, auto');
}
function setCircle(){
    shape = SHAPE_TYPE.CIRCLE;
    $('.canvas-boards').css('cursor', 'url(../imgs/tools/cursor_circle.png) 0 0, auto');
}
function setRectangle(){
    shape = SHAPE_TYPE.RECTANGLE;
    $('.canvas-boards').css('cursor', 'url(../imgs/tools/cursor_rectangle.png) 0 0, auto');
}
function setEraser(){
    shape = SHAPE_TYPE.ERASER;
    $('.canvas-boards').css('cursor', 'url(../imgs/tools/eraser.png) 5 29, auto');
}
function setFill(){
    shape = SHAPE_TYPE.FILL;
    $('.canvas-boards').css('cursor', 'url(../imgs/tools/bucket.png) 30 120, auto');
}


function onMouseDown(event){

    startPosition = new Point(event.pageX - 3*this.offsetLeft - 20, event.pageY - this.offsetTop);
    painting = true;

    color = $('select[name="colorpicker-picker-longlist"]').val();

    if(shape === SHAPE_TYPE.LINE){
        object = new Line(event.pageX - 3*this.offsetLeft - 20, event.pageY - this.offsetTop,color,lineWidth);
    }else if(shape === SHAPE_TYPE.RECTANGLE){
        object = new Rectangle(startPosition.x,startPosition.y,0,0,color,3);
    }else if(shape === SHAPE_TYPE.CIRCLE){
        object = new Circle(startPosition.x,startPosition.y,0,color,3);
    }else if(shape === SHAPE_TYPE.FILL){
        object = new Fill(event.pageX - 3*this.offsetLeft - 20, event.pageY - this.offsetTop,color);
    }

}

function onMouseMove(event){

    movePosition = new Point(event.pageX - 3*this.offsetLeft - 20, event.pageY - this.offsetTop);

    if(shape === SHAPE_TYPE.LINE && painting){
        object.addPoint(event.pageX - 3*this.offsetLeft - 20, event.pageY - this.offsetTop);
    }else if(shape === SHAPE_TYPE.RECTANGLE && painting){
        var x = startPosition.x;
        var y = startPosition.y;
        if (x > movePosition.x) x = movePosition.x;
        if (y > movePosition.y) y = movePosition.y;
        var width = Math.abs(startPosition.x - movePosition.x);
        var height = Math.abs(startPosition.y - movePosition.y);
        object.setPosition(x,y);
        object.width = width; object.height = height;
    }else if(shape === SHAPE_TYPE.CIRCLE && painting){
        var x = startPosition.x;
        var y = startPosition.y;
        if (x > movePosition.x) x = movePosition.x;
        if (y > movePosition.y) y = movePosition.y;
        x += object.radius;
        y += object.radius;
        var d = (movePosition.x - startPosition.x) * (movePosition.x - startPosition.x) +
            (movePosition.y - startPosition.y) * (movePosition.y - startPosition.y);
        var radius = Math.sqrt(d)/2;
        object.setPosition(x,y);
        object.radius = radius;
    }else if(shape === SHAPE_TYPE.ERASER){
        eraser.width = 2*lineWidth;
        eraser.height = 2*lineWidth;
        eraser.setPosition(movePosition.x - eraser.width/2,movePosition.y - eraser.height/2);
        if(painting){
            shapes.push(new Eraser(eraser.point.x,eraser.point.y,eraser.width,eraser.height));
        }
    }

    if(painting){
        paintBoard();
    }
    paintBoard2();

}

function onMouseUp(event){

    endPosition = new Point(event.pageX - 3*this.offsetLeft - 20, event.pageY - this.offsetTop);
    if(shape === SHAPE_TYPE.LINE && painting){
        object.addPoint(endPosition.x, endPosition.y);
        shapes.push(object);
    }else if(shape === SHAPE_TYPE.RECTANGLE && painting){
        shapes.push(object);
    }else if(shape === SHAPE_TYPE.CIRCLE && painting){
        shapes.push(object);
    }else if(shape === SHAPE_TYPE.ERASER && painting){
        eraser.width = 2*lineWidth;
        eraser.height = 2*lineWidth;
        shapes.push(new Eraser(endPosition.x - eraser.width/2,endPosition.y - eraser.height/2,eraser.width,eraser.height));
    } else if(shape === SHAPE_TYPE.FILL && painting){
        shapes.push(object);
    }

    painting = false;
    object = undefined;

    paintBoard();
}




function paintBoard(){

    for(var i=0;i<shapes.length;i++){
        shapes[i].draw(context);
    }
}


function paintBoard2(){

    canvas2.width = canvas2.width;

    if(object != undefined && object != null && shape !== SHAPE_TYPE.ERASER){
        object.drawContour(context2);
    }

    if(shape === SHAPE_TYPE.ERASER){
        eraser.drawContour(context2);
    }

}

function reloadBoard(){

    canvas.width = canvas.width;
    context.globalCompositeOperation = "source-over";
    if(image.src.length){
        image.src = image.src + "?" + new Date().getTime();
    }else{
        paintBoard();
    }
}

function undoBoard(){

    if(shapes.length > 0){
        shapes.pop();
        reloadBoard();
    }
}



init();