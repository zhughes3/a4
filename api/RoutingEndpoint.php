<?php

/*This needs to route the different ajax calls


service offer one or more capabilities and listen for requests on these capabilities
*/

$verb = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['REQUEST_URI'];

function console_log($data){
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
}

//for testing purposes
header("Content-type: text/plain");

echo "verb: " . $verb . " URL: " . $url;

echo ":: data received via GET ::\n\n";
print_r($_GET);

echo "\n\n:: Data received via POST ::\n\n";
print_r($_POST);

echo ":: data received via REQUEST ::\n\n";
print_r($_REQUEST);

echo "\n\n:: Data received as \"raw\" (text/plain encoding) ::\n\n";
if (isset($HTTP_RAW_POST_DATA)) {
    echo $HTTP_RAW_POST_DATA;
}

echo "\n\n:: Files received ::\n\n";
print_r($_FILES);

switch($verb) {
    case "GET":
        echo "Inside get";
        break;
    case "POST":
        $tmpPath = $_FILES['file']['tmp_name'];
        $isFile = is_uploaded_file($_FILES['file']['tmp_name']);

        if (is_uploaded_file($_FILES['file']['tmp_name'])) {
            if(intval($_SERVER['CONTENT_LENGTH'])>0 && count($_POST)===0){
                throw new Exception('PHP discarded POST data because of request exceeding post_max_size.');
            }
            echo 'inside post';
            echo(__DIR__);

            $uploaddir = getcwd() . "/pictures/";
            $uploadfile = $uploaddir . basename($_FILES['file']['name']);

            if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
                echo "Uploaded";
            } else {
                echo "File was not uploaded";
            }
        }
        break;
}

?>