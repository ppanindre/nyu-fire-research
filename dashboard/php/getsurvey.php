<?php
$config = include('../../config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];

$session_id = $_POST['session_id'];
$module_id = $_POST['module_id'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$QUERY = "Select Q1.type,Q1.question,global_avg_response, dept_avg_response,selected_avg_response
FROM (
	(
	SELECT type,question, round(avg(answer)) as global_avg_response
	FROM quiz,login  where login.training_completed=1 and quiz.session_id=login.session_id
    and login.module_id=$module_id
	and type IN ('PRESURV','POSTSURV')
    group by type,question
    order by type,question asc
	)Q1
	left outer join
	(
	SELECT type,question, round(avg(answer)) as dept_avg_response
	FROM quiz,login  where login.training_completed=1 and quiz.session_id=login.session_id
    and login.module_id=$module_id
	and department='FDNY'  and type IN ('PRESURV','POSTSURV')
    group by type,question
    order by type, question asc
	)Q2 on Q1.type=Q2.type and Q1.question=Q2.question
	left outer join
	(
	SELECT type,question, round(avg(answer)) as selected_avg_response
	FROM quiz,login  where login.training_completed=1 and quiz.session_id=login.session_id
    and login.module_id=$module_id
	and department='FDNY' and login.session_id IN ($session_id) and type IN ('PRESURV','POSTSURV')
	group by type,question
    order by type,question asc
	)Q4 ON Q1.type=Q4.type and Q1.question=Q4.question
) ";



$result = $conn->query($QUERY);

$json = array();

while($row = $result->fetch_assoc()) {

$item = array(
      'type' => $row['type'],
      'question' => $row['question'],
      'global_avg_response' => $row['global_avg_response'],
      'dept_avg_response' => $row['dept_avg_response'],
      'selected_avg_response' => $row['selected_avg_response']
  );
  array_push($json, $item);
}
$jsonstring = json_encode($json);
echo $jsonstring;
$conn->close();
?>
