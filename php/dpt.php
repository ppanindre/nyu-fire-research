<?php
$config = include('../../config.php');
$servername = $config['host'];
$username = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];
try{
    $link = new \PDO(   'mysql:host=fire.engineering.nyu.edu;dbname=Alive;charset=utf8mb4',
                        $username,
                        $password,
                        array(
                            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                            \PDO::ATTR_PERSISTENT => false
                        )
                    );
    $handle = $link->prepare("select * from department WHERE departmentName != '' AND departmentName IS NOT NULL ORDER BY departmentName");
    $handle->execute();
    $result = $handle->fetchAll(\PDO::FETCH_OBJ);
	echo json_encode($result);
}
catch(\PDOException $ex){
    print($ex->getMessage());
}
?>
