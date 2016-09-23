<?php
$config = include('../../config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$module_id = $_POST['module_id'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$QUERY = "Select email,last_login,GROUP_CONCAT(answers order by question asc separator '*') as attempts
from(
Select email,last_login,question,
GROUP_CONCAT(answer order by answer)as answers from login l,quiz q
where l.session_id=q.session_id
and l.training_completed=1
and l.module_id=$module_id
and type in ('RQ')
and score <>0
group by email,last_login, question
order by email,last_login)x
group by email,last_login";



$result = $conn->query($QUERY);

  $json = array();

  while($row = $result->fetch_assoc()) {

  $item = array(
        'name' => $row['email'],
        'email' => $row['email'],
        'last_login' => $row['last_login'],
        'attempts' => $row['attempts']
    );
    array_push($json, $item);
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;


$conn->close();
?>
