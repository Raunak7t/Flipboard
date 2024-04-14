const back = () => {
  window.location.assign("../../index.html");
};

let email = document.getElementById("email");
let message = document.getElementById("message");

const reset = () => {
  if (email.value === "") {
    message.innerHTML = "Email address is required";
    message.style.color = "red";
    email.focus();
  }
  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(() => {
      alert("Reset Link has been send on your email");
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.style.color = "red";
    });
};
