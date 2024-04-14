var commentsDiv = document.querySelector(".comments-div");

function expandComments() {
  commentsDiv.classList.toggle("active");
}

const urlParams = new URLSearchParams(window.location.search);
let postID = urlParams.get("id");
let uid;
let postData;
let userData;

const postUserDp = document.querySelector(".right .top-bar img");
const postUserName = document.querySelector(".right .top-bar h4");
const postCategory = document.querySelector(".post .category");
const postImg = document.querySelector("#post-img");
const likeCount = document.querySelector(".like span");
const likeBtn = document.querySelector(".interact-bar .like");
const dislikeCount = document.querySelector(".dislike span");
const dislikeBtn = document.querySelector(".dislike");
const commentCount = document.querySelector("#comment-count");
const postTitle = document.querySelector(".post-title");
const commentInput = document.querySelector(".comment-input input");
const sendCommentBtn = document.querySelector(".comment-input .send");
const allComments = document.querySelector(".all-comments");
const showCategory = document.querySelector("#category-name");
const postsDiv = document.querySelector(".pin_container");

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     uid = user.uid;
//     firebase
//       .firestore()
//       .collection("posts")
//       .doc(postID)
//       .onSnapshot((data) => {
//         postData = data.data();
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(postData.uid)
//           .onSnapshot((data) => {
//             userData = data.data();
//             fillPostData(postData, userData);
//           });
//         showPosts(postData["category"]);
//       });
//   } else {
//     // window.location.assign("../index.html");
//   }
// });

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    firebase
      .firestore()
      .collection("posts")
      .doc(postID)
      .onSnapshot((data) => {
        postData = data.data();
        firebase
          .firestore()
          .collection("users")
          .doc(postData.uid)
          .onSnapshot((data) => {
            userData = data.data();
            fillPostData(postData, userData);
            if (postData["uid"] == uid) {
              let delBtn = document.querySelector(".left .delete");
              delBtn.style.display = "initial";
            
              delBtn.addEventListener("click", () => {
                console.log("hhi");
                firebase
                  .firestore()
                  .collection("posts")
                  .doc(postID)
                  .delete()
                  .then(() => {
                    window.history.back();
                  });
              });
            }
          });
        showPosts(postData["category"]);
      });
  } else {
    window.location.assign("../index.html");
  }
});

//share whole doc
//share
// function share() {
//   navigator.share({
//     url: window.location,
//   });
// }


function fillPostData(postData, userData) {
  postUserDp.src = userData["ProfilePicture"];
  postUserName.innerHTML = `${userData["FirstName"]}`;

  // postCategory.innerHTML = postData["category"];
  postImg.src = postData["url"];

  

  share = 
  ()=> {
    navigator.share({
      // url: window.location,
      url : postData["url"]
    //  url:"hello"
    });
  }

 
  document.querySelector(".download-link").href = postData["url"];

  likeCount.innerText = postData["like"].length;

  for (let likeIndex = 0; likeIndex < postData["like"].length; likeIndex++) {
    if (postData["like"][likeIndex] === uid) {
      likeBtn.classList.add("true");
    }
  }

  likeBtn.addEventListener("click", () => {
    let like = false;
    for (let likeIndex = 0; likeIndex < postData["like"].length; likeIndex++) {
      if (postData["like"][likeIndex] === uid) {
        like = true;
        postData["like"].splice(likeIndex, 1);
        likeBtn.classList.remove("true");
      }
    }
    if (!like) {
      postData["like"].push(uid);
    }
    firebase.firestore().collection("posts").doc(postID).update({
      like: postData["like"],
    });
  });

  dislikeCount.innerText = postData["dislikes"].length;

  for (
    let dislikesIndex = 0;
    dislikesIndex < postData["dislikes"].length;
    dislikesIndex++
  ) {
    if (postData["dislikes"][dislikesIndex] === uid) {
      dislikeBtn.classList.add("true");
    }
  }

  dislikeBtn.addEventListener("click", () => {
    let dislikes = false;
    for (
      let dislikesIndex = 0;
      dislikesIndex < postData["dislikes"].length;
      dislikesIndex++
    ) {
      if (postData["dislikes"][dislikesIndex] === uid) {
        dislikes = true;
        postData["dislikes"].splice(dislikesIndex, 1);
        dislikeBtn.classList.remove("true");
      }
    }
    if (!dislikes) {
      postData["dislikes"].push(uid);
    }
    firebase.firestore().collection("posts").doc(postID).update({
      dislikes: postData["dislikes"],
    });
  });

  commentCount.innerText = postData["comments"].length;

  postTitle.innerText = postData["postvalue"];

  fillComments(postData["comments"]);

  showCategory.innerHTML = postData["category"];
}

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
          userData = user.data();
          let commentCard = document.createElement("div");
          commentCard.classList.add("comment-card");
          commentCard.innerHTML = `
            <div class="user">
                  <img src="${userData["ProfilePicture"]}" alt="" />
                  <small>${userData["FirstName"]}</small>
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
      uid: uid,
    };
    postData["comments"].push(commentdata);
    firebase
      .firestore()
      .collection("posts")
      .doc(postID)
      .update({
        comments: postData["comments"],
      })
      .then(() => {
        commentInput.value = "";
      });
  }
});

function showPosts(query) {
  if (query) {
    firebase
      .firestore()
      .collection("posts")
      .where("category", "==", query)
      .get()
      .then((posts) => {
        if (posts.docs.length > 1) {
          postsDiv.innerHTML = "";
          posts.forEach((post) => {
            getPostCreater(post.data());
          });
        }
      });
  }

  function getPostCreater(postData) {
    firebase
      .firestore()
      .collection("users")
      .doc(postData.uid)
      .onSnapshot((user) => {
        addPostCard(user.data(), postData);
      });
  }

  function addPostCard(userData, postData) {
    const imageType = ["card_small", "card_medium", "card_large"];

    function random(max) {
      return Math.floor(Math.random() * max);
    }

    let postCard = document.createElement("div");
    postCard.classList.add("card", imageType[random(3)]);
    postCard.addEventListener("click", () => {
      expandPost(postData.id);
    });

    postCard.innerHTML = `
      <img
        src="${postData.url}"
        alt="image"
      />
      <div class="username">
        <img src="${userData.ProfilePicture}" alt="" />
        <p>${userData.FirstName}</p>
      </div>
      <div class="reactions">
        <div class="like">
          <i class="ri-thumb-up-fill icon-2"></i><span>${postData.like.length}</span>
        </div>
        <div class="dislike">
          <i class="ri-thumb-down-fill icon-2"></i><span>${postData.dislikes.length}</span>
        </div>
      </div>
    `;

    postsDiv.appendChild(postCard);
  }
}

function expandPost(id) {
  window.location = "../viewPost/index.html?id=" + id;
}
