<?php
  $str = file_get_contents('../data-1.json');
  $json = json_decode($str,true);
  $ciudades = [];
  $i=0;
  foreach ($json as $Id) {
    $ciudad_json = $json[$i]['Ciudad'];
    if (!in_array($ciudad_json, $ciudades)) {
      array_push($ciudades,$ciudad_json);
    }
    $i++;
  }
  echo '<pre>' . print_r($ciudades, true) . '</pre>';  
?>
