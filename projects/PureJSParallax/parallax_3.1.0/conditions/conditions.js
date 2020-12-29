/* === Common Class === */

class Condition {

  constructor(weight, speed, y, top) {
    this.weight = weight;
    this.speed = speed;
    this.y = y;
    this.result;
    this.top = top;
  }

  setWeight(value) {
    this.weight = value;
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

  setResult(value) {
    this.result = value;
  }

}

/* === Vertical Condition Parallax === */

class Vertical extends Condition {

  /*-------- Execution ---------*/

  verticalMove() {
    this.result = this.y / this.weight;

    return this.result;
  }
}

let vertical_allowed = true;

/* === Horizontal Condition Parallax === */

class Horizontal extends Condition {

  /*-------- Execution ---------*/

  horizontalMove() {
    this.result = this.y / this.weight;

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
