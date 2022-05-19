<?php
$aquarium_name = $_POST['aquarium_name'];
$creature_name = $_POST['creature_name'];
$canvas = $_POST['canvas'];
$ary = [$aquarium_name,$creature_name,$canvas];

// aモードでファイルをオーブン
$file = fopen('../data/data.csv', 'a');

//ファイルへの書き込み
fputcsv($file, $ary);
// fputcsv($file, $canvas);

fclose($file);


// // aモードでファイルをオーブン
// $file = fopen('../data/data.txt', 'a');

// //ファイルへの書き込み
// fwrite($file, $aquarium_name . " " .  $creature_name . "\n");

// fclose($file);

header("Location:../index.html");

?>



