<?php
include_once 'conn.php';
$sql = "Select * from question;";
$result = mysqli_query($con, $sql);
$resultCheck = mysqli_num_rows($result);
if ($resultCheck  > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $question[] = (object)[
            'id' => $row['id'],
            'name' => $row['name'],
            'an_tr1' => $row['an_tr1'],
            'an2' => $row['an2'],
            'an3' => $row['an3'],
            'an4' => $row['an4']
        ];
    }
}

$myJSON = json_encode($question);
echo $myJSON;

if (isset($_POST['name'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $an_tr1 = $_POST['an_tr1'];
    $an2 = $_POST['an2'];
    $an3 = $_POST['an3'];
    $an4 = $_POST['an4'];

    mysqli_query($con, "UPDATE question SET name='$name', an_tr1='$an_tr1', an2='$an2', an3='$an3', an4='$an4' WHERE id='$id'");
}
