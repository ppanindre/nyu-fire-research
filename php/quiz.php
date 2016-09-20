<?php
$config = include('config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$session_id = $_POST['session_id'];
$type = $_POST['type'];
$question = $_POST['question'];
$answer = $_POST['answer'];
$score = $_POST['score'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO quiz (session_id,type,question,answer,score)
VALUES ($session_id, '$type',$question,'$answer',$score)";

if ($conn->query($sql) === TRUE) {
    echo TRUE;
} else {
    echo FALSE;
}

$conn->close();
?>
