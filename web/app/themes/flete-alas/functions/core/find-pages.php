<?php 

function findPages($directory, $fileExtension) {
    $filesDirectory = glob(get_template_directory() .  $directory . '/*.' . $fileExtension);
    $files = [];
    foreach ($filesDirectory as $file) {
        $fileName = str_replace([get_template_directory() . $directory ,$fileExtension,'.','/'],"",$file);
        array_push($files, $fileName);
    }
    return $files;
}