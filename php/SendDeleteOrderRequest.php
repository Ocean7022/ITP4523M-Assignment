<?php

if (!file_get_contents('php://input')) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
$id = file_get_contents('php://input');

require_once('conn.php');

//check date
$sql = "SELECT * FROM orders, ordersitem 
        WHERE orders.orderID = $id AND orders.orderID = ordersitem.orderID 
        AND DATE(orders.deliveryDate) >= DATE_ADD(CURDATE(), INTERVAL 2 DAY)";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));
if (mysqli_num_rows($data) == 0) {
    echo json_encode(
        array(
            'delete' => 'fail',
            'msg' => 'The order can only be deleted two days or before the receipts delivery date'
        )
    );
    exit();
}

//update the stock item quantity
while ($item = mysqli_fetch_assoc($data)) {
    $sql = "UPDATE item SET stockItemQty = stockItemQty + " . $item['orderQty'] . " WHERE itemID = " . $item['itemID'];
    mysqli_query($conn, $sql) or die(mysqli_error($conn));
}

//delete items
$sql = "DELETE FROM ordersitem WHERE orderID = $id";
mysqli_query($conn, $sql) or die(mysqli_error($conn));

//delete order
$sql = "DELETE FROM orders WHERE orderID = $id";
mysqli_query($conn, $sql) or die(mysqli_error($conn));

echo json_encode(
    array(
        'delete' => 'success',
        'msg' => 'Order Deleted!'
    )
);

mysqli_free_result($data);
mysqli_close($conn);
?>