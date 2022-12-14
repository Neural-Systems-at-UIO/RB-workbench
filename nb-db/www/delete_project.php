
<?php
include "inc/header.php";
?>  

<?php 
    $json = file_get_contents("php://input");
    $values = json_decode($json,true);

    $id = trim($values["id"]);

    $query = "delete from project where id=$id";
    $res = $c->query($query);


?>
