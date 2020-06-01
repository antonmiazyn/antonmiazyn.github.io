let bars = document.querySelector(".menu-bars");
let times = document.querySelector(".menu-times");

let menu = document.querySelector(".menu");

bars.onclick = () => {
  menu.style.display = "block";
  menu.classList.add("menu-animation");
  document.body.style.overflowY = "hidden";
}

times.onclick = () => {
  menu.style.display = "none";
  menu.classList.remove("menu-animation");
  document.body.style.overflowY = "scroll";
}

let link = document.querySelectorAll(".menu-link");

for(let i = 0; i < link.length; i++) {
  link[i].onclick = () => {
    menu.style.display = "none";
    menu.classList.remove("menu-animation");
    document.body.style.overflowY = "scroll";
  }
}

/*==================*/

let dest1 = document.querySelectorAll(".our-target");
let dest2 = document.querySelectorAll(".our-services");
let dest3 = document.querySelector(".platform-review");
let dest4 = document.querySelectorAll(".features-container")[0];
let dest5 = document.querySelectorAll(".features-container")[1];
let dest4_1 = document.querySelector(".mobile-regulation");
let dest5_1 = document.querySelector(".mobile_security");
let dest6 = document.querySelector(".contact");

if(window.innerWidth > 768) {
  dest1[0].id = "sec1";
  dest2[0].id = "sec2";
  dest3.id = "sec3";
  dest4.id = "sec4";
  dest5.id = "sec5";
  dest6.id = "sec6";
} else {
  dest1[1].id = "sec1";
  dest2[1].id = "sec2";
  dest3.id = "sec3";
  dest4_1.id = "sec4";
  dest5_1.id = "sec5";
  dest6.id = "sec6";
}
