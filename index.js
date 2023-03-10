const information = document.querySelectorAll(".advantages-block p");
const fullInformation = document.querySelector(".read-full");

information.forEach((elem) => {
  elem.setAttribute("style", "display: none");
});

fullInformation.addEventListener("click", () => {
  information.forEach((elem) => {
    elem.setAttribute("style", "display: block");
  });
});

// мое
const images = document.querySelectorAll(".slider-line .slider-items img");
const sliderLine = document.querySelector(".slider-line");
const dotsSlider = document.querySelectorAll(".dot-slider");

let count = 0;
let width;

function init() {
  width = document.querySelector(".slider-country").offsetWidth;
 
  images.forEach((item) => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
  rollSlider();
}
window.addEventListener("resize", init);
init();

dotsSlider.forEach((item, index) => {
  item.addEventListener("click", () => {
    count = index;
    rollSlider();
    toggleActiveDot(count);
  });
});

function toggleActiveDot(element) {
  dotsSlider.forEach((item, index) => {
    item.classList.remove("active");
    if (element === index) {
      item.classList.add("active");
    }
  });
}
function rollSlider() {
    sliderLine.style.transition = 'all ease 0.5s'
  sliderLine.style.transform = "translateX(-" + count * width + "px)";
}

let x1 = null;
let y1 = null;
let x2 = null;
let y2 = null;
sliderLine.addEventListener("touchstart", handleTouchStart, false);
sliderLine.addEventListener("touchmove", handleTouchMove);
sliderLine.addEventListener("touchend", handleTouchEnd, false);
function handleTouchEnd(e) {
    sliderLine.style.transition = 'all ease 0.5s'
  let xDiff = x2 - x1;

  if (xDiff > 0 && Math.abs(xDiff) > width*0.15  && count > 0 && x2) {
    count--;
    rollSlider();
    toggleActiveDot(count);
  }
  if (xDiff < 0 && Math.abs(xDiff) > width*0.15 && count != images.length - 1 && x2) {
    count++;
    rollSlider();
    toggleActiveDot(count);
  } else {
    rollSlider();
    toggleActiveDot(count);
  }

  x1 = null;
  x2 = null;
}
function handleTouchStart(e) {
  const firstTouch = e.touches[0];
  x1 = firstTouch.screenX;
}

function handleTouchMove(e) {
  if (!x1) {
    return false;
  }
  const firstTouch = e.touches[0];
sliderLine.style.transition = 'none'
  x2 = firstTouch.screenX;

  let xDiff = x2 - x1;

  if (xDiff > 0 && count <= images.length) {
    sliderLine.style.transform = `translateX(-${
      width * count - Math.abs(xDiff)
    }px`;
  }
  if (xDiff < 0 && count != images.length - 1) {
    sliderLine.style.transform = `translateX(-${
      width * count + Math.abs(xDiff)
    }px)`;
  }
}
