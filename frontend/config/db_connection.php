<?php
$DATABASE_HOST = 'localhost';
$DATABASE_USER = 'root';
$DATABASE_PASS = '';
$DATABASE_NAME = 'naive_bayes_3';

$conn = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
// if (mysqli_connect_errno()) {
//     echo 'Failed to connect to MySQL: ' . mysqli_connect_error();
// } else {
//     echo 'Database connection successful!';
// }

// mysqli_close($conn);
?>