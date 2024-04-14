const FirstName = document.getElementById("name");
const Email = document.getElementById("E-email");
const Password = document.getElementById("password");
const Message = document.getElementById("message");
var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

const signup = () => {
  if (FirstName.value === "") {
    Message.innerHTML = "First Name is required";
    Message.style.color = "red";
  } else if (Email.value === "") {
    Message.innerHTML = "Email Address Required!";
    Message.style.color = "red";
  } else if (!Email.value.match(regex)) {
    Message.innerHTML = "Please Enter Correct Email Address";
    Message.style.color = "red";
  } else if (Password.value === "") {
    Message.innerHTML = "Password Required";
    Message.style.color = "red";
  } else if (Password.value.length < 6) {
    Message.innerHTML = "Please Enter at least 6 digit Password";
    Message.style.color = "red";
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(Email.value, Password.value)
      .then((userCredential) => {
        var d = new Date().toLocaleDateString();
        const userData = {
          FirstName: FirstName.value,
          Email: Email.value,
          uid: userCredential.user.uid,
          ProfilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGU75F10hHYzumh3r2HkDve9wTh2GLZ57ENYSMl4G5SC3lKc_3ZuZmnzC-RfYJoxThvMA&usqp=CAU",
          CoverPicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtdtOhEhiJcmRb9v40mZ7mFbJC_HoeBM4v0w&s",
          Description: "",
          Signupdate: `${d}`,
          followers: [],
          following: [],
          messages : [],
        };
        firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .set(userData)
          .then((res) => {
            Message.innerHTML = "Account was Successfully Created";
            Message.style.color = "green";
            window.location = "./pages/choice/";
          });
      })
      
};
}