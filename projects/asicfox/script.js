new Swiper('.landing--content-slider', {
  direction: 'vertical',
  slidesPerView: 1,
  speed: 1000,
  mousewheel: true,
  allowTouchMove: false,
  pagination: {
    el: '.landing--content-slider__pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.landing--content-slider__next'
  }
});