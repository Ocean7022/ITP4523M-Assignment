<?php

header('Content-type:Application/json');
extract($_POST);

require_once('../php/conn.php');

//check stock
$sql = "SELECT * FROM item WHERE stockItemQty > 0";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));

while ($itemData = mysqli_fetch_assoc($data)) {
    $item = 'item' . $itemData['itemID']; //combined value match form data <input name = "item1"> ... <input name = "item2"> //purMakeOrder.js line 25
    if (${$item} != 0) //skip checking items with an order quantity of 0
        if (${$item} > $itemData['stockItemQty']) { //check each item stock
            echo json_encode(
                array(
                    'makeOrder' => 'fail',
                    'item' => $itemData['itemName'],
                    'qty' => $itemData['stockItemQty']
                )
            );
            exit();
        }
}

//get new order number
$sql = "SELECT MAX(orderID) AS 'numOfOrder' FROM orders";
$newOrderNum = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$newOrderNum = mysqli_fetch_assoc($newOrderNum)['numOfOrder'] + 1;

session_start();
$userData = $_SESSION['userData']; //get user information

//creata a new order
$sql = "INSERT INTO orders (`orderID`, `purchaseManagerID`, `deliveryAddress`, `deliveryDate`)
            VALUES ($newOrderNum, '" . $userData['id'] . "', '" . $userData['address'] . "', '$date')";
mysqli_query($conn, $sql) or die(mysqli_error($conn));

$sql = "SELECT * FROM item WHERE stockItemQty > 0";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));

while ($itemData = mysqli_fetch_assoc($data)) {
    $item = 'item' . $itemData['itemID']; //like line 13
    if (${$item} != 0) { //skip inserting items with an order quantity of 0
        //insert item in order
        $sql = "INSERT INTO ordersitem VALUES ($newOrderNum, " . $itemData['itemID'] . ", ${$item} , " . $itemData['price'] . ")";
        mysqli_query($conn, $sql) or die(mysqli_error($conn));
        //update stock
        $sql = "UPDATE item SET stockItemQty = stockItemQty - ${$item} WHERE itemID = " . $itemData['itemID'];
        mysqli_query($conn, $sql) or die(mysqli_error($conn));
    }
}

echo json_encode(
    array(
        'makeOrder' => 'success',
        'newOrderNum' => $newOrderNum
    )
);

mysqli_close($conn);
?>