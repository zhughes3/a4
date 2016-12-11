<?php

require_once ("functions.php");

function rmdir_recursive($dir) {
    foreach(scandir($dir) as $file) {
        if ('.' === $file || '..' === $file) continue;
        if (is_dir("$dir/$file")) rmdir_recursive("$dir/$file");
        else unlink("$dir/$file");
    }
    rmdir($dir);
}

//first lets del then recreate the log file
$logPath = "../logs/log.txt";
if (unlink($logPath)) {
    $handle = fopen($logPath, 'w') or die('Cannot open file:  ' . $logPath);
    fclose($handle);
    $logger->log("Just deleted this so this shouild be on first line");
}

//now lets delete all directories not named 'pictures' in current directory
$this_dir_files = scandir(__DIR__);

foreach ($this_dir_files as $dir_file) {
    if ($dir_file != 'pictures' && is_dir($dir_file) && $dir_file != '.' && $dir_file != '..') {
        $logger->log(substr(sprintf('%o', fileperms($dir_file)), -4));
        $logger->log("Deleting directory: " . $dir_file);
        chmod($dir_file, 0777);
        rmdir_recursive($dir_file);
    }
}

//now lets delete all pictures in pictures folder
$dir = "pictures/";
chmod($dir, 0777);

$logger->log("trying to delete pics from " . $dir);
$foldersToDelete = array();

if (is_dir($dir)) {
    $files = scandir($dir);

    foreach($files as $file) {
        $path_parts = pathinfo($file);

        if ($path_parts['extension'] == 'jpg' && $file != "canvas.jpg" && $file != "DEMO.jpg") {
            array_push($foldersToDelete, $path_parts['basename']);
        }
    }

    foreach ($foldersToDelete as $fold) {
        $logger->log(substr(sprintf('%o', fileperms($fold)), -4));
        $logger->log("Deleting: " . $fold);
        chmod($fold, 0777);
        //unlink($fold);
    }

}

