
const headerDP = document.querySelector("#headerdp");
const MenuDP = document.querySelector("#menudp");
const MenuUsername = document.querySelector("#menuusername");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    updateNav(user.uid);
  } else {
    
  }
});

function updateNav(uid) {
  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .onSnapshot((data) => {
      headerDP.src = data.data()["ProfilePicture"];
      MenuDP.src = data.data()["ProfilePicture"];
      MenuUsername.innerHTML = `${data.data()["FirstName"]} `;
    });
}


