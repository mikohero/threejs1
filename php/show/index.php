<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
include "config.php";

$query=mysqli_query($connect, "SELECT * FROM files");
while($data = mysqli_fetch_array($query)){
    echo $data["filename"]."<br>".$data["desc1"]."<br>____________________<br/>";
}


?>