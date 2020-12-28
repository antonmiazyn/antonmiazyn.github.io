
// Class Vertical available
let vertical = true;
if(typeof vertical_allowed == 'undefined') {
  vertical = false;
}

// Class Horizontal available
let horizontal = true;
if(typeof horizontal_allowed == 'undefined') {
  horizontal = false;
}

// Class Mousemove available
let mousemove = true;
if(typeof mousemove_allowed == 'undefined') {
  mousemove = false;
}

/* === Page Static Class === */

class Static {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setPageXPos(value) {
    this.x = value;
  }

  setPageYPos(value) {
    this.y = value;
  }

  getPageXPos() {
    return this.x;
  }

  getPageYPos() {
    return this.y;
  }
}

//=======================

window.onload = () => {
  let parallax_elements = document.querySelectorAll(".parallax");
  let v_elements = Array.from(parallax_elements).filter(p_el => p_el.classList.contains("p-vertical"));
  let h_elements = Array.from(parallax_elements).filter(p_el => p_el.classList.contains("p-horizontal"));
  let m_elements = Array.from(parallax_elements).filter(p_el => p_el.classList.contains("p-mousemove"));

  //=======================

  function getPageXOffset() {
    let x_offset = window.pageXOffset;
    return x_offset;
  }

  function getPageYOffset() {
    let y_offset = window.pageYOffset;
    return y_offset;
  }

  function setPagePositions(object) {
    object.setPageXPos(getPageXOffset());
    object.setPageYPos(getPageYOffset());
  }

  function getElementTopOffset(element) {
    let elementOffset = element.getBoundingClientRect();
    let elementTopOffset = elementOffset.top;

    return elementTopOffset;
  }

  //=======================

  let vertical_objects = [];

  function createVerticalObject(element, index) {
    let element_speed = element.speed;
    let element_max = element.max;

    vertical_objects[index] = new Vertical(element_speed, element_max, position.y);
  }

  function setVerticalProperties() {
    v_elements.forEach((v_e, i) => {
      createVerticalObject(v_e, i);

      vertical_objects[i].setTop(getElementTopOffset(v_e));
    });

    vertical_objects.forEach((v_o, i) => {
      if(v_elements) {
        v_o.setSpeed(Number(v_elements[i].getAttribute("speed")));
        if(Number(v_elements[i].getAttribute("speed")) < 0) {
          v_o.setMax(- Number(v_elements[i].getAttribute("max")));
        } else {
          v_o.setMax(Number(v_elements[i].getAttribute("max")));
        }
        v_o.setY(Number(position.y));
      }
    });
  }

  //=======================

  let horizontal_objects = [];

  function createHorizontalObject(element, index) {
    let element_speed = element.speed;
    let element_max = element.max;

    horizontal_objects[index] = new Horizontal(element_speed, element_max, position.y);
  }

  function setHorizontalProperties() {
    h_elements.forEach((h_e, i) => {
      createHorizontalObject(h_e, i);

      horizontal_objects[i].setTop(getElementTopOffset(h_e));
    });

    horizontal_objects.forEach((h_o, i) => {
      if(h_elements) {
        h_o.setSpeed(Number(h_elements[i].getAttribute("speed")));
        if(Number(h_elements[i].getAttribute("speed")) < 0) {
          h_o.setMax(- Number(h_elements[i].getAttribute("max")));
        } else {
          h_o.setMax(Number(h_elements[i].getAttribute("max")));
        }
        h_o.setY(Number(position.y));
      }
    });
  }

  //=======================

  let mousemove_objects = [];

  function createMousemoveObject(element, index) {
    let element_speed = element.speed;
    let element_max_x = element.max_x;
    let element_max_y = element.max_y;

    mousemove_objects[index] = new Mousemove(element_speed, position.y);
  }

  function setMousemoveProperties() {
    m_elements.forEach((m_e, i) => {
      createMousemoveObject(m_e, i);

      mousemove_objects[i].setTop(getElementTopOffset(m_e));
    });

    mousemove_objects.forEach((m_o, i) => {
      if(m_elements) {
        if(Number(m_elements[i].getAttribute("speed")) >= 0) {
          m_o.setSpeed(Number(m_elements[i].getAttribute("speed")));
        } else {
          m_o.setSpeed(-Number(m_elements[i].getAttribute("speed")));
        }
        m_o.setY(Number(position.y));
      }
    });
  }

  //=======================

  let position = new Static(0, 0);

  setPagePositions(position);

  if(vertical) {
      setVerticalProperties();
  }

  if(horizontal) {
    setHorizontalProperties();
  }

  if(mousemove) {
    setMousemoveProperties();
  }

  window.addEventListener("mousewheel", (e) => {
    e = e || window.event;

    let vertical_delta = e.deltaY || e.detail || e.wheelDelta;
    let horizontal_delta = vertical_delta;

    /*-----*/

    if(vertical_delta >= 0) {
      if(vertical) {
        if(v_elements) {
          v_elements.forEach((v_e, i) => {
            if(document.documentElement.offsetHeight - window.innerHeight - document.documentElement.scrollTop == 0) {
              return false;
            } else {
              if(vertical_objects[i].getTop() - v_e.offsetHeight <= position.y + window.innerHeight / 1.5 && vertical_objects[i].getTop() + window.innerHeight + v_e.offsetHeight + vertical_objects[i].max + vertical_objects[i].speed >= position.y) {
                if(Number(v_elements[i].getAttribute("speed")) > 0) {
                  if(vertical_objects[i].result >= vertical_objects[i].max - vertical_objects[i].speed) {
                    v_e.style.transform = "translateY(" + vertical_objects[i].max + "%)";
                    vertical_objects[i].setResult(vertical_objects[i].max);
                  } else {
                    v_e.style.transform = "translateY(" + vertical_objects[i].moveDown() + "%)";
                  }
                } else {
                  if(vertical_objects[i].result <= vertical_objects[i].max) {
                    v_e.style.transform = "translateY(" + vertical_objects[i].max + "%)";
                    vertical_objects[i].setResult(vertical_objects[i].max);
                  } else {
                    v_e.style.transform = "translateY(" + vertical_objects[i].moveDown() + "%)";
                  }
                }
              }
            }
          });
        }
      }
    } else {
      if(vertical) {
        if(v_elements) {
          v_elements.forEach((v_e, i) => {
            if(document.documentElement.scrollTop == 0) {
              return false;
            } else {
              if(vertical_objects[i].getTop() - v_e.offsetHeight <= position.y + window.innerHeight / 1.5 && vertical_objects[i].getTop() + window.innerHeight + v_e.offsetHeight + vertical_objects[i].max + vertical_objects[i].speed >= position.y) {
                if(Number(v_elements[i].getAttribute("speed")) > 0) {
                  if(vertical_objects[i].result <= vertical_objects[i].speed) {
                    v_e.style.transform = "translateY(0)";
                    vertical_objects[i].setResult(0);
                  } else {
                    v_e.style.transform = "translateY(" + vertical_objects[i].moveUp() + "%)";
                  }
                } else {
                  if(vertical_objects[i].result >= vertical_objects[i].speed) {
                    v_e.style.transform = "translateY(0)";
                    vertical_objects[i].setResult(0);
                  } else {
                    v_e.style.transform = "translateY(" + vertical_objects[i].moveUp() + "%)";
                  }
                }
              }
            }
          });
        }
      }
    }

    /*-----*/

    if(horizontal_delta >= 0) {
      if(horizontal) {
        if(h_elements) {
          h_elements.forEach((h_e, i) => {
            if(horizontal_objects[i].getTop() - h_e.offsetHeight / 2 <= position.y + window.innerHeight / 1.5 && horizontal_objects[i].getTop() + window.innerHeight / 2 >= position.y) {
              if(Number(h_elements[i].getAttribute("speed")) > 0) {
                if(horizontal_objects[i].result >= horizontal_objects[i].max - horizontal_objects[i].speed) {
                  h_e.style.transform = "translateX(" + horizontal_objects[i].max + "%)";
                  horizontal_objects[i].setResult(horizontal_objects[i].max);
                } else {
                  h_e.style.transform = "translateX(" + horizontal_objects[i].moveRight() + "%)";
                }
              } else {
                if(horizontal_objects[i].result <= horizontal_objects[i].max) {
                  h_e.style.transform = "translateX(" + horizontal_objects[i].max + "%)";
                  horizontal_objects[i].setResult(horizontal_objects[i].max);
                } else {
                  h_e.style.transform = "translateX(" + horizontal_objects[i].moveRight() + "%)";
                }
              }
            }
          });
        }
      }
    } else {
      if(horizontal) {
        if(h_elements) {
          h_elements.forEach((h_e, i) => {
            if(horizontal_objects[i].getTop() - h_e.offsetHeight / 2 <= position.y + window.innerHeight / 1.5 && horizontal_objects[i].getTop() + window.innerHeight / 2 >= position.y) {
              if(Number(h_elements[i].getAttribute("speed")) > 0) {
                if(horizontal_objects[i].result <= horizontal_objects[i].speed) {
                  h_e.style.transform = "translateX(0)";
                  horizontal_objects[i].setResult(0);
                } else {
                  h_e.style.transform = "translateX(" + horizontal_objects[i].moveLeft() + "%)";
                }
              } else {
                if(horizontal_objects[i].result >= horizontal_objects[i].speed) {
                  h_e.style.transform = "translateX(0)";
                  horizontal_objects[i].setResult(0);
                } else {
                  h_e.style.transform = "translateX(" + horizontal_objects[i].moveLeft() + "%)";
                }
              }
            }
          });
        }
      }
    }
  });

  window.onscroll = () => {
    setPagePositions(position);
  }

  document.onmousemove = (e) => {
    let mouseXPosition = e.clientX;
    let mouseYPosition = e.clientY;

    m_elements.forEach((m_e, i) => {
      if(mouseXPosition > window.innerWidth / 2 && mouseYPosition > window.innerHeight / 2) {
        if(Number(m_e.getAttribute("speed")) >= 0) {
          m_e.style.transform = "translate3d(-" + 10 * mousemove_objects[i].move()  + "%, -" + 10 * mousemove_objects[i].move() + "%, 0)";
        } else {
          m_e.style.transform = "translate3d(" + 10 * mousemove_objects[i].move()  + "%, " + 10 * mousemove_objects[i].move() + "%, 0)";
        }
      } else if(mouseXPosition < window.innerWidth / 2 && mouseYPosition > window.innerHeight / 2) {
        if(Number(m_e.getAttribute("speed")) >= 0) {
          m_e.style.transform = "translate3d(" + 10 * mousemove_objects[i].move()  + "%, -" + 10 * mousemove_objects[i].move() + "%, 0)";
        } else {
          m_e.style.transform = "translate3d(-" + 10 * mousemove_objects[i].move()  + "%, " + 10 * mousemove_objects[i].move() + "%, 0)";
        }
      } else if(mouseXPosition > window.innerWidth / 2 && mouseYPosition < window.innerHeight / 2) {
        if(Number(m_e.getAttribute("speed")) >= 0) {
          m_e.style.transform = "translate3d(-" + 10 * mousemove_objects[i].move()  + "%, " + 10 * mousemove_objects[i].move() + "%, 0)";
        } else {
          m_e.style.transform = "translate3d(" + 10 * mousemove_objects[i].move()  + "%, -" + 10 * mousemove_objects[i].move() + "%, 0)";
        }
      } else if(mouseXPosition < window.innerWidth / 2 && mouseYPosition < window.innerHeight / 2) {
        if(Number(m_e.getAttribute("speed")) >= 0) {
          m_e.style.transform = "translate3d(" + 10 * mousemove_objects[i].move()  + "%, " + 10 * mousemove_objects[i].move() + "%, 0)";
        } else {
          m_e.style.transform = "translate3d(-" + 10 * mousemove_objects[i].move()  + "%, -" + 10 * mousemove_objects[i].move() + "%, 0)";
        }
      } else {
        m_e.style.transform = "translate3d(0, 0, 0)";
      }
    });
  }
}
