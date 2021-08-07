<?php
include_once 'conn.php';
$sql = "Select * from login;";
$result = mysqli_query($con, $sql);
$resultCheck = mysqli_num_rows($result);
if ($resultCheck  > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $password[] = (object)[
            'pass' => $row['pass']
        ];
    }
    $myJSON = json_encode($password);
    echo $myJSON;
}
