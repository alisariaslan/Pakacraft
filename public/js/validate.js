function validateForm() {
  let username = document.forms["myForm"]["username"].value;
  let captchaInput = document.getElementById("cpatchaTextBox").value;

  if (username.length < 1 || username == null || username == "") {
    alert("Your username must be valid");
    return false;
  }
  else if (captchaInput !== code) {
    alert("Captcha is not correct. Please try again.");
    createCaptcha(); // Assuming you have a function to recreate the captcha
    return false;
  }

  // If all validations pass, you can proceed with form submission
  return true;
}