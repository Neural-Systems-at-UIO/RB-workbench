
<?php
include "inc/header.php";
?>  

<?php 
    $res = $c->query("select id, name from project");
    // while ($r = $res->fetch_assoc()) {
    //     print "<tr>";
    //     print "<td class=\"wb\">".$r['firstname']."</td><td class=\"wb\">".$r['lastname']."</td>";
    //     print "</tr>";

    // };
    $rows = array();
    while($r = $res->fetch_assoc()) {
        $rows[] = $r;
    }
    print json_encode($rows);

?>
