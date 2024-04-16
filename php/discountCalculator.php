<?php

if (!extension_loaded("curl")) {
  die("enable library curl first");
}

header('Content-type:Application/json');
$totalPrice = file_get_contents('php://input'); //get price from ajax request

$url = "http://127.0.0.1/api/discountCalculator/$totalPrice";

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>