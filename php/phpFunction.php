<?php

session_start();

$data = json_decode(file_get_contents('php://input'), true);

if ($data['action'] == 'setSessionValue') 
    $_SESSION[$data['valueName']] = $data['value'];


?>