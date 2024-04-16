<?php

if (!file_get_contents('php://input')) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
$itemID = file_get_contents('php://input');

require_once('conn.php');
$sql = "SELECT * FROM item WHERE itemID = $itemID";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$itemInfo = mysqli_fetch_assoc($data);

echo json_encode(
    array(
        'id' => $itemInfo['itemID'],
        'supID' => $itemInfo['supplierID'],
        'name' => $itemInfo['itemName'],
        'description' => $itemInfo['itemDescription'],
        'qty' => $itemInfo['stockItemQty'],
        'price' => $itemInfo['price'],
        'file' => $itemInfo['ImageFile']
    )
);

mysqli_free_result($data);
mysqli_close($conn);
?>