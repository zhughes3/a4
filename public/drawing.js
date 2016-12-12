$(function() {

    function SketchableCanvas(selector) {
        //we basically want all of the stuff below to be encapsulated inside this function so that
        //when we need to we can just create a new version of this prototype, e.g.
        //         var canvas = new SketchableCanvas('canvas#canvas);
        //by putting all of the drawing functionality inside it's own prototype object, we can then have multiple canvas's
        //on one page each with their own individual drawing functionality's and state info
    }

    var canvasContainer = $('#canvas-container');
    var canvasForm = $('form#uploadDrawingForm');
    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', '100px');
    canvas.setAttribute('height', '100px');
    var bkgdColorPicker = $('#bkgd-color-picker');
    bkgdColorPicker.val('#FFFFFF');
    var context = canvas.getContext('2d');
    var colorPicker = $('#color-picker');
    var toolSizeInput = $('#toolSize');
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
    var imgSrc;
    var restorePoints = new Array();

    imgSrc = canvas.toDataURL("image/png");
    restorePoints.push(imgSrc);


    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        if(tool == "eraser"){
            toolColor = bkgdColorPicker.val();
        }else{
            toolColor = colorPicker.val();
        }
        toolSize = toolSizeInput.val();
        clickColor.push(toolColor);
        clickSize.push(toolSize);
    }


    function redraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
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
        imgSrc = canvas.toDataURL("image/png");
        restorePoints.push(imgSrc);
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

    //removes only 1 xy-coord at a time
   $('#undoButton').on('click', function() {     
        var img = new Image();
        restorePoints.pop();
        img.src = restorePoints[restorePoints.length-1];
        img.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
        }   
        clickX.pop();
        clickY.pop();
        clickDrag.pop();
        clickColor.pop();
        clickSize.pop();
        clickTool.pop();
    });

   //hold undo button to remove more than just one xy-coord at a time
   var interval;
   $('#undoButton').on('mousedown', function() {
        interval = setInterval(function() {
            var img = new Image();
            restorePoints.pop();
            img.src = restorePoints[restorePoints.length-1];
            img.onload = function() {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0);
            }   
            clickX.pop();
            clickY.pop();
            clickDrag.pop();
            clickColor.pop();
            clickSize.pop();
            clickTool.pop();
        }, 100);
   });

   $('#undoButton').on('mouseup', function(){
        clearInterval(interval);
   });

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


    //when user pics a background color, it isn't enough just to set the background-color
    //of the canvas object
    //you must draw a rect using the context to actually save this background as part of the picture
    //upon submit
    $('#bkgd-color-picker').on('change', function() {
        var prevColor = context.fillStyle;
        console.log("prev fill style: " + prevColor);

        var newColor = bkgdColorPicker.val();

        context.fillStyle = newColor;

        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = prevColor;
    });

    $('#eraser').on('click', function() {
        tool = "eraser";
    });

    $('#marker').on('click', function() {
        tool = "marker";
    });


    $('#clearCanvas').on('click', function() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        clickX = [];
        clickY = [];
        clickDrag = [];
        clickColor = [];
        clickSize = [];
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


    canvasForm.submit(function(e) {
        e.stopPropagation();
        e.preventDefault();

        var theForm = canvasForm[0];

        //formData has no relevant information, we need to send canvas
        var formData = new FormData(theForm);

        //get data url of canvas as MIME type 'image/jpeg'
        //second param is quality of image generated
        var dataUrl = canvas.toDataURL("image/jpeg", 1.0);
        formData.append("dataUrl", dataUrl);

        //need to also send in location of original image so that slice Endpoint can overwrite the correct
        //file on the server
        formData.append("location", "location of original image");

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '../api/SliceEndpoint.php', true);
        xhr.responseType = 'json';

        xhr.onload = function(e) {
            var data = this.response;
            console.log("response of canvas picture submit: ", this.response);

            if (this.status == 201) {

            }
        };

        xhr.send(formData);

        return false;
    });

});

