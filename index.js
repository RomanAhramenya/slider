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

// my code

const images = document.querySelectorAll(".slider-line .slider-items img");
const sliderWrapper = document.querySelector(".slider-country");
const sliderLine = document.querySelector(".slider-line");
const dotsSlider = document.querySelectorAll(".dot-slider");
let count = 0;
let width;

function adaptImage() {
  width = sliderWrapper.offsetWidth;
  images.forEach((item) => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
}
window.addEventListener("resize", adaptImage);
adaptImage();

dotsSlider.forEach((item, index) => {
  item.addEventListener("click", () => {
    count = index;
    sliderScroll();
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
function sliderScroll() {
  sliderLine.style.transition = "all ease 0.5s";
  sliderLine.style.transform = "translateX(-" + count * width + "px)";
}

sliderLine.addEventListener("touchstart", handleStart);
sliderLine.addEventListener("touchmove", handleMove);
sliderLine.addEventListener("touchend", handleEnd);
sliderLine.addEventListener("mousedown", handleStart);
sliderLine.addEventListener("mousemove", handleMouseMove);
sliderLine.addEventListener("mouseout", handleEnd);
sliderLine.addEventListener("mouseup", handleEnd);

let x1 = null;
let x2 = null;
let isSwipeMouse = false;
const offsetPercentScroll = 0.15;
const mousedown = 'mousedown';
const mousemove = 'mousemove';

function handleEnd(e) {
  isSwipeMouse = false;
  sliderLine.style.transition = "all ease 0.5s";
  let xDiff = x2 - x1;

  if (xDiff > 0 && Math.abs(xDiff) > width * offsetPercentScroll && count > 0 && x2) {
    count--;
    sliderScroll();
    toggleActiveDot(count);
  }
  if (
    xDiff < 0 &&
    Math.abs(xDiff) > width * offsetPercentScroll &&
    count != images.length - 1 &&
    x2
  ) {
    count++;
    sliderScroll();
    toggleActiveDot(count);
  } else {
    sliderScroll();
    toggleActiveDot(count);
  }

  x1 = null;
  x2 = null;
}

function handleStart(e) {
  x1 = e.type === mousedown ? e.screenX : e.touches[0].screenX;
  isSwipeMouse = true;
}

function handleMouseMove(e) {
  if (isSwipeMouse) {
    handleMove(e);
  }
}
function handleMove(e) {
  if (!x1) {
    return false;
  }
  sliderLine.style.transition = "none";
  x2 = e.type === mousemove ? e.screenX : e.touches[0].screenX;

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
