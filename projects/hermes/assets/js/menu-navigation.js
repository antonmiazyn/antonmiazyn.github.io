let toggleButton = document.querySelector(".toggle");
let menuBlock = document.querySelector(".main-navigation");

toggleButton.onclick = () => {
  if(!menuBlock.classList.contains("shown")) {
    menuBlock.classList.add("shown");
  } else {
    menuBlock.classList.remove("shown");
  }
}
