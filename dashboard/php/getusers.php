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

$QUERY = 'select last_login, q1.session_id, q1.email, pretest, posttest, module_id from
(Select L.last_login, L.module_id, email, Z.session_id, count(Z.session_id) as pretest, Z.type from login L, quiz Z,answers A
where L.session_id = Z.session_id and
training_completed=1 and
Z.module_id=A.module_id and
Z.type= "PRETEST" and
Z.type=A.type and
Z.question = A.question and
Z.answer=A.answer
group by Z.session_id) q1
left outer join(
Select  email, Z.session_id, count(Z.session_id) as posttest, Z.type from login L, quiz Z,answers A
where L.session_id = Z.session_id and
training_completed=1 and
Z.module_id=A.module_id and
Z.type= "POSTTEST" and
Z.type=A.type and
Z.question = A.question and
Z.answer=A.answer
group by Z.session_id) q2
on q1.session_id=q2.session_id';


$result = $conn->query($QUERY);

$json = array();
while($row = $result->fetch_assoc()) {

$item = array(
      'session_id' => $row['session_id'],
      'email' => $row['email'],
      'pretest' => $row['pretest'],
      'posttest' => $row['posttest'],
      'last_login' => $row['last_login'],
      'module_id' => $row['module_id']
  );
  array_push($json, $item);
}
$jsonstring = json_encode($json);
echo $jsonstring;


$conn->close();
?>
