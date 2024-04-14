/*const btn = document.getElementById('toogle-mode');

btn.addEventListener('change', () => {
    document.body.classList.toggle('dark')
});*/

const toogle_inp = document.querySelector(".toggle-password");
const input = document.querySelector("#s-password");
const pass_on = document.querySelector(".toggle-password .on");
const pass_off = document.querySelector(".toggle-password .off");

toogle_inp.addEventListener("click", function (e) {
  e.preventDefault();
  if (input.type === "password") {
    input.type = "text";
    input.focus();
    pass_on.classList.remove("hide");
    pass_off.classList.add("hide");
  } else {
    input.type = "password";
    input.focus();
    pass_on.classList.add("hide");
    pass_off.classList.remove("hide");
  }
});

const toggle_inp = document.querySelector(".toogle-password");
const inputt = document.querySelector("#password");
const passon = document.querySelector(".toogle-password .on");
const passoff = document.querySelector(".toogle-password .off");

toggle_inp.addEventListener("click", function (a) {
  a.preventDefault();
  if (inputt.type === "password") {
    inputt.type = "text";
    inputt.focus();
    passon.classList.remove("hide");
    passoff.classList.add("hide");
  } else {
    inputt.type = "password";
    inputt.focus();
    passon.classList.add("hide");
    passoff.classList.remove("hide");
  }
});

let showloginbtns = document.querySelectorAll(".show-login");
showloginbtns.forEach((showlogin) => {
  showlogin.addEventListener("click", function () {
    document.querySelector(".signup-form").classList.remove("active");
    document.querySelector(".login-form").classList.add("active");
  });
});

document.querySelector("#show-signup").addEventListener("click", function () {
  document.querySelector(".login-form").classList.remove("active");
  document.querySelector(".signup-form").classList.add("active");
});

let closebtns = document.querySelectorAll(".closebtn");
closebtns.forEach((cbtn) => {
  cbtn.addEventListener("click", function () {
    document.querySelector(".form.active").classList.remove("active");
  });
});

setTimeout(() => {
  document.querySelector(".login-form").classList.add("active");
}, 6000);
