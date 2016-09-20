<?php

# This code is invoked when a new user registers into the system

$config = include('config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$session_id = $_POST['session_id'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


//need to verify that query
//$register_insert= "update login set <session_id> =1 where email= '$email' and ";

$register_insert= "update login set training_completed=1 where session_id=$session_id";

$result = $conn->query($register_insert);
//$conn->query($register_insert)
//if ($result->num_rows > 0) {
	//echo '{"status":true}'}
//else{
	//echo '{"status":false}'}

$conn->close();
?>
