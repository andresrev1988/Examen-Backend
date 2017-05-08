<?php
  $ciudad =$_POST['city'];
  $tipo=$_POST['type'];
  $precio_min=(float)$_POST['min'];
  $precio_max=(float)$_POST['max'];
  $str = file_get_contents('../data-1.json');
  $json = json_decode($str,true);
  $i=0;
  $flag=true;
  foreach ($json as $Id) {
    $ciudad_json  = $json[$i]['Ciudad'];
    $tipo_json    = $json[$i]['Tipo'];
    $precio_json  = $json[$i]['Precio'];
    $precio_json  = str_replace("$","",$precio_json);
    $precio_json  = str_replace(",","",$precio_json);
    if($ciudad_json != $ciudad){
      if($ciudad != NULL){
        $flag=false;
      }
    }
    if($tipo_json != $tipo){
      if($tipo != NULL){
        $flag=false;
      }
    }
    if((float)$precio_json < $precio_min){
        $flag=false;
    }
    if((float)$precio_json > $precio_max){
        $flag=false;
    }
    if($flag){
      ?>
      <div class="card horizontal">
        <div class="card-image">
          <img src="./img/home.jpg">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p><strong>Dirección: </strong><?php echo $json[$i]['Direccion']?></p>
            <p><strong>Ciudad: </strong><?php echo $json[$i]['Ciudad']?></p>
            <p><strong>Telefono: </strong><?php echo $json[$i]['Telefono']?></p>
            <p><strong>Codigo Postal: </strong><?php echo $json[$i]['Codigo_Postal']?></p>
            <p><strong>Tipo: </strong><?php echo $json[$i]['Tipo']?></p>
            <p><strong>Precio: </strong><?php echo $json[$i]['Precio']?></p>
          </div>
          <div class="card-action">
            <a href="#">Ver más</a>
          </div>
        </div>
      </div>
      <?php
    }
    $flag=true;
    $i++;
  }
?>
