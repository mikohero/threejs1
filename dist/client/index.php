<?php 
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8 " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Three.js</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        
        <style>
            body {
                overflow: hidden;
                margin: 10px;
            }
            
            #mload {
                margin: 5px;

            }
            #artifactCanvas {
              width: 500px;
              height: 400px;
              margin: 5px;
            }

        </style>
        <script>
          
          function getComboA(selectObject) {
            var value = selectObject.selectedIndex;  
            document.getElementById('w3review').value = a[value];
            console.log(value);
        }
        </script>
    </head>

    <body>
    <script>
          let a = [];
     </script>
        <div class="container">
            <div class="row">
              <div class="col-md-3">
                <label for="models">Vælg en model:</label>
                <select name="models" id="models" onchange="getComboA(this)">
                      <?php 
                      $i=0;
                      $a=array();
                      include "config.php";
                      mysqli_set_charset($connect,"utf8");
                      $query=mysqli_query($connect, "SELECT filename, desc1 FROM files");
                        while($data = mysqli_fetch_assoc($query)){
                            if ($i == 0){
                              echo "<"."option value='".$data["filename"]."'"." selected>".$data["filename"]."<"."/"."option".">";
                            }else {
                              echo "<"."option value='".$data["filename"]."'".">".$data["filename"]."<"."/"."option".">";
                            } 
                            array_push($a,$data["desc1"]);                            
                            $i++;
                        }
                        //print_r($a);
                        ?><script>a = <?php echo json_encode($a);?>;</script>
                </select> 
                <textarea id="w3review" name="w3review" rows="4" cols="50">
                  <?php echo $a[0]; ?>
                </textarea>
                <script>
                  
                  console.log('array is: '+a);
                  document.getElementById('w3review').value = a[0];

                </script>
                <button id="mload">Load your model</button>
              </div>
              <div class="col-md-9">
                <canvas id="artifactCanvas">
                </canvas>
                
              </div>
             
            </div>
          </div>
        
        
        <script type="module" src="bundle.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

    </body>
</html>