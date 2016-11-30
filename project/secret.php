<?php
/**
 * Created by PhpStorm.
 * User: michael
 * Date: 11/29/16
 * Time: 3:52 PM
 */

//either you authenticate or exit which won't get you past

session_start();

require_once('authenticate.php');

header("Content-type: application/json");
print(json_encode("This is my secret!"));
exit();