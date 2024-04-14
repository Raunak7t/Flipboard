const imageWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");

const apiKey = "XGeIHmbe6rFFEEgrwHKWkImnzTVuzqrABIvd931Cv74B15wb1MzWO2S6";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgURL) => {
  fetch(imgURL)
    .then((res) => res.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("failed to download image!"));
};

const generateHTML = (images) => {
  imageWrapper.innerHTML += images
    .map(
      (img) =>
        `<li class="card">
        <img src="${img.src.large2x}">
        <div class="details">
        <div class="photography">
            <i class="fa fa-camera"></i>
            <span>${img.photographer}</span>
        </div>
            <button onclick="downloadImg('${img.src.large2x}')">
            <i class="fa fa-download"></i>
            </button>
        </div>
    </li>`
    )
    .join("");
};
const getImages = (apiURL) => {
  loadMoreBtn.innerText = "Loading...";
  loadMoreBtn.classList.add("disabled");
  fetch(apiURL, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      generateHTML(data.photos);
      loadMoreBtn.innerText = "Load More";
      loadMoreBtn.classList.remove("disabled");
    })
    .catch(() => alert("Failed to load images!"));
};

const loadMoreImages = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`;
  apiURL = searchTerm
    ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}per_page=${perPage}`
    : apiURL;
  getImages(apiURL);
};

const loadSearchImages = (e) => {
  if (e.target.value === "") return (searchTerm = null);
  //if pressed key is enter update the current page, search term and call the getImages
  if (e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imageWrapper.innerHTML = "";
    getImages(
      `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}per_page=${perPage}`
    );
  }
};
getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`
);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);

// firebase.auth().signOut().then(() => {
//     window.location.assign("./login.js")
//   })
