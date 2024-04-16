<?php

if (!file_get_contents('php://input')) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
$data = json_decode(file_get_contents('php://input'));
$orderID = $data->orderID;
$sort = $data->sortDetail;
$orderBy = '';
$length = -1;

//count sort column
foreach ($sort as $key => $value) {
    if ($value != 'null')
        $length++;
}

//combine sort conditions
if ($length != -1)
    $orderBy = 'ORDER BY ';
$i = 0;
foreach ($sort as $key => $value) {
    if ($value != 'null') {
        $orderBy = $orderBy . $key . ' ' . $value;
        if ($i != $length)
            $orderBy = $orderBy . ', ';
        $i++;
    }
}

require_once('conn.php');

//select order information
$sql = "SELECT orders.*, purchasemanager.managerName AS 'name',
        (SELECT SUM(orderQty * itemPrice) FROM ordersitem WHERE orderID = orders.orderID) AS 'totalPrice'
        FROM orders
        JOIN purchasemanager ON orders.purchaseManagerID = purchasemanager.purchaseManagerID
        WHERE orders.orderID = $orderID";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$orderInfo = mysqli_fetch_assoc($data);

$orderTotalPrice = $orderInfo['totalPrice'];

//get discount and new price
$url = "http://127.0.0.1/api/discountCalculator/$orderTotalPrice";
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = json_decode(curl_exec($curl));
curl_close($curl);

//select order items
$sql = "SELECT ordersitem.*, item.imageFile, item.itemName, supplier.companyName, orderQty * itemPrice AS 'totalPrice' 
        FROM ordersitem, item, supplier
        WHERE orderID = $orderID AND ordersitem.itemID = item.itemID AND item.supplierID = supplier.supplierID $orderBy";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));

while ($tmp = mysqli_fetch_assoc($data)) {
    $orderItmes[] = array(
        'imageFile' => $tmp['imageFile'],
        'itemID' => $tmp['itemID'],
        'itemName' => $tmp['itemName'],
        'companyName' => $tmp['companyName'],
        'orderQty' => $tmp['orderQty'],
        'itemPrice' => $tmp['itemPrice'],
        'totalPrice' => $tmp['totalPrice'],
    );
}

mysqli_free_result($data);
mysqli_close($conn);

echo json_encode(
    array(
        "orderInfo" => $orderInfo,
        "orderItmes" => $orderItmes,
        "newPrice" => $response->NewOrderAmount,
        "discount" => $response->DiscountRate
    )
);
?>