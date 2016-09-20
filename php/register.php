<?php

# This code is invoked when a new user registers into the system

$config = include('../../config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$email = $_POST['email'];
$department = $_POST['dept'];
$unique_id = $_POST['unique_id'];
$module_id = $_POST['module_id'];
$user_id = $_POST['user_id'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$register_insert= "INSERT INTO login (module_id,email,department,unique_id,user_id)
VALUES ($module_id,'$email', '$department', '$unique_id','$user_id')";

if ($conn->query($register_insert) === TRUE) {
   # echo "New record created successfully";
} else {
   # echo "Error: " . $sql . "<br>" . $conn->error;
}

$last_insert_id = "select last_insert_id() as session_id";
$result = $conn->query($last_insert_id);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
    	echo '{	"status": true,
    			"session_id": ' . $row['session_id'] .'}';
    }
//user exists, do something
} else {
	echo '{"status": false}';
}

$conn->close();
?>
