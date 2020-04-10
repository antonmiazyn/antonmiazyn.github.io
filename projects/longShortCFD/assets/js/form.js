let formNext = document.querySelector(".account-form-next");
let formPrev = document.querySelector(".account-form-prev");
let formStart = document.querySelector("#form-start");
let formEnd = document.querySelector("#form-end");

formNext.onclick = () => {
  formStart.classList.add("hidden");
  formEnd.classList.remove("hidden");
}

formPrev.onclick = () => {
  formStart.classList.remove("hidden");
  formEnd.classList.add("hidden");
}
