let imgData = [
  {
    url: "https://media.istockphoto.com/id/1388392291/photo/different-types-of-the-cosmetic-containers-made-from-natural-wood-collagen-cream-seru-tonic.jpg?s=612x612&w=0&k=20&c=DBNxMT6oFo5hZ0Byy3mjGKa_WmSEBUQfLQT12FYomUM=",
    category: "beauty",
  },
  {
    url: "https://media.istockphoto.com/id/1080910832/photo/young-stylish-businessman-having-takeaway-coffee.jpg?s=1024x1024&w=is&k=20&c=fbpHqEQpfGf746d73OFCZ1P3gSXt-66DOjd0Pc30_os=",
    category: "fashion",
  },
  {
    url: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyZXNzZXN8ZW58MHx8MHx8fDA%3D",
    category: "YOUR_CATEGORY",
  },
  {
    url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhdXR5fGVufDB8fDB8fHww",
    category: "YOUR_CATEGORY",
  },
  {
    url: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRyZXNzZXN8ZW58MHx8MHx8fDA%3D",
    category: "YOUR_CATEGORY",
  },
  {
    url: "https://media.istockphoto.com/id/1356239984/photo/beautiful-woman-among-christmas-atmosphere.jpg?s=612x612&w=0&k=20&c=eC0-NpGfzT11bgiZnHwFwD2trFZBF7z4NYxHra0Fy9A=",
    category: "YOUR_CATEGORY",
  },
  {
    url: "https://media.istockphoto.com/id/1438967481/photo/woman-sitting-among-christmas-atmosphere.jpg?s=612x612&w=0&k=20&c=-k8t9aO6RHaX9gUvrHAbMV4Zvc478kkYwiPTPzL8UMs=",
    category: "YOUR_CATEGORY",
  },
  {
    url: "https://media.istockphoto.com/id/1340470349/photo/beautiful-traditional-indian-bride-getting-ready-for-her-wedding-day-the-makeup-front-of-a.jpg?s=612x612&w=0&k=20&c=Fzy2TTIKXPT9KYswNWxc0GMdly6CexMLSxDmkTfPivQ=",
    category: "YOUR_CATEGORY",
  },
];

const pin_container = document.querySelector(".pin_container");

const imageType = ["card_small", "card_medium", "card_large"];

function random(max) {
  return Math.floor(Math.random() * max);
}

imgData.forEach((data) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("card", imageType[random(3)]);
  wrapper.setAttribute("ondblclick", `redirect("${data.category}")`);
  //   wrapper.setAttribute("ondblclick", `redirect("car")`);
  console.log(wrapper);
  wrapper.innerHTML = `
                    <img src="${data.url}" alt="image">
                    <button class="hide">Save</button>
                    <div class="iconn">
                        <i class="ri-arrow-down-circle-fill icon-2"></i>
                        <button onclick="share('${data.url}')"><i class="ri-more-fill icon-2"></i></button>
                    </div>
                    `;
  pin_container.append(wrapper);
});

function redirect(category) {
  localStorage.setItem("CATEGORY", category);
  window.location.href = "result1.html";
}

function share(urlString) {
  if (navigator.share) {
    navigator.share({
      title: "Demo",
      text: "Check this channel",
      url: urlString,
    });
  }
}
