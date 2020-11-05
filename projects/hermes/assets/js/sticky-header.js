let headerBlock = document.querySelector("header");
let bannerBlock = document.querySelector(".main-banner");

if(bannerBlock != null) {
  let currentHeight = bannerBlock.offsetHeight;

  window.onscroll = () => {
    if(window.pageYOffset >= (currentHeight - 150)) {
      headerBlock.classList.add("noir");
    } else {
      headerBlock.classList.remove("noir");
    }
  }
}
