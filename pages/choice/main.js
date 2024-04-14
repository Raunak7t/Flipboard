const container = document.querySelector(".load_image");
const message = document.querySelector(".msg");
const morebtn = document.querySelector("button");

morebtn.addEventListener("click", function () {
  container.style.display = "block";
  morebtn.style.display = "none";
  message.innerHTML = "More to Exploer";
  message.style.color = "white";
  message.style.fontSize = "30px";
});

let choises = [];
const boxes = document.querySelectorAll(".box");

boxes.forEach(function (box) {
  box.addEventListener("click", function () {
    if (choises.length < 3) {
      box.classList.add("selected");
      let choice = box.id;
      choises.push(choice);

      if (choises.length === 3) {
        activateButton();
      }
    }
  });
});

const print_msg = document.querySelector(".msg1");
function activateButton() {
  const button = document.getElementById("activateButton");
  button.disabled = false;
  button.style.backgroundColor = "blue";
}

function submitAndChangeColor() {
  if (choises.length === 3) {
    window.location.href = "../../pages/home/";
  } else {
    // alert("plz enter your choice")
    print_msg.innerHTML = "plz Select the choice";
    print_msg.style.color = "white";
    print_msg.style.opacity = 1;
    print_msg.style.fontSize = "30px";

    setTimeout(function () {
      print_msg.style.opacity = "0";
      console.log("hi");
    }, 4000);
  }
}
