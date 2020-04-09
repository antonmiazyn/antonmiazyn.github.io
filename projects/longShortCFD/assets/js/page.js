  let section = document.querySelectorAll(".main-page-section");
  let prew = document.querySelectorAll(".menu__switcher_arrow_top");
  let next = document.querySelectorAll(".btn__circle");

  section.forEach((item, i) => {
    item.classList.add("hidden");
  });

  section[0].classList.remove("hidden");

  for(let i = 0; i < section.length; i++) {
    next[i].onclick = () => {
      section.forEach((item, i) => {
        item.classList.add("hidden");
      });
      section[i+1].classList.remove("hidden");
    }
    prew[i].onclick = () => {
      section.forEach((item, i) => {
        item.classList.add("hidden");
      });
      section[i].classList.remove("hidden");
    }
  }
