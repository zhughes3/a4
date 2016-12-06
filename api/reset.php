<?php

require_once ("functions.php");

$logger->log("inside " . basename(__FILE__, '.php'));
$logPath = "../logs/log.txt";
unlink($logPath);
$handle = fopen($logPath, 'w') or die('Cannot open file:  '.$logPath);
fclose($handle);


function deletePics($dir) {
    $foldersToDelete = array();

    $files = scandir($dir);

    foreach($files as $file) {
        $path_parts = pathinfo($file);

        if ($path_parts['extension'] == 'jpg') {
            array_push($foldersToDelete, $path_parts['basename']);
            echo "deleting " . $path_parts['basename'];
            unlink($file);
        }
    }

    return $foldersToDelete;
}

$logger->log("current directory " . __DIR__);
$folders = deletePics(__DIR__ . "/pictures/");

foreach ($folders as $fold) {
    echo "would delete " . $fold;
    //unlink($fold);
}