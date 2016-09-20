<?php

# This code is invoked when a new user registers into the system

$config = include('../../config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$session_id = $_POST['session_id'];
$restore_slide = $_POST['restore_slide'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$update_restore_slide= "UPDATE login set restore_slide=$restore_slide, last_login=NOW() where session_id=$session_id";
if ($conn->query($update_restore_slide) === TRUE) {
   # echo "New record created successfully";
} else {
   # echo "Error: " . $sql . "<br>" . $conn->error;
}


$conn->close();
?>
