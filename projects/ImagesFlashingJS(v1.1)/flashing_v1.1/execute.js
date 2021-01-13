window.onload = () => {

  /* == Define Flashing Elements == */

  let flashing_container = document.querySelectorAll('.flashing');

  if(flashing_container && flashing_container.length > 0) {
    const default_speed = 150;
    const default_duration = 2000;
    const default_order = 'orderly';
    const default_setting = 'color';

    flashing_container.forEach((f_c) => {
      let flashing_images = f_c.querySelectorAll('.flashing-image');

      let flashing_speed_atr = f_c.getAttribute('data-speed');
      let speed;

      let flashing_duration_atr = f_c.getAttribute('data-duration');
      let duration;

      let order = f_c.getAttribute('data-order');
      let order_value, order_setted;
      if(order && order != '' && (order == 'orderly' || order == 'random' || order == 'absolute')) {
        order_value = order;
      } else {
        order_value = default_order;
      }

      let setting = f_c.getAttribute('data-setting');

      if(flashing_speed_atr && flashing_speed_atr != '' && flashing_speed_atr > 0) {
        speed = flashing_speed_atr * 100;
      } else {
        speed = default_speed;
      }

      if(flashing_duration_atr && flashing_duration_atr != '' && flashing_duration_atr >= 1) {
        duration = flashing_duration_atr * 1000;
      } else {
        duration = default_duration;
      }

      /*------------------------------*/

      let default_index_array = [];
      fillDefaultIndexArray(default_index_array, flashing_images.length);

      let random_index_array = [];
      fillRandomIndexArray(random_index_array, flashing_images.length);

      let absolute_index_array = []; //start position of the absolutly random condition
      fillRandomIndexArray(absolute_index_array, flashing_images.length)

      /*------------------------------*/

      setStart(flashing_images);

      //action start

      setSetting(flashing_images, setting, default_setting);

      switch (order_value) {
        case 'orderly':
          order_setted = default_index_array;
          break;
        case 'random':
          order_setted = random_index_array;
          break;
        case 'absolute':
          order_setted = absolute_index_array;
          break;
        default:
          order_setted = default_index_array;
      }

      getChoice(flashing_images, order_value, order_setted, speed, duration);
    });
  }

  /* == Set Start == */

  function setStart(elements) {
    elements.forEach((el) => {
      el.classList.add('hidden');
    });

    elements[0].classList.remove('hidden');
    elements[0].classList.add('shown');
  }

  /* == Set Setting == */

  function setSetting(elements, setting, def) {
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
          el.classList.add(def)
        });
    }
  }

  /* == Default Index Array == */

  function fillDefaultIndexArray(array, length) {
    for(let i = 0; i < length; i++) {
      array.push(i);
    }
  }

  /* == Random Index Array == */

  function fillRandomIndexArray(array, length) {
    for(let i = 0; i < 10 * length; i++) {
      let number = Math.floor(Math.random() * length)
      if(!array.includes(number)) {
        array.push(number);
      }
    }
  }

  /* == Switching == */

  let intervalFlag;
  function switching(elements, order, speed, pause) {
    if(!pause) {

      let index = order;
      let index_start = 0;

      intervalFlag = setInterval(() => {
        if(index_start == elements.length - 1) {
          index_start = 0;
        } else {
          index_start++;
        }

        elements.forEach((el) => {
          el.classList.remove('shown');
          el.classList.add('hidden');
        });

        elements[index[index_start]].classList.remove('hidden');
        elements[index[index_start]].classList.add('shown');
      }, speed);
    } else {
      clearInterval(intervalFlag)
    }
  }

  /* == Stop on Choice == */

  function getChoice(elements, order_type, order_array, speed, duration) {
    let pause = false;
    let loopLimit = 9000; // ~15 minutes

    let j = 0;
    let lap = 1;
    for(let i = 0; i < loopLimit; i++) {
      setTimeout(() => {
        switching(elements, order_array, speed, pause);
        if(pause) {
          if(order_type == 'orderly') {
            elements.forEach((el) => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });

            elements[i - j].classList.remove('hidden');
            elements[i - j].classList.add('shown');
          } else if(order_type == 'random') {
            elements.forEach((el) => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });

            elements[order_array[i - j]].classList.remove('hidden');
            elements[order_array[i - j]].classList.add('shown');
          } else if(order_type == 'absolute') {
            elements.forEach((el) => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });

            elements[order_array[i - j]].classList.remove('hidden');
            elements[order_array[i - j]].classList.add('shown');
          } else {
            elements.forEach((el) => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });

            elements[i - j].classList.remove('hidden');
            elements[i - j].classList.add('shown');
          }
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

          if(order_type == 'absolute') {
            order_array = [];
            fillRandomIndexArray(order_array, elements.length)
          }
        }

        pause = !pause;

      }, i * duration, i)
    }
  }
}
