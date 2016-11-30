<?php
/**
 * Created by PhpStorm.
 * User: michael
 * Date: 11/29/16
 * Time: 3:40 PM
 */

//A Controller that handles front-end requests.
session_start();

//boolean
function check_password($username, $password) {
    $fd = fopen('hidden/passwords.txt', 'r');

    while ($next_line = fgets($fd)) {
        list($uname, $usalt, $uhash) = explode(' ', trim($next_line));

        if ($uname == $username) {
            if (md5($usalt . $password) == $uhash) {
                fclose($fd);
                return true;
            }
        }
    }
    fclose($fd);
    return false;
}

//script begins
$username = $_GET['username'];
$password = $_GET['password'];

if (check_password($username, $password)) {
    header("json");
    $_SESSION['username'] = $username;
    $_SESSION['authsalt'] = time();

    $auth_cookie_val = md5($_SESSION['username'] . $_SERVER['REMOTE_ADDR'] . $_SESSION['authsalt']);

    setcookie("User", $auth_cookie_val, 0, '/', 'localhost:8888', true);

    print(json_encode(true));
} else {
    unset($_SESSION['username']);
    unset($_SESSION['authsalt']);

    header("HTTP/1.1 401 Unauthorized");
    header('Content-type: application/json');
    print(json_encode(false));
}
