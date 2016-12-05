
var canvasContainer = $('#canvas-container');
var canvas = document.getElementById('canvas');
canvas.setAttribute('width', '800px');
canvas.setAttribute('height', '500px');
var context = canvas.getContext('2d');
var colorPicker = $('#color-picker');
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var clickColor = new Array();
var clickSize = new Array();
var curColor, curSize;

function addClick(x, y, dragging){
    clickX.push(x);
    clickY.push(y);
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

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
	    x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	if(paint){
		addClick(mousePos.x, mousePos.y, true);
		redraw();
	}
}, false);

canvas.addEventListener('mousedown', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	paint = true;
	addClick(mousePos.x, mousePos.y);
	redraw();
});

canvas.addEventListener('mouseup', function(evt) {
	paint = false;
});

canvas.addEventListener('mouseleave', function(evt) {
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

$('#canvasSettings').on('click', '.btn-default', function(){
   	$('.btn').removeClass('btn-primary');
   	$('.btn').addClass('btn-default');
   	$(this).removeClass('btn-default');
    $(this).addClass('btn-primary');
});



