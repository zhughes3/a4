$(document).ready(function() {

	 $('#canvas').mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas').mouseup(function(e){
        paint = false;
    });

    $('#canvas').mouseleave(function(e){
        paint = false;
    });
   
   $('#clearCanvas').on('click', function(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];
        clickSize = [];
   });

   $('#smallPen').on('click', function(){
        curSize = 5;
   });

   $('#mediumPen').on('click', function(){
        curSize = 10;
   });

   $('#largePen').on('click', function(){
        curSize = 15;
   });

   $('#XLPen').on('click', function(){
        curSize = 20;
   });

});



var canvasContainer = $('#canvas-container');
var canvas = $('#canvas');
var colorPicker = $('#color-picker');
canvas.attr('width', '800px');
canvas.attr('height', '500px');
context = canvas[0].getContext('2d');

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var clickColor = new Array();
var clickSize = new Array();
var curColor, curSize;

function addClick(x, y, dragging){
    clickX.push(x - 380);
    clickY.push(y - 110);
    clickDrag.push(dragging);
    curColor = colorPicker.val()
    clickColor.push(curColor);
    clickSize.push(curSize);
}

function redraw(){
    context.lineJoin = "round";

    for(var i = 0; i < clickX.length; i++){
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i] -1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.strokeStyle = clickColor[i];
        context.lineWidth = clickSize[i];
        context.stroke();
    }
}

