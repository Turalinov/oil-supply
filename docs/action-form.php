<?php
    $post = json_decode(file_get_contents('php://input'), true);

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;



    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    //Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    if(isset($post['messageObj'])) {

        $data = $post['messageObj'];

        $message = '';
        $subject = 'Message from the site';

          foreach ($data as $key => $value) {

            if ($key == "formtype") {

              if( $value == "reco" ) {
                $subject = "Convaincre mon RH/CSE";
              } else if ($value == "demo" ) {
                $subject = "Demandez une démo";

              } else {
                $subject = "Souscrire le contrat";


              }


              continue;
            }

            if($key == "username") {
              $key = "Name";
            } else if ($key == "email") {
              $key = "Email";
            }else if ($key == "message") {
              $key = "Message";
            }
              $message .=  $key . ": " . $value ."<br>";
          }

          try {
              $mail->isSMTP();
              $mail->Host = "smtp.gmail.com";
              $mail->SMTPAuth  = true;
              $mail->Username =  'testproject9494@gmail.com';
              $mail->Password = 'YPyeg4RI1ay#';
              $mail->SMTPSecure = PHPMailer :: ENCRYPTION_SMTPS ;
              $mail->Port = 465;
              $mail->CharSet = 'UTF-8';

              $mail->isHTML(true);
              $mail->setFrom('testproject9494@gmail.com', 'OILSupply');
              $mail->addAddress('rusltur_24@mail.ru'); //contact@phare360.com
              $mail->Subject = $subject;
              $mail->Body = $message;

              $mail->isHTML(true);
              $mail->send();

              echo json_encode(array('status' => true));  exit();
            } catch (Exception $e) {

              echo json_encode(array('status' => false, 'error' => $mail->ErrorInfo));  exit();
            }


          }
?>
