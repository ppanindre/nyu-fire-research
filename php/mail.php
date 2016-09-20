

<?php
// The message

$email = $_POST["email"];
$message = $_POST["notes"];



// In case any of our lines are larger than 70 characters, we should use wordwrap()
$message = wordwrap($message, 70, "\r\n");
$headers = 'From: ALIVE@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();


// Send
mail($email, 'My Notes', $message, $headers);
?>

