const btn = document.querySelector("#toogle-mode");

if (!localStorage.getItem("lightTheme")) {
  localStorage.setItem("lightTheme", false);
}

btn.addEventListener("click", function () {
  let lightTheme = JSON.parse(localStorage.getItem("lightTheme"));
  btn.checked = lightTheme;
  console.log(lightTheme, btn.checked);
  if (lightTheme) {
    document.body.classList.remove("light");
    localStorage.setItem("lightTheme", false);
  } else {
    document.body.classList.add("light");
    localStorage.setItem("lightTheme", true);
  }
});

function checkLightMode() {
  if (localStorage.getItem("lightTheme") == "true") {
    document.body.classList.add("light");
  }
}
checkLightMode();



const settingsMenu = document.querySelector(".setting-menu");

function settingsMenuToggle() {
  settingsMenu.classList.toggle("settings-menu-height");
}