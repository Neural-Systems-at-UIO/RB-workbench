<?php
include "inc/header.php";
?>    


<?php

// Perform insert
if (isset($_POST['fname'])) {
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $c->query("insert into user (firstname, lastname) values('".$fname."','".$lname."');");
}

// perform delete
if (isset($_POST['delete_id'])) {
    $c->query("delete from user where id=".$_POST['delete_id'].";");
}

?>

<table class="central">
  <tr><td>


<table class="wb"> 
<?php 
    $res = $c->query("select id, firstname, lastname from user");
    while ($r = $res->fetch_assoc()) {
        print "<tr>";
        print "<tr><td class=\"wb\">".$r['firstname']."</td><td class=\"wb\">".$r['lastname']."</td>";

        // Delete button

        print "<td><form method=\"post\" action=\"users.php\">";
        print "<input type=\"submit\" value=\"Delete\">";

        print "<input type=\"hidden\" name=\"delete_id\" value=\"".$r['id']."\">";
        

        print "</form>";
        print "</tr>";
    }

?>
</table>
<table class="central"><tr><td>
<form  method="post" action="users.php">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname">
  <input type="submit" value="Create new user">
</form> 
  </td>
  </tr>
</table>
<p>
<?php
if (isset($_POST['delete_id'])) {
//    echo $_POST['delete_id'];
}
?>

</tr></td></table>

<?php
include"inc/footer.php";
?>


</body>
</html>