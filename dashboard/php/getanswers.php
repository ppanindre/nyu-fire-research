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
select Q1.type, Q1.question, Q1.answer, correct_answer, global_count, department_count, selected_count
from(
(
    Select type, question, answer, count(answer) as global_count
    from quiz q, login l
    where l.training_completed=1
    and l.session_id=q.session_id
    and l.module_id=$module_id
    and type in ('PRETEST','POSTTEST')
    group by type, question, answer
) Q1

left outer join

(
    Select type, question, answer, count(answer) as department_count
    from quiz q, login l
    where l.department='FDNY'
    and l.training_completed=1
    and l.session_id=q.session_id
    and l.module_id=$module_id
    and type in ('PRETEST','POSTTEST')
    group by type, question, answer
) Q2 on Q1.type=Q2.type and Q1.question=Q2.question and Q1.answer=Q2.answer

left outer join

(
    Select type, question, answer, count(answer) as selected_count
    from quiz q, login l
    where l.department='FDNY'
    and l.training_completed=1
    and l.session_id=q.session_id
    and l.module_id=$module_id
    and l.session_id in ($session_id)
    and type in ('PRETEST','POSTTEST')
    group by type, question, answer
) Q3 on Q1.type=Q3.type and Q1.question=Q3.question and Q1.answer=Q3.answer

)
left outer join
(
select type,question,answer as correct_answer from answers
) Q4 on Q1.type=Q4.type and Q1.question=Q4.question
";



$result = $conn->query($QUERY);

    $json = array();

    while($row = $result->fetch_assoc()) {

    $item = array(
          'type' => $row['type'],
          'question' => $row['question'],
          'answer' => $row['answer'],
          'correct_answer' => $row['correct_answer'],
          'global_count' => $row['global_count'],
          'department_count' => $row['department_count'],
          'department_count' => $row['department_count'],
          'selected_count' => $row['selected_count']
      );
      array_push($json, $item);
    }
    $jsonstring = json_encode($json);
    echo $jsonstring;

$conn->close();
?>
