<?php

include_once("../project/PhpLogger.php");

$logger = new PhpLogger();

function get_exploded_url($url) {
    return explode("/", $url);
}

function echo_all() {
    echo_get();
    echo_post();
    echo_request();
    echo_raw_data();
    echo_files();
}

function echo_get() {
    echo ":: data received via GET ::\n\n";
    print_r($_GET);
}

function echo_post() {
    echo "\n\n:: Data received via POST ::\n\n";
    print_r($_POST);
}

function echo_request() {
    echo ":: data received via REQUEST ::\n\n";
    print_r($_REQUEST);
}

function echo_raw_data() {
    echo "\n\n:: Data received as \"raw\" (text/plain encoding) ::\n\n";
    if (isset($HTTP_RAW_POST_DATA)) {
        echo $HTTP_RAW_POST_DATA;
    }
}

function echo_files() {
    echo "\n\n:: Files received ::\n\n";
    print_r($_FILES);
}