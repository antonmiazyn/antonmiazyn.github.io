window.onload = () => {

  /* == Define Flashing Elements == */

  let flashing_container = document.querySelectorAll('.flashing');

  flashing_container.forEach((f_c) => {
    let flashing_images = f_c.querySelectorAll('.flashing-image');

    let setting = f_c.getAttribute('data-setting');
    let speed = f_c.getAttribute('data-speed') * 100;
    let duration = f_c.getAttribute('data-duration')duration;

    setStart(flashing_images);

    //action start

    setSetting(flashing_images, setting);

    switching(flashing_images, speed);

    getChoice(flashing_images, speed, duration)
  });

  /* == Set Start == */

  function setStart(elements) {
    elements.forEach((el) => {
      el.classList.add('hidden');
    });

    elements[0].classList.remove('hidden');
    elements[0].classList.add('shown');
  }

  /* == Set Setting == */

  function setSetting(elements, setting) {
    switch (setting) {
      case 'greyscale':
        elements.forEach((el) => {
          el.classList.add('greyscale')
        });
        break;
      case 'sepia':
        elements.forEach((el) => {
          el.classList.add('sepia')
        });
        break;
      case 'color':
        elements.forEach((el) => {
          el.classList.add('color')
        });
        break;
      default:
        elements.forEach((el) => {
          el.classList.add('color')
        });
    }
  }

  /* == Switching == */

  function switching(elements, speed) {
    let index = 0;

    let rand_numbers_array = [];
    function getRandomNumber(min, max) {
      let number = Math.floor(min + Math.random() * (max - min))
      if (rand_numbers_array.includes(number)) {
        return getRandomNumber(min, max)
      } else {
        if(rand_numbers_array.length > 2) { // prevent stack overflow
          rand_numbers_array.splice(0, 1);
          rand_numbers_array.push(number)
        } else {
          rand_numbers_array.push(number)
        }
        return number
      }
    }

    setInterval(() => {
      index = getRandomNumber(0, elements.length - 1);

      elements.forEach((el) => {
        el.classList.remove('shown');
        el.classList.add('hidden');
      });

      elements[index].classList.remove('hidden');
      elements[index].classList.add('shown');
    }, speed);
  }

  /* == Stop on Choice == */

  function getChoice(elements, speed, duration) {
    for(let i = 0; i < elements.length; i++) {
      setTimeout(() => {
        console.log("working")
      }, i * duration, i)
    }
  }
}
