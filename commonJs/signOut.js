function logout() {
  firebase.auth().signOut();
}
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.href = "/index.html";
  }
});