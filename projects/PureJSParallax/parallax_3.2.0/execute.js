/*
  This is the version 3.2.0
*/

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

  constructor(y) {
    this.y = y;
  }

  setPageYPos(value) {
    this.y = value;
  }

  getPageYPos() {
    return this.y;
  }
}

//=======================

window.onload = () => {
  //Finding the parallax elements in DOM
  let parallax_elements = document.querySelectorAll(".parallax");
  let v_elements = Array.from(parallax_elements).filter(p_el => p_el.classList.contains("p-vertical")); //separating vertical parallax elements in DOM
  let h_elements = Array.from(parallax_elements).filter(p_el => p_el.classList.contains("p-horizontal")); //separating horizontal parallax elements in DOM
  let m_elements = Array.from(parallax_elements).filter(p_el => p_el.classList.contains("p-mousemove")); //separating mousemove parallax elements in DOM

  //=======================

  function getPageYOffset() {
    let y_offset = window.pageYOffset;
    return y_offset;
  }

  function setPagePosition(object) {
    object.setPageYPos(getPageYOffset());
  }

  //=======================

  let vertical_objects = [];

  function createVerticalObject(element, index) {
    vertical_objects[index] = new Vertical(0, 0, position.y, 0);
  }

  function setVerticalProperties() {
    v_elements.forEach((v_e, i) => {
      createVerticalObject(v_e, i);
    });

    vertical_objects.forEach((v_o, i) => {
      if(v_elements) {
        if(Number(v_elements[i].getAttribute("weight")) != 0) {
          v_o.setWeight(Number(v_elements[i].getAttribute("weight")));
        } else {
          v_o.setWeight(10); //default
        }

        v_o.setY(Number(position.y));
        v_o.setStart(v_o.verticalMove());
      }
    });
  }

  //=======================

  let horizontal_objects = [];

  function createHorizontalObject(element, index) {
    horizontal_objects[index] = new Horizontal(0, 0, position.y, 0);
  }

  function setHorizontalProperties() {
    h_elements.forEach((h_e, i) => {
      createHorizontalObject(h_e, i);
    });

    horizontal_objects.forEach((h_o, i) => {
      if(h_elements) {
        if(Number(h_elements[i].getAttribute("weight")) != 0) {
          h_o.setWeight(Number(h_elements[i].getAttribute("weight")));
        } else {
          h_o.setWeight(10); //default
        }

        h_o.setY(Number(position.y));
        h_o.setStart(h_o.horizontalMove());
      }
    });
  }

  //=======================

  let mousemove_objects = [];

  function createMousemoveObject(element, index) {
    let element_speed = element.speed;

    mousemove_objects[index] = new Mousemove(0, element_speed, position.y, 0);
  }

  function setMousemoveProperties() {
    m_elements.forEach((m_e, i) => {
      createMousemoveObject(m_e, i);
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

  //Getting the page scroll position

  let position = new Static(0);

  setPagePosition(position);

  if(vertical) {
    setVerticalProperties();

    v_elements.forEach((v_e, i) => {
      v_e.style.transform = "translateY(" + vertical_objects[i].start + "px)"; //changing position
    });
  }

  if(horizontal) {
    setHorizontalProperties();

    h_elements.forEach((h_e, i) => {
      h_e.style.transform = "translateX(" + horizontal_objects[i].start + "px)"; //changing position
    });
  }

  if(mousemove) {
    setMousemoveProperties();
  }

  //=======================

  //Scrolling actions | Affects Vertical and Horizontal parallax

  window.onscroll = () => {

    setPagePosition(position);

    vertical_objects.forEach((v_o) => {
      v_o.setY(Number(position.y));
    });

    horizontal_objects.forEach((h_o) => {
      h_o.setY(Number(position.y));
    });

    /* === scrolling === */

    if(vertical) {
      if(v_elements) {
        v_elements.forEach((v_e, i) => {
          v_e.style.transform = "translateY(" + vertical_objects[i].verticalMove() + "px)"; //changing position
        });
      }
    }

    if(horizontal) {
      if(h_elements) {
        h_elements.forEach((h_e, i) => {
          h_e.style.transform = "translateX(" + horizontal_objects[i].horizontalMove() + "px)"; //changing position
        });
      }
    }
  }

  //Mousemove actions | Affects Mousemove parallax

  document.onmousemove = (e) => {
    let mouseXPosition = e.clientX; //getting cursor X position
    let mouseYPosition = e.clientY; //getting cursor Y position

    m_elements.forEach((m_e, i) => {
      if(mouseXPosition > window.innerWidth / 2 && mouseYPosition > window.innerHeight / 2) { //cursor moving to the bottom right
        if(Number(m_e.getAttribute("speed")) >= 0) {
          m_e.style.transform = "translate3d(-" + 10 * mousemove_objects[i].move()  + "%, -" + 10 * mousemove_objects[i].move() + "%, 0)"; //changing position
        } else {
          m_e.style.transform = "translate3d(" + 10 * mousemove_objects[i].move()  + "%, " + 10 * mousemove_objects[i].move() + "%, 0)"; //changing position
        }
      } else if(mouseXPosition < window.innerWidth / 2 && mouseYPosition > window.innerHeight / 2) { //cursor moving to the bottom left
        if(Number(m_e.getAttribute("speed")) >= 0) {
          m_e.style.transform = "translate3d(" + 10 * mousemove_objects[i].move()  + "%, -" + 10 * mousemove_objects[i].move() + "%, 0)"; //changing position
        } else {
          m_e.style.transform = "translate3d(-" + 10 * mousemove_objects[i].move()  + "%, " + 10 * mousemove_objects[i].move() + "%, 0)"; //changing position
        }
      } else if(mouseXPosition > window.innerWidth / 2 && mouseYPosition < window.innerHeight / 2) { //cursor moving to the top right
        if(Number(m_e.getAttribute("speed")) >= 0) {
          m_e.style.transform = "translate3d(-" + 10 * mousemove_objects[i].move()  + "%, " + 10 * mousemove_objects[i].move() + "%, 0)"; //changing position
        } else {
          m_e.style.transform = "translate3d(" + 10 * mousemove_objects[i].move()  + "%, -" + 10 * mousemove_objects[i].move() + "%, 0)"; //changing position
        }
      } else if(mouseXPosition < window.innerWidth / 2 && mouseYPosition < window.innerHeight / 2) { //cursor moving to the top left
        if(Number(m_e.getAttribute("speed")) >= 0) {
          m_e.style.transform = "translate3d(" + 10 * mousemove_objects[i].move()  + "%, " + 10 * mousemove_objects[i].move() + "%, 0)"; //changing position
        } else {
          m_e.style.transform = "translate3d(-" + 10 * mousemove_objects[i].move()  + "%, -" + 10 * mousemove_objects[i].move() + "%, 0)"; //changing position
        }
      } else {
        m_e.style.transform = "translate3d(0, 0, 0)"; //cursor on the cross lines (on the central vertical line of the screen, or on the central horizontal line of the screen, or in the center of the screen)
      }
    });
  }
}
