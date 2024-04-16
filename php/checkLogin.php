<?php

if (!file_get_contents('php://input')) {
    echo 'Why you here?';
    exit();
}

header('Content-type:Application/json');
$url = file_get_contents('php://input'); //get url from ajax

if (!strpos($url, 'index')) { //pass the check if user at login page
    session_start();

    //login state check
    //If the user is not logged in, return fail
    if (!isset($_SESSION['userData'])) {
        echo json_encode(array('check' => 'fail'));
        exit();
    }

    //get user data
    $userData = $_SESSION['userData'];
    $userid = $userData['id'];
    $username = $userData['name'];
    $comName = $userData['comName'];

    //count the time
    $time = time() - $_SESSION['loginTime'];

    //time check
    if (time() - $_SESSION['loginTime'] > 5 * 60) { //if still time over 5 min, return fail
        session_unset(); //clear user data 
        session_destroy(); //clear user data
        echo json_encode(array('check' => 'fail'));
        exit();
    } else //set new time if pass the time check
        $_SESSION['loginTime'] = time();

    //user location check
    if (substr($userid, 0, 1) == 'p' && strpos($url, 'Purchase')) { //return user data if user in correct location
        echo json_encode(
            array(
                'check' => 'pass',
                'userid' => $userid,
                'username' => $username,
                'time' => $time
            )
        );
    } elseif (substr($userid, 0, 1) == 's' && strpos($url, 'Supplier')) { //return user data if user in correct location
        echo json_encode(
            array(
                'check' => 'pass',
                'userid' => $userid,
                'username' => $username,
                'time' => $time,
                'comName' => $comName
            )
        );
    } else {
        session_unset();
        session_destroy();
        echo json_encode(array('check' => 'fail'));
    }
} else //pass the check if user at login page
    echo json_encode(array("check" => "pass"));
?>