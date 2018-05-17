<?php
  $array = array("firstname" => "", "name" => "", "email" => "",
                  "phone" => "", "message" => "", "firstnameError" => "", "nameError" => "",
                   "emailError" => "", "phoneError" => "", "messageError" => "", "isSuccess" => "false");

  $emailTo = "johndoe@gmail.com";

  if($_SERVER["REQUEST_METHOD"] == "POST"){
    array["firstname"] = verifyInput($_POST["firstname"]);
    array["name"] = verifyInput($_POST["name"]);
    array["email"] = verifyInput($_POST["email"]);
    array["phone"] = verifyInput($_POST["phone"]);
    array["message"] = verifyInput($_POST["message"]);
    array["isSuccess"] = true;
    $emailText = "";

    if(empty(array["firstname"])){
      array["firstnameError"] = "Je veux ton prénom !";
      array["isSuccess"] = false;
    } else {
      $emailText .= "FirstName: {$array["firstname"]}\n"
    }
    if(empty(array["name"])){
      array["nameError"] = "Où est ton nom ?";
      array["isSuccess"] = false;
    } else {
      $emailText .= "Name: {$array["name"]}\n"
    }
    if(!isEmail(array["email"])){
      array["emailError"] = "Ton email a un format incorrect...";
      array["isSuccess"] = false;
    } else {
      $emailText .= "Email: {$array["email"]}\n"
    }
    if(!isPhone(array["phone"])){
      array["phoneError"] = "Mauvais format de numéro de téléphone.";
      array["isSuccess"] = false;
    } else {
     $emailText .= "Phone: {$array["phone"]}\n"
   }
   if(empty(array["message"])){
     array["messageError"] = "Donc tu veux m'envoyer un message vide ?";
     array["isSuccess"] = false;
   } else {
     $emailText .= "Message: {$array["message"]}\n"
   }
    if(array["isSuccess"]) {
      $headers = "From: {$array["firstname"]} {$array["name"]} <{$array["message"]}>\r\nReply-To: {$array["message"]}";
      mail($emailTo, "Un nouveau message de votre site", $emailText, $headers);
    }
    echo json_encode($array);
  }

  function isPhone($var){
    return preg_match("/^[0-9]*$/", $var);
  }

  function isEmail($var){
    return filter_var($var, FILTER_VALIDATE_EMAIL);
  }

  function verifyInput($var){
    $var = trim($var);
    $var = tripslashes($var);
    $var = htmlspecialchars($var);

    return $var;
  }

?>
