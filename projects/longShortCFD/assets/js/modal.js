let loginForm = document.querySelector(".login");
let loginButton = document.querySelectorAll(".header-login");
let loginHide = document.querySelector(".login-hide");

for(let i = 0; i < loginButton.length; i++) {
  loginButton[i].onclick = () => {
    loginForm.classList.remove("hidden");
    document.body.style.overflowY = "hidden";
  }
}

loginHide.onclick = () => {
  loginForm.classList.add("hidden");
  document.body.style.overflowY = "scroll";
}
