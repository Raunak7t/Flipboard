let rName = document.getElementById("right-name");
let userprofileimg = document.getElementById("userprofileimg");
let usercoverimg = document.getElementById("usercoverimg");
let progressbar1 = document.getElementById("progressbar");
let progressbardiv = document.getElementById("progressbardiv");
let firstName = document.getElementById("firstname");
let mobilenumber = document.getElementById("mobileno");
let email = document.getElementById("emailaddress");
let description = document.getElementById("userdescription");
let uid; // Declare uid variable outside the onAuthStateChanged callback
let followers = document.getElementById("followers");
let following = document.getElementById("following");
const urlParams = new URLSearchParams(window.location.search);
let urlUid = urlParams.get("uid");


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = urlUid ? urlUid : user.uid;;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((result) => {
        fileType = result.data().filetype;
        userprofileimg.src = result.data().ProfilePicture;
        usercoverimg.src = result.data().CoverPicture;
        rName.innerText = result.data().FirstName;
        firstName.value = result.data().FirstName;
        mobilenumber.value = result.data().mobileNumber;
        email.value = result.data().Email;
        email.disabled = true;
        description.value = result.data().Description;
        followers.innerHTML = "Followers - " + result.data().followers.length;
        following.innerHTML = "Following - " + result.data().following.length;
        showPosts();
      });
  }
});

// changecoverpicture
function changecoverpicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${uid}/coverpicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressbardiv.style.visibility = "visible";
      var uploadpercentage = Math.round(progress);
      progressbar1.style.width = `${uploadpercentage}%`;
      progressbar1.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((coverpicture) => {
        progressbardiv.style.visibility = "hidden";
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ CoverPicture: coverpicture });
      });
    }
  );
}

// changeprofilepicture
function changeprofilepicture(event) {
  var uploadTask = firebase
    .storage()
    .ref()
    .child(`users/${uid}/profilepicture`)
    .put(event.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressbardiv.style.visibility = "visible";
      var uploadpercentage = Math.round(progress);
      progressbar1.style.width = `${uploadpercentage}%`;
      progressbar1.innerHTML = `${uploadpercentage}%`;
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((profileimage) => {
        progressbardiv.style.visibility = "hidden";
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ ProfilePicture: profileimage });
      });
    }
  );
}

// update button
let update = () => {
  if (firstName.value === "") {
    message.innerHTML = "First Name Required";
    message.style.color = "red";
    firstName.focus();
  } else if (mobilenumber.value === "") {
    message.innerHTML = "Mobile Number Required";
    message.style.color = "red";
    mobilenumber.focus();
  } else {
    var data = {
      firstName: firstName.value,
      mobileNumber: mobilenumber.value,
      Description: description.value,
    };
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update(data)
      .then((res) => {
        console.log(res);
        message.innerHTML = "Successfully Updated";
        message.style.color = "green";
        setTimeout(() => {
          message.innerHTML = "";
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

