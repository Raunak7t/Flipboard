var commentsDiv = document.querySelector(".comments-div");

const commentInput = document.querySelector(".comment-input input");
const sendCommentBtn = document.querySelector(".comment-input .send");
const allComments = document.querySelector(".all-comments");
let loginUid;
let userData;

function expandComments() {
  commentsDiv.classList.toggle("active");
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    loginUid = user.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((data) => {
        userData = data.data();
        fillComments(userData["messages"]);
      });
  } else {
    // window.location.assign("../index.html");
  }
});

function fillComments(commentarry) {
  if (commentarry.length !== 0) {
    allComments.innerHTML = "";
    for (
      let commentindex = 0;
      commentindex < commentarry.length;
      commentindex++
    ) {
      //user data
      firebase
        .firestore()
        .collection("users")
        .doc(commentarry[commentindex].uid)
        .get()
        .then((user) => {
          commentUserData = user.data();
          let commentCard = document.createElement("div");
          commentCard.classList.add("comment-card");
          commentCard.innerHTML = `
              <div class="user">
                    <img src="${commentUserData["ProfilePicture"]}" alt="" />
                    <small>${commentUserData["FirstName"]}</small>
                  </div>
                  <div class="text">${commentarry[commentindex]["commentText"]}</div>
            `;
          allComments.appendChild(commentCard);
        });
    }
  }
}

sendCommentBtn.addEventListener("click", () => {
  if (commentInput.value == "") {
    alert("Please write something...!");
  } else {
    let commentdata = {
      commentText: commentInput.value,
      uid: loginUid,
    };
    userData["messages"].push(commentdata);
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        messages: userData["messages"],
      })
      .then(() => {
        commentInput.value = "";
      });
  }
});
