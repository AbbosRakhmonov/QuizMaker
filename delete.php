<?php
include_once 'conn.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    mysqli_query($con, "DELETE FROM question WHERE question.id = '$id'");
}
