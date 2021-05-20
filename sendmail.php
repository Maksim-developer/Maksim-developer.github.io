<?php
    ///подключение файлов из папки mailer///
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    ///Объявления плагина///
    $mail = new PHPMailer(true);
    ///Настройка кодироки///
    $mail->CharSet = 'UTF-8';
    ///Подключение языкового файла///
    $mail->setLanguage('ru', 'phpmailer/Language/');
    ///Включается возможность HTML тега в письме///
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setForm('info@fls.guru', 'От меня');
    //Кому отправить
    $mail->addAddress('maksimka3999@mail.ru');
    //Тема письма
    $mail->Subject = 'Тема письма';

    //Рука
    $hand = "Правая";
    if($_POST['hand'] == "left"){
        $hand = "Левая";
    }

    //Тело письма
    $body = '<h1>Встречайте супер письмо!</h1>';

    ///Проверка на пустоту поля///
    if (trim(!empty($_POST['name']))) {
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if (trim(!empty($_POST['email']))) {
        $body.='<p><strong>E-mail</strong> '.$_POST['email'].'</p>';
    }
    if (trim(!empty($_POST['hand']))) {
        $body.='<p><strong>Рука:</strong> '.$hand.'</p>';
    }
    if (trim(!empty($_POST['age']))) {
        $body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
    }

    if (trim(!empty($_POST['message']))) {
        $body.='<p><strong>Сообщение</strong> '.$_POST['message'].'</p>';
    }

    //Прикрепить файл
    if (!empty($_FILES['image']['tmp_name'])) {
        //Путь загрузки файла
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
        //Грузим файл
        if (copy($_FILES['image']['tmp_name'], $filePath)){
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении</strong></p>';
            $mail->addAttachment($fileAttach);
        }
    }

    $mail->Body = $body;

    ///Обработчик отправки и  отправка///
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);