$(function() {

    /**
     * CONSUMER
     A consumer invokes a capability by sending the corresponding request message, and the service either rejects the
     request or performs the requested task before sending a response message back to the consumer (Figure 1)
     */

    var imageEndpoint = null, loginEndpoint = null, logoutEndpoint = null;
    var output = $('div#formDataDiv');

    $('form#uploadimageForm').submit(function(e) {

        var theForm = $('form#uploadimageForm')[0];
        var formData = new FormData(theForm);

        //TODO should do something about this
        formData.append('secret_token', '1234567890');

        var xhr = new XMLHttpRequest();

        //var url = window.location.href + '/../api/RoutingEndpoint.php';

        xhr.open('POST', '../api/RoutingEndpoint.php', true);
        xhr.responseType = 'json';
        xhr.onload = function(e) {
            alert("Ok we have reached the onload point of the request.");
            console.log(xhr.status);

            if (this.status == 200) {
                console.log("response", this.response);
                //var response = new JSONObject(this.response);
            }
        };



        xhr.send(formData);
        //xhr.send(formdata ? formdata : form.serialize());

        e.preventDefault();

        //prevent page from submitting
        return false;

    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#previewing').attr('src', e.target.result);
                $('#previewing').attr('style', "max-width: 50%;");
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#file").change(function(){
        readURL(this);
    });

});

