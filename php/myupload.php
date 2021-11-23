<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
session_start();

?>
<!DOCTYPE html>
<html lang="da">
<head>
  <title>Fil Upload</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <?php
    if (isset($_SESSION['message']) && $_SESSION['message'])
    {
      printf('<b>%s</b>', $_SESSION['message']);
      unset($_SESSION['message']);
    }
  ?>
  <form method="POST" action="upload1.php" enctype="multipart/form-data">
    <div>
      <span>Vælg Fil - hvis obj og mtl så vælg 2 filer, ellers kun første</span>
      <input type="file" name="uploadedFile" />
      <input type="file" name="mtlFile" />
    </div>
    <br/>
    <label for="desc1">Beskrivelse</label><br>
    <input type="text" id="desc1" name="desc1" maxlength="100" size="50"><br/>

    <input type="submit" name="uploadBtn" value="Upload" />
  </form>
</body>
</html>
