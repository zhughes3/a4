<?php

require_once('functions.php');

$verb = $_SERVER['REQUEST_METHOD'];

$url = $_SERVER['REQUEST_URI'];

$logger->log("Received request inside: " . basename(__FILE__, '.php'));
$logger->log("HTTP Verb: " . $verb);
$logger->log("HTTP URL: " . $url);

switch($verb) {
    case "GET":
        break;

    case "POST":
        $userId = $_POST['uid'];
        $imgId = $_POST['iid'];
        //TODO: using var's above, insert a new tuple into Project
        //return pid
        echo json_encode(array(
            'pid' => 'PID_GOES_HERE'
        ));
        break;
    default:
        break;


}
