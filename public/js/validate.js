function validateForm() {

  let username = document.forms["myForm"]["username"].value;
  let mail = document.forms["myForm"]["email"].value;

  if (username < 3) {
    alert("Your username must be at least 4 characters and contain at least one letter.");
    return false;
  } else if (username > 20) {
    alert("Your username must be a maximum of 20 characters and contain at least one letter.");
    return false;
  } else if (mail < 3) {
    alert("Your email address must be at least 4 characters and contain at least letters.");
    return false;
  } else if (mail > 40) {
    alert("Your email address must be a maximum of 40 characters and contain at least one letter.");
    return false;
  } else if (document.getElementById("cpatchaTextBox").value != code) {
    alert("Captcha is not correct. Please ty again.");
    createCaptcha();
    return false;
  } 
}