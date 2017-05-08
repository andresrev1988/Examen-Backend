<?php
  $str = file_get_contents('../data-1.json');
  $json = json_decode($str,true);
  $tipos = [];
  $i=0;
  $flag=false;
  foreach ($json as $Id) {
    $tipo_json = $json[$i]['Tipo'];
    if (!in_array($tipo_json, $tipos)) {
      array_push($tipos,$tipo_json);
      $flag=true;
    }
    if($flag){
      ?>
      <option value="<?php echo $tipo_json ?>" selected><?php echo $tipo_json ?></option>
      <?php
    }
    $flag = false;
    $i++;
  }
  ?>
  <option value="" selected>Elige un tipo</option>
