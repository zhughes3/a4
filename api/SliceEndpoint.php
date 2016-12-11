<?php
require_once('functions.php');

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
        break;
    case "POST":
        //user has finished drawing the new slice (needs to be inserted back in place of the original)
        //make insert into database, changing done value to finished
        $logger->log("inside post block of SliceEndpoint");
        echo json_encode(array(
            'slice_url' => 'sliceUrlHere',
            'secondKey' => 'secondVal'
        ));
        break;
}