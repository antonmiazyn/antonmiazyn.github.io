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

      if(flashing_images && flashing_images.length != 0) {
        /*------------------------------*/

        let default_index_array = [];
        fillDefaultIndexArray(default_index_array, flashing_images.length);

        let random_index_array = [];
        fillRandomIndexArray(random_index_array, flashing_images.length);

        let absolute_index_array = []; //start position of the absolutly random condition
        fillRandomIndexArray(absolute_index_array, flashing_images.length)

        /*------------------------------*/

        setStart(flashing_images);

        let animation_index = [];
        let animation_data = [];
        setAnimation(flashing_images, animation_index, animation_data);

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

        getChoice(flashing_images, order_value, order_setted, speed, animation_index, animation_data, duration);
      }
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

  /* == Set Animation == */

  function setAnimation(elements, index_list, data_list) {
    elements.forEach((el, i) => {
      let sprite = el.querySelector('.flashing-animation');

      if(sprite) {
        let src = sprite.getAttribute("data-src");
        let amoung = sprite.getAttribute("data-amoung");

        let data_object = {}

        if(amoung && src && amoung != '' && src != '') {
          data_object = {
            src: src,
            amoung: amoung
          }
        } else if((!amoung || amoung == '') && src && src != '') {
          data_object = {
            src: src,
            amoung: 8
          }
        } else if((!amoung || amoung == '') && (!src || src == '')) {
          data_object = {
            src: 'sprites-circles.png',
            amoung: 8
          }
        } else if(amoung && (!src || src == '') && amoung != '') {
          data_object = {
            src: 'sprites-circles.png',
            amoung: amoung
          }
        } else {
          data_object = {
            src: 'sprites-circles.png',
            amoung: 8
          }
        }

        index_list.push(i);
        data_list.push(data_object)
      }
    });
  }

  /* == Animation Execution == */

  let animationFlag;
  function animateElement(anim_index, anim_data, elements, elem_index, duration) {
    let sprite = elements[elem_index].querySelector('.flashing-animation');

    if(sprite) {
      let step = 0;

      let anim_index_value = anim_index.indexOf(elem_index);

      sprite.style.backgroundImage = 'url(' + anim_data[anim_index_value].src + ')';

      let height = elements[elem_index].offsetWidth;
      sprite.style.height = height + 'px';
      let shift = sprite.offsetHeight;

      animationFlag = setInterval(() => {
        step -= shift;
        sprite.style.backgroundPosition = step + 'px 0';
      }, duration / anim_data[anim_index_value].amoung);
    }
  }

  /* == Reset Animation == */

  function resetAnimation(elements, flag) {
    clearInterval(flag);

    elements.forEach((el) => {
      let sprite = el.querySelector('.flashing-animation');
      if(sprite) {
        sprite.style.backgroundImage = 'none';
        sprite.style.backgroundPosition = '0 0';

        let height = el.offsetWidth;
        sprite.style.height = height + 'px';
      }
    });
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

  function getChoice(elements, order_type, order_array, speed, anim_index, anim_data, duration) {
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

            animateElement(anim_index, anim_data, elements, order_array[i - j], duration);
          } else if(order_type == 'random') {
            elements.forEach((el) => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });

            elements[order_array[i - j]].classList.remove('hidden');
            elements[order_array[i - j]].classList.add('shown');

            animateElement(anim_index, anim_data, elements, order_array[i - j], duration);
          } else if(order_type == 'absolute') {
            elements.forEach((el) => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });

            elements[order_array[i - j]].classList.remove('hidden');
            elements[order_array[i - j]].classList.add('shown');

            animateElement(anim_index, anim_data, elements, order_array[i - j], duration);
          } else {
            elements.forEach((el) => {
              el.classList.remove('shown');
              el.classList.add('hidden');
            });

            elements[i - j].classList.remove('hidden');
            elements[i - j].classList.add('shown');

            animateElement(anim_index, anim_data, elements, order_array[i - j], duration);
          }
        } else {
          resetAnimation(elements, animationFlag);
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
