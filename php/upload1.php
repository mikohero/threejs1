<?php
include "config.php";
$uploaddir = 'models/';
$uploadfile = $uploaddir . basename($_FILES['uploadedFile']['name']);

$fileNameCmps = explode(".", $uploadfile);
$fileExtension = strtolower(end($fileNameCmps));
$desc1 = mysqli_real_escape_string($connect,$_POST["desc1"]);

echo '<pre>';
if (move_uploaded_file($_FILES['uploadedFile']['tmp_name'], $uploadfile)) {
    echo "File is valid, and was successfully uploaded.\n";
    $query1="INSERT INTO files VALUES (NULL, '".$uploadfile."', '".$desc1."')";
    if (!mysqli_query($connect, $query1)) {
          $message ='Database problem try again.';
        }
} else {
    echo "Possible file upload attack!\n";
}

echo 'Here is some more debugging info:';
print_r($_FILES);

print "</pre>";

?>