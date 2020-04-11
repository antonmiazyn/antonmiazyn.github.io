let loginForm = document.querySelector(".login");
let loginButton = document.querySelectorAll(".header-login");

let modalHide = document.querySelectorAll(".modal-times");

for(let i = 0; i < loginButton.length; i++) {
  loginButton[i].onclick = () => {
    loginForm.classList.remove("hidden");
    document.body.style.overflowY = "hidden";
  }
}

modalHide[0].onclick = () => {
  loginForm.classList.add("hidden");
  document.body.style.overflowY = "scroll";
}

let accountForm = document.querySelector(".account");
let accountButton = document.querySelectorAll(".header-account");

for(let i = 0; i < accountButton.length; i++) {
  accountButton[i].onclick = () => {
    accountForm.classList.remove("hidden");
    document.body.style.overflowY = "hidden";
  }
}

modalHide[1].onclick = () => {
  accountForm.classList.add("hidden");
  document.body.style.overflowY = "scroll";
}

/*=========================*/

let modalFormNext = document.querySelector(".modal__account-form-next");
let modalFormPrev = document.querySelector(".modal__account-form-prev");
let modalFormStart = document.querySelector("#modal-form-start");
let modalFormEnd = document.querySelector("#modal-form-end");

modalFormNext.onclick = () => {
  modalFormStart.classList.add("hidden");
  modalFormEnd.classList.remove("hidden");
}

modalFormPrev.onclick = () => {
  modalFormStart.classList.remove("hidden");
  modalFormEnd.classList.add("hidden");
}
