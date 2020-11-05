let toggleButton = document.querySelector(".toggle");
let menuBlock = document.querySelector(".main-navigation");
let timesButton = menuBlock.querySelector(".times");

toggleButton.onclick = () => {
  menuBlock.classList.add("shown");
}

timesButton.onclick = () => {
  menuBlock.classList.remove("shown");
}
