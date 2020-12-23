
/* === Vertical Condition Parallax === */

class Vertical {
  #result;

  constructor(speed, max, y) {
    this.step = 10;
    this.speed = speed;
    this.max = max;
    this.y = y;
    this.result = 0;
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
  #result;

  constructor(speed, max, x) {
    this.step = 10;
    this.speed = speed;
    this.max = max;
    this.x = x;
    this.result = 0;
  }

  setSpeed(value) {
    this.speed = value;
  }

  setMax(value) {
    this.max = value;
  }

  setX(value) {
    this.x = value;
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
