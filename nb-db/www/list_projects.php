
<?php
include "inc/header.php";
?>  

<?php 
<<<<<<< HEAD



    $res = $c->query("select id,name from project");
=======
    $res = $c->query("select id, name from project");
    // while ($r = $res->fetch_assoc()) {
    //     print "<tr>";
    //     print "<td class=\"wb\">".$r['firstname']."</td><td class=\"wb\">".$r['lastname']."</td>";
    //     print "</tr>";

    // };
>>>>>>> c0e85d33ec8f3033668c25d7f016b244d3e1eed0
    $rows = array();
    while($r = $res->fetch_assoc()) {
        $rows[] = $r;
    }
    print json_encode($rows);

?>
