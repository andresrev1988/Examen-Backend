<?php
  $str = file_get_contents('../data-1.json');
  $json = json_decode($str,true);
  $tipos = [];
  $i=0;
  foreach ($json as $Id) {
    $tipo_json = $json[$i]['Tipo'];
    if (!in_array($tipo_json, $tipos)) {
      array_push($tipos,$tipo_json);
    }
    $i++;
  }
  echo '<pre>' . print_r($tipos, true) . '</pre>';
?>
