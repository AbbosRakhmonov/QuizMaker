<?php
include_once 'conn.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $an_tr1 = $_POST['an_tr1'];
    $an2 = $_POST['an2'];
    $an3 = $_POST['an3'];
    $an4 = $_POST['an4'];

    mysqli_query($con, "INSERT INTO question (id, name, an_tr1, an2, an3, an4) VALUES ('$id','$name','$an_tr1','$an2','$an3','$an4')");
}
