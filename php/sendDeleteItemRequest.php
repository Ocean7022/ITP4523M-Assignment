<?php

if (!file_get_contents('php://input')) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
$itemID = file_get_contents('php://input');

require_once('conn.php');

//check for existing related orders
$sql = "SELECT * FROM item, ordersitem, orders 
        WHERE item.itemID = ordersitem.itemID 
        AND ordersitem.orderID = orders.orderID 
        AND item.itemID = $itemID";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));
if (mysqli_num_rows($data) != 0) {
    echo json_encode(
        array(
            'delete' => 'fail',
            'msg' => 'Could not delete item<br>There are ' . mysqli_num_rows($data) . ' outstanding orders for this item'
        )
    );
    exit();
}

//delete item
$sql = "DELETE FROM item WHERE itemID = $itemID";
mysqli_query($conn, $sql) or die(mysqli_error($conn));

echo json_encode(
    array(
        'delete' => 'success',
        'msg' => 'Item Deleted!'
    )
);

mysqli_free_result($data);
mysqli_close($conn);
?>