<?php
  $str = file_get_contents('../data-1.json');
  $json = json_decode($str,true);
  $ciudades = [];
  $i=0;
  $flag=false;
  foreach ($json as $Id) {
    $ciudad_json = $json[$i]['Ciudad'];
    if (!in_array($ciudad_json, $ciudades)) {
      array_push($ciudades,$ciudad_json);
      $flag=true;
    }
    if($flag){
      ?>
      <option value="<?php echo $ciudad_json ?>" selected><?php echo $ciudad_json ?></option>
      <?php
    }
    $flag = false;
    $i++;
  }
  ?>
  <option value="" selected>Elige una ciudad</option>
