<?php

require '../../phpmailer/PHPMailerAutoload.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $subject = "Virus Kill Codes";
    $message = file_get_contents('../../templates/killcode-email.html'); // email content

    $mail = new PHPMailer;
    try {
        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = 'donot-reply@mysterymanila.com';
        $mail->Password = 'ypax tcgc cbru bliv';

        $mail->setFrom('donot-reply@mysterymanila.com', 'Mystery Manila');
        $mail->addAddress($email);

        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $message;

        if (!$mail->send()) {
            echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
        } else {
            echo json_encode(['success' => true]);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
?>