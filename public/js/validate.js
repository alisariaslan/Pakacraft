function validateForm() {

  let username = document.forms["myForm"]["username"].value;
  let mail = document.forms["myForm"]["email"].value;

  if (username < 3) {
    alert("Kullanıcı adınız en az 4 karakter olmalı ve en az bir harf içermeli");
    return false;
  } else if (username > 20) {
    alert("Kullanıcı adınız en fazla 20 karakter olmalı ve en az bir harf içermeli");
    return false;
  } else if (mail < 3) {
    alert("Email adresiniz en az 4 karakter olmalı ve en az harf içermeli");
    return false;
  } else if (mail > 40) {
    alert("Email adresiniz en fazla 40 karakter olmalı ve en az bir harf içermeli");
    return false;
  } else if (document.getElementById("cpatchaTextBox").value != code) {
    alert("Captcha doğrulanamadı. Lütfen tekrar deneyin.");
    createCaptcha();
    return false;
  } 
}