
<?php
include "inc/header.php";
?>  

<?php 
    $json = file_get_contents("php://input");
    $values = json_decode($json,true);

    $name = trim($values["name"]);
    if (strcmp($name,"")!=0) {

        $testResult = $c->query("select name from project where (name='$name');");
        error_log($testResult->num_rows);
        if ($testResult->num_rows == 0) {
            $query = "insert into project (name,projecttype_id) values('$name',1)";
            $res = $c->query($query);
        }
    }
//    error_log($query);


?>
