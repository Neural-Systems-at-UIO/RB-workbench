<?php

function connect_db() {
    $servername = "localhost";
    $username = "nbw-user";
    $password = "nbw";
    $dbname = "nbw";
    
    // Create connection
    $c = new mysqli($servername, $username, $password,$dbname);
    
    // Check connection
    if ($c->connect_error) {
      die("Connection failed: " . $c->connect_error);
    }
    //echo "Connected successfully";
    return $c;
}

?>
