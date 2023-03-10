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
let x2 = null;
let isSwipeMouse=false
sliderLine.addEventListener("touchstart", handleTouchStart);
sliderLine.addEventListener("touchmove", handleTouchMove);
sliderLine.addEventListener("touchend", handleTouchEnd);
sliderLine.addEventListener("mousedown", handleMouseStart);
sliderLine.addEventListener("mousemove", handleMouseMove);
sliderLine.addEventListener("mouseout", handleMouseEnd);
sliderLine.addEventListener("mouseup", handleMouseEnd);



function handleMouseEnd(e) {
    isSwipeMouse=false
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
function handleMouseStart(e) {
    console.log('start',e)
  x1 = e.screenX;
  isSwipeMouse=true
}
function handleTouchStart(e) {
  
  const firstTouch = e.touches[0];
  
  x1 = firstTouch.screenX;
}

function handleMouseMove(e) {
  if (!x1) {
    return false;
  }
if(isSwipeMouse){
    sliderLine.style.transition = 'none'
  x2 = e.screenX;

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

}
function handleTouchMove(e) {
    console.log('move',e)
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
