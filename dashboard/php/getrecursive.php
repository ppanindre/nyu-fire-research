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

$QUERY = "
SELECT Q1.question, ifnull(global_percentage,0) as global_percentage ,ifnull(department_percentage,0) as department_percentage,
ifnull(selected_percentage,0) as selected_percentage
from
(
    (
        SELECT question, count(*) as total_attempts, count(distinct(q.session_id)) as min_attempts,
        ROUND(count(distinct(q.session_id))/count(*)*100) as global_percentage
        FROM quiz q, login l
        where q.session_id = l.session_id
        and l.module_id = $module_id
        and type = 'RQ'
        and score <> 0
        group by question
    ) Q1
    left outer join
    (
        SELECT question, count(*) as total_attempts, count(distinct(q.session_id)) as min_attempts,
        ROUND(count(distinct(q.session_id))/count(*)*100) as department_percentage
        FROM quiz q, login l
        where q.session_id = l.session_id
        and l.module_id = $module_id
        and department='FDNY'
        and type = 'RQ'
        and score <> 0
        group by question
    ) Q2 on Q1.question=Q2.question
    left outer join
    (
        SELECT question, count(*) as total_attempts, count(distinct(q.session_id)) as min_attempts,
        ROUND(count(distinct(q.session_id))/count(*)*100) as selected_percentage
        FROM quiz q, login l
        where q.session_id = l.session_id
        and l.module_id = $module_id
        and department='FDNY'
        and l.session_id IN ($session_id)
        and type = 'RQ'
        and score <> 0
        group by question
    ) Q3 on Q1.question=Q3.question
)
";



$result = $conn->query($QUERY);

$json = array();

while($row = $result->fetch_assoc()) {

$item = array(
      'question' => $row['question'],
      'global_percentage' => $row['global_percentage'],
      'department_percentage' => $row['department_percentage'],
      'selected_percentage' => $row['selected_percentage']
  );
  array_push($json, $item);
}
$jsonstring = json_encode($json);
echo $jsonstring;


$conn->close();
?>
