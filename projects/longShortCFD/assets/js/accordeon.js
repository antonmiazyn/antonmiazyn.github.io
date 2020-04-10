let link = document.querySelectorAll(".faq_accordeon-link");
let turn = document.querySelectorAll(".faq_accordeon-turn");
let content = document.querySelectorAll(".faq_accordeon-content");

for(let i = 0; i < link.length; i++) {
  link[i].onclick = () => {
    link.forEach((item, i) => {
      item.classList.add("hidden");
    });
    content[i].classList.remove("hidden");
  }
  turn[i].onclick = () => {
    content.forEach((item, i) => {
      item.classList.add("hidden");
    });
    link.forEach((item, i) => {
      item.classList.remove("hidden");
    });
  }
}
