window.onload = () => {

  /* == Define Flashing Elements == */

  let flashing_container = document.querySelectorAll('.flashing');

  flashing_container.forEach((f_c) => {
    let flashing_images = f_c.querySelectorAll('.flashing-image');

    let setting = f_c.getAttribute('data-setting');
    let speed = f_c.getAttribute('data-speed') * 100;
    let duration = f_c.getAttribute('data-duration') * 1000;

    setStart(flashing_images);

    //action start

    setSetting(flashing_images, setting);

    getChoice(flashing_images, speed, duration);
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

  let intervalFlag;
  function switching(elements, speed, pause) {
    if(!pause) {
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

      intervalFlag = setInterval(() => {
        index = getRandomNumber(0, elements.length - 1);

        elements.forEach((el) => {
          el.classList.remove('shown');
          el.classList.add('hidden');
        });

        elements[index].classList.remove('hidden');
        elements[index].classList.add('shown');
      }, speed);
    } else {
      clearInterval(intervalFlag)
    }
  }

  /* == Stop on Choice == */

  function getChoice(elements, speed, duration) {
    let pause = false;
    let loopLimit = 9000; // ~15 minutes

    let j = 0;
    let lap = 1;
    for(let i = 0; i < loopLimit; i++) {
      setTimeout(() => {
        switching(elements, speed, pause);
        if(pause) {
          elements.forEach((el) => {
            el.classList.remove('shown');
            el.classList.add('hidden');
          });

          elements[i - j].classList.remove('hidden');
          elements[i - j].classList.add('shown');
        } else {
          j++;
        }

        if(i > 0 && i == (elements.length * 2 - 1) * lap) {
          if(lap < 1) {
            j = lap * (elements.length * 2);
          } else {
            j = lap * (elements.length * 2) - (lap - 1);
          }
          lap++;
        }

        pause = !pause;

      }, i * duration, i)
    }
  }
}
