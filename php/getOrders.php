<?php

if (!file_get_contents('php://input')) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
if (file_get_contents('php://input') == 'all')
    $userID = '%';
else {
    session_start();
    $userID = $_SESSION['userData']['id']; //get user id
}

require_once('conn.php');

$sql = "SELECT Orders.orderID, Orders.purchaseManagerID, Orders.orderDateTime, Orders.deliveryAddress, Orders.deliveryDate, SUM(OrdersItem.orderQty * OrdersItem.itemPrice) AS totalPrice, PurchaseManager.managerName 
        FROM Orders 
        INNER JOIN OrdersItem ON Orders.orderID = OrdersItem.orderID 
        INNER JOIN PurchaseManager ON Orders.purchaseManagerID = PurchaseManager.purchaseManagerID 
        WHERE Orders.purchaseManagerID LIKE '%$userID' 
        GROUP BY Orders.orderID DESC";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));

while ($orderData = mysqli_fetch_assoc($data)) {
    //get discount and new price
    $url = "http://127.0.0.1/api/discountCalculator/" . $orderData['totalPrice'];
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = json_decode(curl_exec($curl));
    curl_close($curl);

    $orderList[] = array(
        'orderID' => $orderData['orderID'],
        'purManID' => $orderData['purchaseManagerID'],
        'orderDT' => $orderData['orderDateTime'],
        'address' => $orderData['deliveryAddress'],
        'devDate' => $orderData['deliveryDate'],
        'totalPrice' => $response->NewOrderAmount
    );
}

mysqli_free_result($data);
mysqli_close($conn);

echo json_encode($orderList);
?>