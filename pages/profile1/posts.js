// console.log("hello");
const postsDiv = document.querySelector(".pin_container");

function showPosts() {
  firebase
    .firestore()
    .collection("posts")
    .where("uid", "==", uid)
    .get()
    .then((posts) => {
      if (posts.docs.length > 0) {
        postsDiv.innerHTML = "";
        posts.forEach((post) => {
          getPostCreater(post.data());
        });
      }
    });

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
          <div class ="del">
            <i class="ri-delete-bin-line"></i>
          </div>
        </div>
      `;

    postsDiv.appendChild(postCard);
  }
}

function expandPost(id) {
  window.location = "../viewPost/index.html?id=" + id;
}
