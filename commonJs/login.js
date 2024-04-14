const Emaile = document.getElementById("email");
const Spassword = document.getElementById("s-password");
const Messages = document.getElementById("messages");

const Log = () => {
  if (Emaile.value === "") {
    Messages.innerHTML = "Email address is required";
    Messages.style.color = "red";
  } else if (Spassword.value === "") {
    Messages.innerHTML = "Password is required";
    Messages.style.color = "red";
  } else {
    const userdata = {
      Emaile: Emaile.value,
      Spassword: Spassword.value,
    };
    firebase
      .auth()
      .signInWithEmailAndPassword(userdata.Emaile, userdata.Spassword)
      .then((userCredential) => {
        Messages.innerHTML = "Sign In Successful";
        Messages.style.color = "green";
        location.href = "./pages/home/index.html";
      })
      .catch((error) => {
        Messages.innerHTML = error.message;
      });
  }
};

const ForgetPassword = () => {
  window.location.assign("./pages/forgetPassword/");
};
