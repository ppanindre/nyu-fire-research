<?php
$config = include('../../config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$QUERY = "SELECT type,question, count(*) as num_of_response,max(answer) as max_response,
min(answer) as min_response,   round(avg(answer)) as avg_response
FROM Alive.quiz
group by type,question

UNION

SELECT type,question, count(*) as num_of_response,max(answer) as max_response,
min(answer) as min_response,   round(avg(answer)) as avg_response
FROM quiz,login where quiz.session_id=login.session_id and department='FDNY'
group by type,question

UNION

SELECT type,question, count(*) as num_of_response,max(answer) as max_response,
min(answer) as min_response,   round(avg(answer)) as avg_response
FROM quiz,login where
group by type,question";


$result = $conn->query($QUERY);

$json = array();

while($row = $result->fetch_assoc()) {

$item = array(
      'type' => $row['type'],
      'question' => $row['question'],
      'num_of_response' => $row['num_of_response'],
      'max_response' => $row['max_response'],
      'min_response' => $row['min_response'],
      'avg_response' => $row['avg_response']
  );
  array_push($json, $item);
}
$jsonstring = json_encode($json);
echo $jsonstring;
  

$conn->close();
?>
