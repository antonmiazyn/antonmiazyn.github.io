// Content slider

const landingSlider = new Swiper('.landing--content-slider', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  speed: 1000,
  mousewheel: true,
  allowTouchMove: true,
  pagination: {
    el: '.landing--content-slider__pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.landing--content-slider__next'
  },
  breakpoints: {
    1200: {
      slidesPerView: 1,
      freeMode: false,
      allowTouchMove: false
    }
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
    anchor.addEventListener('click', event => {
      event.stopPropagation()
      const target = anchor.dataset.landingSlide

      if (target) {
        landingSlider.slideTo(target)
        menu.classList.remove('visible')
      }
    })
  })
})

// Anchors

window.addEventListener('load', () => {
  const anchors = document.querySelectorAll('.landing--cta')
  if (!anchors || !anchors.length) return;

  [...anchors].forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.stopPropagation()
      const target = anchor.dataset.landingSlide

      if (target) {
        landingSlider.slideTo(target)
      }
    })
  })
})

// Animation: Fade-up / Fade-in

window.addEventListener('load', landingFadeUp)
window.addEventListener('resize', () => {
  landingFadeUp()
  landingSlider.slideTo(0)
})

function landingFadeUp () {
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

    if (window.innerWidth > 991) {
      [...sections].forEach(section => {
        const elements = section.querySelectorAll('.landing--animated')
        if (elements && elements.length) {
          [...elements].forEach(element => element.classList.remove('fade-up'))
        }
  
        const fadein = section.querySelectorAll('.landing--fade')
        if (fadein && fadein.length) {
          [...fadein].forEach(element => element.classList.remove('fade-in'))
        }
      })
    }

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

      const fadein = current.querySelectorAll('.landing--fade')
      if (fadein && fadein.length) {
        setTimeout(() => {
          [...fadein].forEach(element => element.classList.add('fade-in'))
        }, INITIAL_DELAY + STEP_DELAY + 800)
      }
    }
  })
}

// Timer

window.addEventListener('load', () => {
  const FINISH_DATE = 'November, 16, 2023'
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

    requestAnimationFrame(
      () => getResultDate(
        numbers_days,
        numbers_hours,
        numbers_minutes,
        numbers_seconds,
        dateDiff
      )
    )
  }, 1000)
})

function getResultDate (d, h, m, s, diff) {
  const resultDate = getDHMS(diff)

  d.innerHTML = resultDate.days
  h.innerHTML = resultDate.hours
  m.innerHTML = resultDate.minutes
  s.innerHTML = resultDate.seconds
}

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

// Animation: Snow

const Snowflake = (function() {

	var flakes;
	var flakesTotal = 20;

  if (window.innerWidth > 1199) {
    flakesTotal = 120
  } else if (window.innerWidth <= 1199 && window.innerWidth > 575) {
    flakesTotal = 20
  } else {
    flakesTotal = 6
  }

	function Snowflake(size, x, y, vx, vy) {
		this.size = size;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.melt = false;
		this.div = document.createElement('div');
		this.div.classList.add('landing--snowflake');
		this.div.style.width = this.size + 'px';
		this.div.style.height = this.size + 'px';
	}

	Snowflake.prototype.move = function() {
		if (this.hit) {
			if (Math.random() > 0.995) this.melt = true;
		} else {
			this.x += this.vx;
			this.y += this.vy;
		}

		// Wrap the snowflake to within the bounds of the page
		if (this.x > window.innerWidth + this.size) {
			this.x -= window.innerWidth + this.size;
		}

		if (this.x < -this.size) {
			this.x += window.innerWidth + this.size;
		}

		if (this.y > window.innerHeight + this.size) {
			this.x = Math.random() * window.innerWidth;
			this.y -= window.innerHeight + this.size * 2;
			this.melt = false;
		}

		var dx = this.x;
		var dy = this.y;
		this.hit = !this.melt && this.y && dx * dx + dy * dy < 2400;
	};

	Snowflake.prototype.draw = function() {
		this.div.style.transform =
		this.div.style.MozTransform =
		this.div.style.webkitTransform =
			'translate3d(' + this.x + 'px' + ',' + this.y + 'px,0)';
	};

	function update() {
		for (var i = flakes.length; i--; ) {
			var flake = flakes[i];
			flake.move();
			flake.draw();
		}
		requestAnimationFrame(update);
	}

	Snowflake.init = function(container) {
		flakes = [];

		for (var i = flakesTotal; i--;) {
			var size = (Math.random() + 0.2) * 12 + 1;
			var flake = new Snowflake(
				size,
				Math.random() * window.innerWidth,
				Math.random() * window.innerHeight,
				Math.random() - 0.5,
				size * 0.2
			);
			container.appendChild(flake.div);
			flakes.push(flake);
		}
    
  	update();
	};

	return Snowflake;

}());

window.addEventListener('load', () => {
  Snowflake.init(document.getElementById('landing--snow'))
})
