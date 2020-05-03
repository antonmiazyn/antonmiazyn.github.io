let bars = document.querySelector(".bars");
let times = document.querySelector(".times");
let menu = document.querySelector(".mobile__menu");

bars.onclick = () => {
  menu.style.display = "block";
  document.body.style.overflowY = "hidden";
}

times.onclick = () => {
  menu.style.display = "none";
  document.body.style.overflowY = "scroll";
}
