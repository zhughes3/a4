<?php
/**
 * Created by PhpStorm.
 * User: michael
 * Date: 11/29/16
 * Time: 3:53 PM
 */

if (!isset($_COOKIE['User']) ||
    ($_COOKIE['User'] != md5($_SESSION['username'] . $_SERVER['REMOTE_ADDR'] . $_SESSION['authsalt']))) {
    header("HTTP/1.1 401 Unauthorized");
    exit();
}