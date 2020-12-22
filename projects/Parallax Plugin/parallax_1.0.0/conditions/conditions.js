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

  getStep() {
    return this.step;
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
