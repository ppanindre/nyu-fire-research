<?php

$config = include('config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$email = $_POST['email'];
$user_id = $_POST['user_id'];
$dpt = $_POST['department'];
$unq = $_POST['unique_id'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$check_user_exists_sql = "SELECT X.session_id,restore_slide,department,email,unique_id,user_id,
SUM(score)as score FROM quiz q
RIGHT OUTER JOIN(
SELECT * FROM login l
where email = '$email' and user_id = '$user_id' and department = '$dpt' and unique_id = '$unq' order by l.session_id desc limit 1
) X on X.session_id=q.session_id";

$result = $conn->query($check_user_exists_sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        if(!$row['session_id']){
			echo '{"status": false}';
        }else{
			echo '{	"status": true,
					"session_id": "'. $row['session_id']. '",
					"restore_slide": "' . $row['restore_slide'] . '",
					"department": "' . $row['department'] . '",
					"email": "' . $row['email'] .'",
					"unique_id": "' . $row['unique_id'] .'",
					"score": "' . $row['score'] .'",
					"user_id": "' . $row['user_id'] .'"}';
		}
    }
//user exists, do something
} else {
	echo '{"status": false}';
}

$conn->close();
?>
