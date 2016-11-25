<?php

/*This needs to route the different ajax calls


service offer one or more capabilities and listen for requests on these capabilities
*/

$verb = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['REQUEST_URI'];

$url_parts = explode("/", $url);


function console_log($data){
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
}

/*

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
*/

switch($verb) {
    case "GET":
        echo "Inside get";
        break;
    case "POST":
        $tmpPath = $_FILES['file']['tmp_name'];

        $imageName = $_POST['imageName'];

        if (is_uploaded_file($_FILES['file']['tmp_name'])) {
            $path = $_FILES['file']['name'];
            $ext = pathinfo($path, PATHINFO_EXTENSION);

            $uploaddir = getcwd() . "/pictures/";
            $uploadfile = $uploaddir . $imageName . "." . $ext;

            if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
                //for testing purposes
                header("Content-type: application/json", false, 201);
                $data = array('href' => "pictures/" . $imageName . "." . $ext, 'name' => $imageName);
                echo json_encode($data);
            } else {
                header("Content-type: application/json", false, 400);
                echo "File was not uploaded";
            }
        }
        break;
}

?>