//0 стартовая позиция; -500 крайняя позиция;

let position = 0;
let slide = 0;

const log = console.log;
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slider = document.querySelector(".slider-wrap");
const slides = document.querySelectorAll(".slider-wrap > div");
const buttons = document.querySelectorAll(".buttons > span");
const quantity = slides.length;
// grab hand variable;
let mouseXPosition;
let mouseGrab = false;
let mouseGrabOn;
let mouseGrabOff;
let difference;
let tile = false;

// important!
if (quantity != buttons.length){
  alert('Slider is not formed correctly. Quantity of slides must be equals of quantity buttons!')
}


//
// Listeners for arrows
//
arrowRight.addEventListener("click", () => {
  limiter(right);
});
arrowLeft.addEventListener("click", () => {
  limiter(left);
});

function limiter(f) {
  if (!tile) {
    f();
    tile = true;
    setTimeout(() => {
      tile = false;
    }, 1000);
  }
}


//
// Listeners for grab hand
//
slider.addEventListener("mousemove", e => {
  let onePercent = window.innerWidth * 0.01;
  mouseXPosition = parseInt(e.clientX / onePercent);
  if (mouseGrab) {
    position = slide * 100 * -1;
    difference = mouseXPosition - mouseGrabOn;
    slider.style.marginLeft = position + difference + "vw";
    log("moving mouse", position + difference);
  }
});
slider.addEventListener("mousedown", e => {
  let onePercent = window.innerWidth * 0.01;
  mouseGrabOn = parseInt(e.clientX / onePercent);
  log(mouseGrabOn);
  mouseGrab = true;
});
slider.addEventListener("mouseup", e => {
  let onePercent = window.innerWidth * 0.01;
  mouseGrabOff = parseInt(e.clientX / onePercent);
  log(mouseGrabOff);
  difference = mouseGrabOff - mouseGrabOn;
  if (Math.abs(difference) > 25) {
    if (difference > 0) {
      left();
    } else {
      right();
    }
  } else {
    render();
  }
  mouseGrab = false;
});

//
// Add listeners for buttons
//
for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", clickBtn);
}
render();

//
// right()
//
function right() {
  switch (true) {
    case slide < quantity - 1:
      slide++;
      slider.style.transition = "1s";
      log("right false");
      break;
    case slide == quantity - 1:
      slide++;
      slider.style.transition = "1s";
      log("right true");
      setTimeout(right, 950);
      setTimeout(() => {
        slider.style.transition = "1s";
      }, 1000);
      break;
    case slide == quantity:
      slide = 0;
      log("right2");
      slider.style.transition = "0s";
      break;
  }
  render();
}

//
// left()
//
function left() {
  switch (true) {
    case slide > 0:
      slide--;
      slider.style.transition = "1s";
      log("left false");
      break;
    case slide == 0:
      slide--;
      slider.style.transition = "1s";
      log("left true");
      setTimeout(left, 950);
      setTimeout(() => {
        slider.style.transition = "1s";
      }, 1000);
      break;
    case slide == -1:
      slide = quantity - 1;
      log("left2");
      slider.style.transition = "0s";
      break;
  }
  render();
}

//
// bottom buttons
//
function clickBtn(e) {
  let allClasses = e.target.className;
  let classList = allClasses.split(" ");
  let classNumber = classList[1].replace(/btn/g, "");
  let stringNumber = Number(classNumber);
  position = stringNumber * 100 * -1;
  slide = stringNumber;
  render();
  log(position);
}

//
// render
//
function render() {
  position = slide * 100 * -1;

  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.background = "none";
    log("render 1");
  }

  slider.style.marginLeft = position + "vw";

  switch (true) {
    case slide >= 0 && slide < quantity:
      buttons[slide].style.background = "white";
      log("render 2");
      break;
    case slide == quantity:
      buttons[0].style.background = "white";
      log("render 3");
      break;
    case slide == -1:
      buttons[buttons.length - 1].style.background = "white";
      log("render 4");
      break;
  }
  log(slide);
}

// setInterval (right, 4000);
