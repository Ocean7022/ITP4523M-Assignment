<?php

header('Content-type:Application/json');
session_start();
$userID = $_SESSION['userData']['id'];

require_once('conn.php');

$sql = "SELECT * FROM purchasemanager WHERE purchaseManagerID = '$userID'";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$tmp = mysqli_fetch_assoc($data);

$userData = array(
    'name' => $tmp['managerName'],
    'id' => $tmp['purchaseManagerID'],
    'contact' => $tmp['contactNumber'],
    'address' => $tmp['warehouseAddress']
);

mysqli_free_result($data);
mysqli_close($conn);

echo json_encode($userData);
?>