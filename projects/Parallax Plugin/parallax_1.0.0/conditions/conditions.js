
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

  constructor(speed, y) {
    this.step = 10;
    this.speed = speed;
    this.y = y;
    this.result = [0, 0];
    this.top = 0;
  }

  setSpeed(value) {
    this.speed = value;
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

  move() { //getSpeed()
    return this.speed;
  }

}

let mousemove_allowed = true;
