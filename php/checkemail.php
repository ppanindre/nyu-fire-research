<?php
$config = include('../../config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$email = $_POST['email'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$check_user_exists_sql = "SELECT * FROM login WHERE email= '$email'";
$result = $conn->query($check_user_exists_sql);
if ($result->num_rows > 0) {
	echo 'true';
	//user exists, do something
} else {
	echo 'false';
}

$conn->close();
?>
