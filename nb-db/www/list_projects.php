
<?php
include "inc/header.php";
?>  

<?php 



    $res = $c->query("select id,name from project");
    $rows = array();
    while($r = $res->fetch_assoc()) {
        $rows[] = $r;
    }
    print json_encode($rows);

?>
