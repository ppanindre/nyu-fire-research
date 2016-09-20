<?php
$config = include('config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$type = $_POST['type'];

// echo '<script type="text/javascript">console.log(2);</script>';


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql0 = "SELECT question
  FROM questions AS r1 JOIN
       (SELECT CEIL(RAND() *
                     (SELECT MAX(id)
                        FROM questions where type='$type')) AS id )
        AS r2
 WHERE r1.id >= r2.id and type='$type'
 ORDER BY r1.id ASC
 LIMIT 3";

 $sql = "SELECT * FROM questions WHERE type ='$type' and id >= (SELECT FLOOR( MAX(id) * RAND()) FROM questions where type='$type' ) ORDER BY id LIMIT 3;";


$result = $conn->query($sql);

if ($result->num_rows > 0) {

	echo '{
"questions": [';
    while($row = $result->fetch_assoc()) {

    	echo '{"q": "'. $row['question']. '"},';

    }
    echo ']}';
//user exists, do something
} else {
echo '{"status": false}';
}

$conn->close();
?>
