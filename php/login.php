<?php

if (!json_decode(file_get_contents('php://input'))) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
$loginInfo = json_decode(file_get_contents('php://input'));
$id = $loginInfo->id;
$password = $loginInfo->pwd;

require_once('conn.php');

$sql = "SELECT * FROM (SELECT purchaseManagerID AS id, password AS pwd, managerName AS name, contactNumber AS tel, warehouseAddress AS address, null AS comName
                        FROM purchasemanager 
                        UNION 
                        SELECT supplierID AS id, password AS pwd, contactName AS name, contactNumber AS tel, address, companyName AS comName 
                        FROM supplier) 
                        AS subquery 
                        WHERE id = '$id' AND pwd = '$password';";
$data = mysqli_query($conn, $sql) or die(mysqli_error($conn));
if (mysqli_num_rows($data) == 1) {
    $rsData = mysqli_fetch_assoc($data);

    session_start();
    session_destroy();

    $userData = array(
        'id' => $rsData['id'],
        'name' => $rsData['name'],
        'address' => $rsData['address'],
        'comName' => $rsData['comName']
    );

    session_start();
    $_SESSION['userData'] = $userData;
    $_SESSION['loginTime'] = time();

    if (substr($id, 0, 1) == 'p')
        $link = './Purchase/make.html';
    elseif (substr($id, 0, 1) == 's')
        $link = './Supplier/insert.html';

    echo json_encode(
        array(
            "login" => "pass",
            "link" => $link
        )
    );
} else {
    echo json_encode(
        array(
            "login" => "fail",
            "link" => null
        )
    );
}

mysqli_free_result($data);
mysqli_close($conn);
?>