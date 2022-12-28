// Content slider

const landingSlider = new Swiper('.landing--content-slider', {
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
})

// Menu

window.addEventListener('load', () => {
  const burger = document.querySelector('.landing--burger')
  const menu = document.querySelector('.landing--menu')
  const times = document.querySelector('.landing--times')
  if (!burger || !menu || !times) return

  burger.addEventListener('click', () => menu.classList.add('visible'))
  times.addEventListener('click', () => menu.classList.remove('visible'))

  const anchors = menu.querySelectorAll('.landing--menu__anchors > li')
  if (!anchors || !anchors.length) return;

  [...anchors].forEach(anchor => {
    anchor.addEventListener('click', () => {
      const target = anchor.dataset.landingSlide

      if (target) {
        landingSlider.slideTo(target)
        menu.classList.remove('visible')
      }
    })
  })
})

// Animation: Fade-up

window.addEventListener('load', () => {
  const INITIAL_DELAY = 600 // ms
  const STEP_DELAY = 300 // ms

  const sections = document.querySelectorAll('.landing--section')
  if (!sections || !sections.length) return

  // animate first slide on load

  const elements = sections[0].querySelectorAll('.landing--animated')
  if (elements && elements.length) {
    setTimeout(() => {
      for (let i = 0; i < elements.length; i++) {
        setTimeout(() => elements[i].classList.add('fade-up'), i * STEP_DELAY)
      }
    }, INITIAL_DELAY)
  }

  landingSlider.on('slideChange', () => {
    const active = landingSlider.activeIndex;

    [...sections].forEach(section => {
      const elements = section.querySelectorAll('.landing--animated')
      if (elements && elements.length) {
        [...elements].forEach(element => element.classList.remove('fade-up'))
      }
    })

    const current = [...sections].filter(section => section.dataset.landingSection == active)[0]
    if (current) {
      const elements = current.querySelectorAll('.landing--animated')
      if (elements && elements.length) {
        setTimeout(() => {
          for (let i = 0; i < elements.length; i++) {
            setTimeout(() => elements[i].classList.add('fade-up'), i * STEP_DELAY)
          }
        }, INITIAL_DELAY)
      }
    }
  })
})

// timer

window.addEventListener('load', () => {
  const FINISH_DATE = 'January, 7, 2023'
  const targetDate = new Date(FINISH_DATE)

  const timer = document.querySelector('.landing--section-hero__timer')
  if (!timer) return

  const numbers = timer.querySelectorAll('.landing--section-hero__timer-number')
  if (!numbers || !numbers.length) return

  const numbers_days = [...numbers].filter(number => number.classList.contains('days'))[0]
  const numbers_hours = [...numbers].filter(number => number.classList.contains('hours'))[0]
  const numbers_minutes = [...numbers].filter(number => number.classList.contains('minutes'))[0]
  const numbers_seconds = [...numbers].filter(number => number.classList.contains('seconds'))[0]

  setInterval(() => {
    const currentDate = new Date()
    const dateDiff = targetDate - currentDate

    const resultDate = getDHMS(dateDiff)
    numbers_days.textContent = resultDate.days
    numbers_hours.textContent = resultDate.hours
    numbers_minutes.textContent = resultDate.minutes
    numbers_seconds.textContent = resultDate.seconds
  }, 1000)
})

function getDHMS (ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000))
  const daysms = ms % (24 * 60 * 60 * 1000)
  const hours = Math.floor(daysms / (60 * 60 * 1000))
  const hoursms = ms % (60 * 60 * 1000)
  const minutes = Math.floor(hoursms / (60 * 1000))
  const minutesms = ms % (60 * 1000)
  const seconds = Math.floor(minutesms / 1000)

  return { days, hours, minutes, seconds }
}
