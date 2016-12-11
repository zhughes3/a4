<?php

require_once('functions.php');
require_once('usersdb.php');

$verb = $_SERVER['REQUEST_METHOD'];

$url = $_SERVER['REQUEST_URI'];

$logger->log("Received request inside: " . basename(__FILE__, '.php'));
$logger->log("HTTP Verb: " . $verb);
$logger->log("HTTP URL: " . $url);

switch($verb) {
    case 'GET':
        break;
    case 'POST':
        $firstName = $_POST['fname'];
        $email = $_POST['email'];

        //TODO: we need the uid of this newly created user --> return it using the array inside json_encode
        User::addUser($email, $firstName);
        echo json_encode(array(
            'fname' => $firstName,
            'email' => $email
        ));
        break;
    default:
        echo "error";
        break;
}



