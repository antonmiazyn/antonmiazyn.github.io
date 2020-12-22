
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
  #x; #y;

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

//=======================

let vertical_objects = [];

function createVerticalObject(element, index) {
  let element_step = element.step;
  let element_speed = element.speed;
  let element_max = element.max;

  vertical_objects[index] = new Vertical(element_step, element_speed, element_max, position.y);
}

function setVerticalProperties() {
  v_elements.forEach((v_e, i) => {
    createVerticalObject(v_e, i)
  });

  vertical_objects.forEach((v_o, i) => {
    if(v_elements) {
      v_o.setSpeed(Number(v_elements[i].getAttribute("speed")));
      v_o.setMax(Number(v_elements[i].getAttribute("max")));
      v_o.setY(Number(position.y));
    }
  });
}

//=======================

let position = new Static(0, 0);

window.onload = () => {
  setPagePositions(position);

  if(vertical) {
    setVerticalProperties();
  }

}

let scrollDirection = true;

window.addEventListener("mousewheel", (e) => {
  e = e || window.event;

  let vertical_delta = e.deltaY || e.detail || e.wheelDelta;

  if(vertical_delta >= 0) {
    if(vertical) {
      if(v_elements) {
        v_elements.forEach((v_e, i) => {
          if(vertical_objects[i].result >= vertical_objects[i].max) {
            console.log("more")
          }
          v_e.style.transform = "translateY(" + vertical_objects[i].moveDown() + "%)";
        });
      }
    }
  } else {
    if(vertical) {
      if(v_elements) {
        v_elements.forEach((v_e, i) => {
          if(vertical_objects[i].result <= 0) {
            v_e.style.transform = "translateY(0)";
          } else {
            v_e.style.transform = "translateY(" + vertical_objects[i].moveUp() + "%)";
          }
        });
      }
    }
  }
});

window.onscroll = () => {
  setPagePositions(position);
}
