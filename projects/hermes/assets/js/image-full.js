let imageStats = document.querySelectorAll(".product-information-image img");

if(imageStats != null) {
  imageStats.forEach((item) => {
    item.onclick = () => {
      window.open(`${item.src}`, `_blank`);
    }
  });
}
