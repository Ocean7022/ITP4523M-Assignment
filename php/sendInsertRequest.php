<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
session_start();
$supID = $_SESSION['userData']['id'];
extract($_POST);
$image = $_FILES['image']; //get file
$imageType = explode('/', $image['type'])[1]; //get file type

//check file type
if ($imageType != "jpg" && $imageType != "jpeg" && $imageType != "png" && $imageType != "gif") {
    echo json_encode(
        array(
            'insert' => 'fail',
            'msg' => 'Wrong file type!<br>Only JPG, JPEG, PNG and GIF file formats are allowed'
        )
    );
    exit();
}

require_once('conn.php');

//get new item id
$sql = "SELECT MAX(itemID) AS max FROM item";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$newItemID = mysqli_fetch_assoc($data)['max'] + 1;

//set file name //like 3.png or 6.jpg
$fileName = $newItemID . '.' . $imageType;

//insert new item
$sql = "INSERT INTO item(itemID, supplierID, itemName, ImageFile, itemDescription, stockItemQty, price) 
                VALUES ('$newItemID','$supID','$itemName','$fileName','$description','$quantity','$price')";
mysqli_query($conn, $sql) or die(mysqli_error($conn));

echo json_encode(
    array(
        'insert' => 'success',
        'msg' => 'Item inserted<br>New item ID : ' . $newItemID
    )
);

mysqli_free_result($data);
mysqli_close($conn);

//save image
move_uploaded_file($image['tmp_name'], "../images/$fileName");
?>