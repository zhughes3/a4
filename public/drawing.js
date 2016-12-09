var canvasContainer = $('#canvas-container');
var canvas = document.getElementById('canvas');
canvas.setAttribute('width', '300px');
canvas.setAttribute('height', '300px');
var bkgdColorPicker = $('#bkgd-color-picker');
bkgdColorPicker.val('#FFFFFF');
var context = canvas.getContext('2d');
var colorPicker = $('#color-picker');
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var tool = "marker";
var clickColor = new Array();
var clickSize = new Array();
var clickTool = new Array();
var toolColor;
var toolSize = 3;


function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    if(tool == "eraser"){
        toolColor = bkgdColorPicker.val();
    }else{
        toolColor = colorPicker.val();
    }
   
    clickColor.push(toolColor);
    clickSize.push(toolSize);
}


function redraw() {
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
	    x: (evt.clientX - rect.left),
        y: (evt.clientY - rect.top)
    };
}

function getTouchPos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.touches[0].clientX - rect.left, 
        y: evt.touches[0].clientY - rect.top
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

canvas.addEventListener('touchstart', function(evt) {
    var touchPos = getTouchPos(canvas, evt);
    // var touch = e.touches[0];
    // var mouseEvent = new MouseEvent("mousedown", {
    //     clientX: touch.clientX,
    //     clientY: touch.clientY
    // });
    // canvas.dispatchEvent(mouseEvent);
    paint = true;
    addClick(touchPos.x, touchPos.y);
    redraw();
});

canvas.addEventListener('touchmove', function(evt) {
    // var touch = e.touches[0];
    // var mouseEvent = new MouseEvent("mousemove", {
    //     clientX: touch.clientX,
    //     clientY: touch.clientY
    // });
    // canvas.dispatchEvent(mouseEvent);
    var touchPos = getTouchPos(canvas, evt);
    if(paint){
        addClick(touchPos.x, touchPos.y, true);
        redraw();
    }
}, false);

canvas.addEventListener('touchend', function(evt) {
    // var mouseEvent = new MouseEvent("mouseup", {});
    // canvas.dispatchEvent(mouseEvent);
    paint = false;
},false);

document.body.addEventListener('touchstart', function(evt) {
   if(evt.target == canvas){
        evt.preventDefault();
   }
    
}, false);

document.body.addEventListener('touchend', function(evt) {
    if(evt.target == canvas) {
        evt.preventDefault();
    }
}, false);

document.body.addEventListener('touchmove', function(evt) {
    if(evt.target == canvas) {
        evt.preventDefault();
    }
}, false);



$('#bkgd-color-picker').on('change', function() {
    canvas.style.backgroundColor = bkgdColorPicker.val();
});

$('#eraser').on('click', function() {
    tool = "eraser";
});

$('#marker').on('click', function() {
    tool = "marker";
});

$('#spray').on('click', function() {
    tool = "spraypaint";
});

$('#clearCanvas').on('click', function() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];
        clickSize = [];
   });

$('#XSPen').on('click', function() {
    toolSize = 3;
});

$('#smallPen').on('click', function() {
    toolSize = 7;
});

$('#mediumPen').on('click', function() {
    toolSize = 12;
});

$('#largePen').on('click', function() {
    toolSize = 18;
});

$('#XLPen').on('click', function() {
    toolSize = 25;
});

$('#canvasSettings').on('click', '.btn-default.tool', function() {
   	$('.tool').removeClass('btn-primary');
   	$('.tool').addClass('btn-default');
   	$(this).removeClass('btn-default');
    $(this).addClass('btn-primary');
});

$('#canvasSettings').on('click', '.btn-default.size', function() {
    $('.size').removeClass('btn-primary');
    $('.size').addClass('btn-default');
    $(this).removeClass('btn-default');
    $(this).addClass('btn-primary');
});


