/**
 * Created by Gago on 11/25/2015.
 */


/*
 Fill class (subclass of Shape class)
 */
var Fill = function(x, y, color){
    Shape.call(this,new Point(x,y),color);
};
Fill.prototype = Object.create(Shape.prototype);
Fill.prototype.constructor = Fill;
Fill.prototype.draw = function(context){

    var imgData = context.getImageData(0,0,context.canvas.width,context.canvas.height);
    var pixelsData = imgData.data;

    var startRGBArray = this.getClickedColor(pixelsData,this.point.x,this.point.y);
    var pickedColorRGBAArray = this.convertHex(this.color,0);

   // console.log(startRGBArray,"clicked");
   // console.log(pickedColorRGBAArray,"picked");

    if(startRGBArray[0] != pickedColorRGBAArray[0] || startRGBArray[1] != pickedColorRGBAArray[1] || startRGBArray[2] != pickedColorRGBAArray[2]){
        this.fill(this.point.x,this.point.y,startRGBArray[0],startRGBArray[1],startRGBArray[2],startRGBArray[3],context,pixelsData);
        context.putImageData(imgData,0,0);
    }
    console.log("end");

};


Fill.prototype.isPixelWhite = function(pixelData, pixelPos, r, g, b, a){

    var redCheck = pixelData[pixelPos] == r;
    var greenCheck = pixelData[pixelPos+1] == g;
    var blueCheck = pixelData[pixelPos+2] == b;
    var alphaCheck = pixelData[pixelPos+3] == a;

    if(redCheck && greenCheck && blueCheck && alphaCheck){
            return true;
    }
    return false;
};

Fill.prototype.fill = function (startX, startY, startR, startG, startB, startA,context,pixelData) {

    var drawingAreaWidth = context.canvas.width;
    var drawingAreaHeight = context.canvas.height;

    var newPos,
        x,
        y,
        pixelPos,
        reachLeft,
        reachRight,
        drawingBoundLeft = 0,
        drawingBoundTop = 0,
        drawingBoundRight = drawingAreaWidth - 1,
        drawingBoundBottom = drawingAreaHeight - 1,
        pixelStack = [[startX, startY]];

    while (pixelStack.length) {

        newPos = pixelStack.pop();
        x = newPos[0];
        y = newPos[1];

        // Get current pixel position
        pixelPos = (y * drawingAreaWidth + x) * 4;

        // Go up as long as the color matches and are inside the canvas
        while (y >= drawingBoundTop && this.isPixelWhite(pixelData,pixelPos, startR, startG, startB, startA)) {
            y -= 1;
            pixelPos -= drawingAreaWidth * 4;
        }

        pixelPos += drawingAreaWidth * 4;
        y += 1;
        reachLeft = false;
        reachRight = false;

        // Go down as long as the color matches and in inside the canvas
        while (y <= drawingBoundBottom && this.isPixelWhite(pixelData,pixelPos, startR, startG, startB, startA)) {
            y += 1;

            this.colorPixel(pixelData,pixelPos);

            if (x > drawingBoundLeft) {
                if (this.isPixelWhite(pixelData,pixelPos - 4, startR, startG, startB, startA)) {
                    if (!reachLeft) {
                        // Add pixel to stack
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if (reachLeft) {
                    reachLeft = false;
                }
            }

            if (x < drawingBoundRight) {
                if (this.isPixelWhite(pixelData,pixelPos + 4, startR, startG, startB, startA)) {
                    if (!reachRight) {
                        // Add pixel to stack
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if (reachRight) {
                    reachRight = false;
                }
            }

            pixelPos += drawingAreaWidth * 4;
        }
    }
};


Fill.prototype.colorPixel = function (pixelData, pixelPos, a) {

    var pickedColorRGBAArray = this.convertHex(this.color,0);

    pixelData[pixelPos] = pickedColorRGBAArray[0];
    pixelData[pixelPos + 1] = pickedColorRGBAArray[1];
    pixelData[pixelPos + 2] = pickedColorRGBAArray[2];
    pixelData[pixelPos + 3] = a !== undefined ? a : 255;
};

Fill.prototype.getClickedColor = function(pixelData, x, y){

    var drawingAreaWidth = context.canvas.width;
    var pixelPos = (y * drawingAreaWidth + x) * 4;

    var retRGB = [];

    retRGB.push(pixelData[pixelPos]);
    retRGB.push(pixelData[pixelPos + 1]);
    retRGB.push(pixelData[pixelPos + 2]);
    retRGB.push(pixelData[pixelPos + 3]);

    return retRGB;
};


Fill.prototype.convertHex = function(hex,opacity){
    hex = hex.replace('#','');
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);

    var result = [];
    result.push(r,g,b);
    return result;
};






