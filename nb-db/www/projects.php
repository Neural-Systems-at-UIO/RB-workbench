<?php
include "inc/header.php";
?>    


<?php

// Perform insert
if (isset($_POST['pname'])) {
    $c->query("insert into project (name, projecttype_id) values('".$_POST['pname']."','".$_POST['projecttype']."');");
}

// perform delete
if (isset($_POST['delete_id'])) {
    $c->query("delete from project where id=".$_POST['delete_id'].";");
}


$projecttypes = $c->query("select id,value from projecttype;")

?>

<table class="central">
  <tr><td>


<table class="wb"> 
<?php 
    $res = $c->query("select project.id, project.name, projecttype.value from project inner join projecttype on projecttype.id=project.projecttype_id;");
    while ($r = $res->fetch_assoc()) {
        print "<tr>";
        print "<td class=\"wb\">".$r['name']."</td>";
        print "<td class=\"wb\">".$r['value']."</td>";

        // Delete button

        print "<td><form method=\"post\" action=\"projects.php\">";
        print "<input type=\"submit\" value=\"Delete\">";

        print "<input type=\"hidden\" name=\"delete_id\" value=\"".$r['id']."\">";
        

        print "</form>";
        print "</tr>";
    }

?>
</table>
<table class="central"><tr><td>
<form  method="post" action="projects.php">
  <label for="name">Project name:</label>
  <input type="text" id="pname" name="pname">
  <select name="projecttype">
    <?php
  while ($r = $projecttypes->fetch_assoc()) {
    print "<option value=\"".$r['id']."\">".$r['value']."</option>";    
  }


    ?>
  </select>
  <input type="submit" value="New project">
</form> 
  </td></tr>
</table>
<p>

</tr></td></table>

<?php
include"inc/footer.php";
?>


</body>
</html>