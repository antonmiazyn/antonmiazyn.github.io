/* === Common Class === */

class Condition {

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

}

/* === Vertical Condition Parallax === */

class Vertical extends Condition {

  /*-------- Execution ---------*/

  moveDown() {
    this.result += 0.008 * this.step * this.speed;
    return this.result;
  }

  moveUp() {
    this.result -= 0.008 * this.step * this.speed;
    return this.result;
  }
}

let vertical_allowed = true;

/* === Horizontal Condition Parallax === */

class Horizontal extends Condition {

  /*-------- Execution ---------*/

  moveRight() {
    this.result += 0.008 * this.step * this.speed;
    return this.result;
  }

  moveLeft() {
    this.result -= 0.008 * this.step * this.speed;
    return this.result;
  }
}

let horizontal_allowed = true;

/* === Mousemove Condition Parallax === */

class Mousemove extends Condition {

  /*-------- Execution ---------*/

  move() { //getSpeed()
    return this.speed;
  }

}

let mousemove_allowed = true;
