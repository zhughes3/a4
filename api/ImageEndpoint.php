<?php

require_once('functions.php');

function sliceJpeg($imgPath, $sliceDir) {

    list($width, $height, $type, $attr) = getimagesize($imgPath);

    $img = @imagecreatefromjpeg($imgPath);

    $slicewidth = 100;
    $sliceheight = 100;

    $slicesCreated = 0;

    for($col = 0;$col<($width / $slicewidth); $col++) {
        for($row=0;$row<($height / $sliceheight); $row++) {
            $fn = sprintf("./" . $sliceDir . "/" . "img%02d_%02d.jpg", $col, $row);

            $piece = @imagecreatetruecolor($slicewidth, $sliceheight);

            imagecopyresized($piece, $img, 0, 0, $col * $slicewidth, $row * $sliceheight, $slicewidth, $sliceheight, $slicewidth, $sliceheight);

            imagejpeg($piece, $fn);

            $slicesCreated++;

            imagedestroy($piece);
        }
    }

    return $slicesCreated;
}

$verb = $_SERVER['REQUEST_METHOD'];

$url = $_SERVER['REQUEST_URI'];

$logger->log("Received request inside: " . basename(__FILE__, '.php'));
$logger->log("HTTP Verb: " . $verb);
$logger->log("HTTP URL: " . $url);

switch($verb) {
    case "GET":
        echo "Inside get";
        break;
    case "POST":
        $tmpPath = $_FILES['file']['tmp_name'];

        $imageName = $_POST['imageName'];

        if (is_uploaded_file($_FILES['file']['tmp_name'])) {

            //check to see if there was an error in the file upload
            if ($_FILES["file"]["error"] > 0) {
                header('Content-type: text/html', false, 400);
                console_err("Return Code: " . $_FILES["file"]["error"] . "<br/><br/>");
            } else {
                //make sure file doesn't exist already
                if (file_exists("pictures/" . $_POST['imageName'])) {
                    header('Content-type: text/html', false, 409);
                    echo $_POST['imageName'] . " <span id='invalid'><b>already exists.</b></span> ";
                }

                //picture is good to go
                //make directory to house slices
                mkdir($imageName);

                $path = $_FILES['file']['name'];
                $ext = pathinfo($path, PATHINFO_EXTENSION);

                $uploaddir = getcwd() . "/pictures/";
                $uploadfile = $uploaddir . $imageName . "." . $ext;

                if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {

                    $logger->log("New picture uploaded to: /api/pictures/" . $imageName . "." . $ext);

                    //if file has been put on the server
                    header("Content-type: application/json", false, 201);

                    $data = array(
                        'href' => htmlentities("/api/pictures/" . $imageName . "." . $ext),
                        'name' => $imageName,
                        'type' => $_FILES["file"]["type"],
                        'size' => $_FILES["file"]["size"]
                    );

                    echo json_encode($data);

                    $slicesCreated = sliceJpeg($uploadfile, $imageName);

                    $logger->log("Slices created: " . $slicesCreated);

                } else {
                    header("Content-type: application/json", false, 400);
                    $data = array('error_msg' => 'File was not uploaded.');
                    echo json_encode($data);
                }
            }

        } else {
            header('Content-type: text/html', false, 400);
            echo "<p>Did you even upload a picture</p>";
        }
}
