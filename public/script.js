$(function() {

    var mainImage = $('img#previewing');
    var leftImage = $('img#leftPrev');
    var rightImage = $('img#rightPrev');
    var jumbotron = $('div.jumbotron.row');
    var uploadImageForm = $('form#uploadimageForm');
    var canvas = $('div#canvas-container');

    var photoDiv = $('div#photo');
    var folder;

    //REMOVE BEFORE PUSHING CHANGES -- using this for testing only
    canvas.show();

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //$('#previewing').attr('src', e.target.result);
                mainImage.attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#file").change(function(){
        readURL(this);
    });

    uploadImageForm.submit(function(e) {
        e.stopPropagation();
        e.preventDefault();

        var theForm = uploadImageForm[0];
        var formData = new FormData(theForm);

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '../api/ImageEndpoint.php', true);
        xhr.responseType = 'json';

        xhr.onload = function(e) {
            var data = this.response;
            console.log("response after uploading base image: ", this.response);

            if (this.status == 201) {
                //cut up picture, show full picture and 3 slices at 100%
                //change picture to saved pic
                var url = "../" + encodeURI(data['href']);

                mainImage.attr('src', '');
                mainImage.attr('src', url);

                folder = encodeURI(data['name']);

                //create a matrix of the image, pulling up the entire contents of the folder that was just created.
                //put padding in between the pictures to make it look cool

                leftImage.attr('src', "../api/" + encodeURI(data['name']) + "/img03_03.jpg");
                rightImage.attr('src', "../api/" + encodeURI(data['name']) + "/img03_06.jpg");
            }
        };

        xhr.send(formData);

        $('#initialForm').hide();
        $('#initialInstructions').hide();

        appendUserForm();

        //must return false to not make the browser reload the page
        return false;

    });
   

    function appendUserForm() {
        var instructions = $('<p>To officially create this project, please supply your email and first-name.</p>');
        var form = $('<div class="col-md-12" id="secondForm"><form class="form-inline" enctype="multipart/form-data" ' +
            'method="post" id="newProjectForm" name="projectinfo">' +
            '<div class="form-group"><input type="email" name="email" class="form-control" placeholder="you@email.com" required/></div>' +
            '<div class="form-group"><input type="text" name="fname" class="form-control" placeholder="FirstName"required/></div>' +
            '<button type="submit" class="btn btn-default">Create</button></form></div>');
        jumbotron.prepend(form).prepend(instructions);


        var newProjectForm = $('form#newProjectForm');

        newProjectForm.submit(function(e) {
        e.stopPropagation();
        e.preventDefault();

        var theForm = newProjectForm[0];
        var formData = new FormData(theForm);

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '../api/UserEndpoint.php', true);
        xhr.responseType = 'json';

        xhr.onload = function(e) {
            var data = this.response;
            console.log("response after posting email and fname: ", this.response);

            if (this.status == 201) {

            }
        };

        xhr.send(formData);

        jumbotron.hide();

        var imgToDraw = $('<img src="../api/' + folder + '/img02_09.jpg" alt="Crowd Src image placeholder" class="img-responsive center-block">');

        photoDiv.append(imgToDraw);

        canvas.removeClass('hidden').addClass('show');

        return false;
        });
    }

});

