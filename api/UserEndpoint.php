<?php

$verb = $_SERVER['REQUEST_METHOD'];

$url = $_SERVER['REQUEST_URI'];

switch($verb) {
    case 'GET':
        break;
    case 'POST':
        $firstName = $_POST['fname'];
        $email = $_POST['email'];
        echo json_encode(array(
            'fname' => $firstName,
            'email' => $email
        ));
        break;
    default:
        echo "error";
        break;
}



