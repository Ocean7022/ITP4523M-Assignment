<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
session_start();
$supID = $_SESSION['userData']['id'];
extract($_POST);

$fileName = $itemImage; //default name

//check if there is a file uploaded
if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $image = $_FILES['image'];
    $imageType = explode('/', $image['type'])[1];

    //check file type
    if ($imageType != "jpg" && $imageType != "jpeg" && $imageType != "png" && $imageType != "gif") {
        echo json_encode(
            array(
                'edit' => 'fail',
                'msg' => 'Wrong file type!<br>Only JPG, JPEG, PNG and GIF file formats are allowed'
            )
        );
        exit();
    }

    $fileName = $itemID . '.' . $imageType; //update the image file name
    move_uploaded_file($image['tmp_name'], "../images/$fileName"); //update item image
}

require_once('conn.php');

//update item data
$sql = "UPDATE item 
        SET itemName = '$itemName', ImageFile = '$fileName', itemDescription = '$description', stockItemQty = '$quantity', price = '$price' 
        WHERE itemID = $itemID";
mysqli_query($conn, $sql) or die(mysqli_error($conn));

echo json_encode(
    array(
        'edit' => 'success',
        'msg' => 'Item edited successfully'
    )
);

mysqli_close($conn);
?>