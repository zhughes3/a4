<?php

class PhpLogger
{

    public function log($data) {
        date_default_timezone_set('EST');
        $output = date("Y-m-d H:i:s") . "\t - " . $data . "\n";
        file_put_contents("../logs/log.txt", $output, FILE_APPEND);
    }

}