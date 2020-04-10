let menuShow = document.querySelectorAll(".menu__show");
let menuHide = document.querySelector(".menu__hide");
let menu = document.querySelector(".menu");

for(let i = 0; i < menuShow.length; i++) {
  menuShow[i].onclick = () => {
    menu.style.left = 0;
    menuHide.classList.remove("hidden");
    document.body.style.overflowY = "hidden";
  }
}

menuHide.onclick = () => {
  menu.style.left = "-100%";
  menuHide.classList.add("hidden");
  document.body.style.overflowY = "scroll";
}
