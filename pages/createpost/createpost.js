let postvalue = document.getElementById("textarea");
let category = document.getElementById("category");
var progressDiv = document.getElementById("progressdiv");
var progressbar = document.getElementById("progressbar");
let currentuser = "";
let url = "";
let fileType = "";
var done = document.getElementById("done");
let uid;
let alluser = [];
let userimg = document.getElementById("userimg");
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     if (user.emailVerified) {
//       uid = user.uid;
//       // console.log("Email is verified!");
//     } else {
//       window.location.assign("../../index.html");
//     }
//   } else {
//     window.location.assign("./login.html");
//   }
// });

firebase.auth().onAuthStateChanged((user) => {
  currentuser = user;
});
let uploadimg = (event) => {
  fileType = event.target.files[0].type;
  var uploadfile = firebase
    .storage()
    .ref()
    .child(`postFiles/${event.target.files[0].name}`)
    .put(event.target.files[0]);
  uploadfile.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var uploadpercentage = Math.round(progress);
      console.log(uploadpercentage);
      progressDiv.style.display = "block";
      progressbar.style.width = `${uploadpercentage}%`;
      progressbar.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {},
    () => {
      uploadfile.snapshot.ref.getDownloadURL().then((downloadURL) => {
        url = downloadURL;
        done.style.display = "block";
        progressDiv.style.display = "none";
      });
    }
  );
};
var d = new Date().toLocaleDateString();

function createpost() {
  if (postvalue.value !== "" || url !== "") {
    firebase
      .firestore()
      .collection("posts")
      .add({
        postvalue: postvalue.value,
        category: category.value,
        uid: currentuser.uid,
        url: url,
        filetype: fileType,
        like: [],
        dislikes: [],
        comments: [],
        Date: `${d}`,
      })
      .then((res) => {
        firebase
          .firestore()
          .collection("posts/")
          .doc(res.id)
          .update({
            id: res.id,
          })
          .then(() => {
            done.style.display = "none";
            document.getElementById("uploadedmssage").style.display = "block";
            setTimeout(() => {
              location.reload();
            }, 2000);
          });
      });
  }
}

// const logout = ()=>{
//   firebase.auth().signOut().then(() => {
//     window.location.assign("./login.js")
//   })
// }
