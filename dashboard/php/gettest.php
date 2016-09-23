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
Select Q1.type,Q1.question, global, department,selected
FROM (
    (

        select a1.ty as type, a1.ques as question, round(correct/total*100)  as global
        from
        (select q.type as ty, q.question as ques, count(*) as total
        from quiz q,login l
        where l.training_completed=1 and q.session_id=l.session_id
        and l.module_id=$module_id
        and q.type IN ('PRETEST','POSTTEST')
        group by q.type, q.question asc
        ) a1
        left outer join
        (
            select q.type as ty , q.question as ques, count(*) as correct
            from quiz q, login l, answers a
            where l.training_completed=1
            and q.session_id=l.session_id
            and l.module_id=$module_id
            and q.type=a.type
            and q.question = a.question
            and q.answer = a.answer
            group by q.type, q.question asc
        ) a2
        on a1.ty=a2.ty and a1.ques=a2.ques

    )Q1
    left outer join
    (


        select a1.ty as type, a1.ques as question, round(correct/total*100) as department
        from
        (select q.type as ty, q.question as ques, count(*) as total
        from quiz q,login l
        where l.training_completed=1 and q.session_id=l.session_id
        and l.module_id=$module_id
        and department='FDNY'
        and q.type IN ('PRETEST','POSTTEST')
        group by q.type, q.question asc
        ) a1
        left outer join
        (
            select q.type as ty , q.question as ques, count(*) as correct
            from quiz q, login l, answers a
            where l.training_completed=1
            and department='FDNY'
            and q.session_id=l.session_id
            and l.module_id=$module_id
            and q.type=a.type
            and q.question = a.question
            and q.answer = a.answer
            group by q.type, q.question asc
        ) a2
        on a1.ty=a2.ty and a1.ques=a2.ques


    )Q2 on Q1.type=Q2.type and Q1.question=Q2.question
    left outer join
    (

     select a1.ty as type, a1.ques as question, round(correct/total*100) as selected
        from
        (select q.type as ty, q.question as ques, count(*) as total
        from quiz q,login l
        where l.training_completed=1 and q.session_id=l.session_id
        and l.module_id=$module_id
        and department='FDNY'
        and l.session_id IN ($session_id)
        and q.type IN ('PRETEST','POSTTEST')
        group by q.type, q.question asc
        ) a1
        left outer join
        (
            select q.type as ty , q.question as ques, count(*) as correct
            from quiz q, login l, answers a
            where l.training_completed=1
            and department='FDNY'
            and l.session_id IN ($session_id)
            and q.session_id=l.session_id
            and l.module_id=$module_id
            and q.type=a.type
            and q.question = a.question
            and q.answer = a.answer
            group by q.type, q.question asc
        ) a2
        on a1.ty=a2.ty and a1.ques=a2.ques

    )Q4 ON Q1.type=Q4.type and Q1.question=Q4.question
)
";



$result = $conn->query($QUERY);

$json = array();

while($row = $result->fetch_assoc()) {

$item = array(
      'type' => $row['type'],
      'question' => $row['question'],
      'global' => $row['global'],
      'department' => $row['department'],
      'selected' => $row['selected']
  );
  array_push($json, $item);
}
$jsonstring = json_encode($json);
echo $jsonstring;


$conn->close();
?>
