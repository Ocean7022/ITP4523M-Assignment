<?php

if (!file_get_contents('php://input')) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
$way = file_get_contents('php://input');

require_once('conn.php');

//use on purchase make order page
if ($way == 'All') {
    $sql = "SELECT * FROM item WHERE stockItemQty > 0";
}
//use on supplier enit item page
else if ($way == 'Sup') {
    session_start();
    $supID = $_SESSION['userData']['id'];
    $sql = "SELECT * FROM item WHERE supplierID = '$supID'";
}
//use on supplier generate report page 
else if ($way == 'Report') {
    session_start();
    $supID = $_SESSION['userData']['id'];
    $sql = "SELECT item.ImageFile, item.itemID, item.itemName, COALESCE(SUM(ordersitem.orderQty), 0) AS 'total', COALESCE(SUM(ordersitem.orderQty) * item.price, 0) AS 'amount' 
            FROM item LEFT JOIN ordersitem ON item.itemID = ordersitem.itemID 
            WHERE item.supplierID = '$supID' 
            GROUP BY item.itemID";
}
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));

while ($itemData = mysqli_fetch_assoc($data)) {
    //use on purchase make order page and supplier enit item page
    if ($way == 'All' || $way == 'Sup')
        $itemList[] = array(
            'image' => $itemData['ImageFile'],
            'id' => $itemData['itemID'],
            'name' => $itemData['itemName'],
            'price' => $itemData['price'],
            'stockItemQty' => $itemData['stockItemQty']
        );
    //use on supplier generate report page 
    else if ($way == 'Report')
        $itemList[] = array(
            'image' => $itemData['ImageFile'],
            'id' => $itemData['itemID'],
            'name' => $itemData['itemName'],
            'total' => $itemData['total'],
            'amount' => $itemData['amount']
        );
}

mysqli_free_result($data);
mysqli_close($conn);

echo json_encode($itemList);
?>