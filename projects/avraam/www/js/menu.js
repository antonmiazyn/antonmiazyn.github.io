let bars = document.querySelector(".header__bars");
let mobileMenu = document.querySelector(".header__mobile-menu");

bars.onclick = () => {
  if(getComputedStyle(mobileMenu).right == "-1140px") {
    mobileMenu.style.right = 0;
    bars.classList.add("bars__to__times");
    document.body.style.overflowY = "hidden";
  } else {
    mobileMenu.style.right = "-1140px";
    bars.classList.remove("bars__to__times");
    document.body.style.overflowY = "scroll";
  }
}
