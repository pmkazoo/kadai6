<?php
// ファイルを開く
$show_aquarium_name = $_POST['show_aquarium_name'];

$openFile = fopen('../data/data.csv', 'r');

$show_arr = [];

// ファイル内容を1行ずつ読み込んで出力
while ($str = fgets($openFile)) {
    // echo nl2br($str);
    $temp_arr = explode(",",$str);
    if ($temp_arr[0] === $show_aquarium_name){
        $show_arr = $temp_arr[2] . "," . $temp_arr[3];
    }
};

$php_json = json_encode($show_arr);

fclose($openFile);

header("Location:../index.html");
