
/* === Vertical Condition Parallax === */

class Vertical {

  constructor(speed, max, y) {
    this.step = 10;
    this.speed = speed;
    this.max = max;
    this.y = y;
    this.result = 0;
    this.top = 0;
  }

  setSpeed(value) {
    this.speed = value;
  }

  setMax(value) {
    this.max = value;
  }

  setY(value) {
    this.y = value;
  }

  setTop(value){
    this.top = value;
  }

  getTop() {
    return this.top;
  }

  setResult(value) {
    this.result = value;
  }

  /*-------- Execution ---------*/

  moveDown() {
    this.result += 0.01 * this.step * this.speed * 10;
    return this.result;
  }

  moveUp() {
    this.result -= 0.01 * this.step * this.speed * 10;
    return this.result;
  }
}

let vertical_allowed = true;

/* === Horizontal Condition Parallax === */

class Horizontal {

  constructor(speed, max, y) {
    this.step = 10;
    this.speed = speed;
    this.max = max;
    this.y = y;
    this.result = 0;
    this.top = 0;
  }

  setSpeed(value) {
    this.speed = value;
  }

  setMax(value) {
    this.max = value;
  }

  setY(value) {
    this.y = value;
  }

  setTop(value) {
    this.top = value;
  }

  getTop() {
    return this.top;
  }

  setResult(value) {
    this.result = value;
  }

  /*-------- Execution ---------*/

  moveRight() {
    this.result += 0.01 * this.step * this.speed * 10;
    return this.result;
  }

  moveLeft() {
    this.result -= 0.01 * this.step * this.speed * 10;
    return this.result;
  }
}

let horizontal_allowed = true;

/* === Mousemove Condition Parallax === */

class Mousemove {

  constructor(speed, max_x, max_y, y) {
    this.step = 10;
    this.speed = speed;
    this.max_x = max_x;
    this.max_y = max_y;
    this.y = y;
    this.result = [0, 0];
    this.top = 0;
  }

  setSpeed(value) {
    this.speed = value;
  }

  setXMax(value) {
    this.max_x = value;
  }

  setYMax(value) {
    this.max_y = value;
  }

  setY(value) {
    this.y = value;
  }

  setTop(value) {
    this.top = value;
  }

  getTop() {
    return this.top;
  }

  setResult(array) {
    this.result = array;
  }

  /*-------- Execution ---------*/

  move() {
    this.result = [1, 1];
    return this.result;
  }

}

let mousemove_allowed = true;
