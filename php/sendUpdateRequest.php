<?php

if (!file_get_contents('php://input')) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
session_start();
$userID = $_SESSION['userData']['id'];
extract($_POST);

require_once('conn.php');

$sql = "SELECT * FROM purchasemanager WHERE purchaseManagerID = '$userID'";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));
if (mysqli_fetch_assoc($data)['password'] != $oldPwd && $type == 'passwordAndOther') { //check password
    echo json_encode(
        array(
            'update' => 'fail',
            'msg' => 'Old Password not correct!'
        )
    );

    mysqli_free_result($data);
    mysqli_close($conn);

    exit();
} else {
    if ($type == 'passwordAndOther') //update all information
        $sql = "UPDATE purchasemanager SET `password` = '$newPwd', contactNumber = '$contact', warehouseAddress = '$address' WHERE purchaseManagerID = '$userID'";
    else //only update contactNumber and warehouseAddress
        $sql = "UPDATE purchasemanager SET contactNumber = '$contact', warehouseAddress = '$address' WHERE purchaseManagerID = '$userID'";

    mysqli_query($conn, $sql) or die(mysqli_error($conn));
    echo json_encode(
        array(
            'update' => 'success',
            'msg' => 'Information updated'
        )
    );

    mysqli_free_result($data);
    mysqli_close($conn);
}
?>