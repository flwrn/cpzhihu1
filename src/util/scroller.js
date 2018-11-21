const abs = Math.abs;
const pow = Math.pow;
const ceil = Math.ceil;

class Scroller {
  constructor({
    element,
    time,
    intervalTime
  }) {
    this.element = element;
    this.time = time;
    this.intervalTime = intervalTime;
  }
  scroll(distance) {
    let element = this.element
    let time = this.time
    let intervalTime = this.intervalTime
    let currentPosition = 0
    let availDistance = 0
    if (element === window) {
      currentPosition = document.body.scrollTop;
      if (distance > 0) {
        availDistance = document.body.scrollHeight - window.innerHeight - currentPosition;
      } else {
        availDistance = -currentPosition;
      }
    } else {
      currentPosition = element.scrollTop;
      if (distance > 0) {
        availDistance = element.scrollHeight - element.clientHeight - currentPosition;
      } else {
        availDistance = -currentPosition;
      }
    }

    if (abs(distance) > abs(availDistance)) {
      distance = availDistance;
    }

    let getStep = function(x) {
      let y = distance * (pow((x / time - 1), 3) + 1);
      return y;
    }

    let stepCount = ceil(time / intervalTime);
    let steps = [];
    for (let i = 0; i < stepCount; i++) {
      steps.push(currentPosition + getStep(i * intervalTime));
    }

    let interval = setInterval(() => {
      if (steps.length > 0) {
        element.scrollTo(0, steps.shift());
      } else {
        clearInterval(interval);
      }
    }, intervalTime);
  }
}

export default Scroller;
