<?php
require_once('functions.php');

function formatDataUrl($img, $savePath) {
    $img = str_replace('data:image/jpeg;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $fileData = base64_decode($img);

    global $logger;
    $logger->log("trying to save canvas image to: " . $savePath);

    file_put_contents($savePath, $fileData);
    return $fileData;
}

$verb = $_SERVER['REQUEST_METHOD'];

$url = $_SERVER['REQUEST_URI'];

$logger->log("Received request inside: " . basename(__FILE__, '.php'));
$logger->log("HTTP Verb: " . $verb);
$logger->log("HTTP URL: " . $url);

switch ($verb) {
    case "GET":
        //open connection to slice database
        //using supplied name of base picture, grab the next picture that hasn't been drawn
        //return url of that picture in $data object
        // TODO: Zach, where is the supplied name for the base picture? Using $name for now
        $slice = Slice::getNextOpenSlice($name);
        $slice.closeSlice();
        // TODO: Zach, Is the URL inside the slice object? If not, then I could modify the query in getNextOpenSlice to get that info as well. 
        break;

    case "POST":
        //inserting slice information into database for first time
        $projId = $_POST['pid'];
        $dir = $_POST['name'];
        // TODO: Zach, where is the data for the slices coming from? 

        //TODO using $dir above, scan directory to get names of all files
        //foreach ($file) insert pid, isDone, isOpen, and name of file
        echo json_encode();
        break;


    case "PUT":
    //user has finished drawing the new slice (needs to be inserted back in place of the original)
    //make insert into database, changing done value to finished
    $logger->log("inside post block of SliceEndpoint");
    $saveImgTo = "pictures/canvas.jpg";
    $dataUrl = formatDataUrl($_POST['dataUrl'], $saveImgTo);

    if(file_exists($saveImgTo)) {
        $logger->log("img created in pictures");
        echo json_encode(array(
            'data_url' => $saveImgTo
        ));
    } else {
        $logger->log("img not created");
        echo json_encode(array(
            'error' => "some_error"
        ));
    }
    break;

    //TODO: Zach, get the slice object and mark it as done using the function below:
    $slice_obj.finishSlice();



    default:
        echo "error";
        break;
}