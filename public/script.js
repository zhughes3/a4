$(function() {

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#previewing').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#file").change(function(){
        readURL(this);
    });

    $('form#uploadimageForm').submit(function(e) {

        var theForm = $('form#uploadimageForm')[0];
        var formData = new FormData(theForm);

        //TODO should do something about this
        formData.append('secret_token', '1234567890');

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '../api/RoutingEndpoint.php', true);
        xhr.responseType = 'json';

        xhr.onload = function(e) {
            console.log(xhr.status);

            if (this.status == 201) {
                var data = this.response;
                var href = data['href'];
                var projName = data['name'];
                console.log("response", this.response);
                $('<a></a>').attr('href', href).click();
            }
        };

        xhr.send(formData);

        e.preventDefault();

        $('#initialForm').hide();
        $('#initialInstructions').hide();

        //must return false to not make the browser reload the page
        return false;

    });

});

