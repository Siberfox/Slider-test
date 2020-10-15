import "./styles.scss";

document.addEventListener("DOMContentLoaded", () => {
  const pagination = document.querySelector(".gallery__pagination");
  const dots = document.querySelectorAll(".gallery__pagination-item");
  const items = document.querySelectorAll(".gallery__item");
  const prev = document.querySelector(".gallery__prev");
  const next = document.querySelector(".gallery__next");
  let indexItem = 0;
  let prevVal;
  items[indexItem].style.display = "block";
  let throttling = false;

  function animationIncrease() {
    throttling = true;
    const elem = items[indexItem];
    let pos = 600;

    items[indexItem].style.zIndex = "1";
    items[prevVal].style.zIndex = "-1";
    elem.style.left = pos + "px";
    elem.style.display = "block";
    let id = setInterval(frame, 5);

    function frame() {
      if (pos <= 0) {
        clearInterval(id);
        throttling = false;
        items[prevVal].style.display = "none";
      } else {
        pos -= 5;
        elem.style.left = pos + "px";
      }
    }
  }

  function animationDecrease() {
    throttling = true;
    const elem = items[indexItem];
    let pos = -600;

    items[indexItem].style.zIndex = "1";
    items[prevVal].style.zIndex = "-1";
    elem.style.left = pos + "px";
    elem.style.display = "block";
    let id = setInterval(frame, 5);

    function frame() {
      if (pos >= 0) {
        clearInterval(id);
        throttling = false;
        items[prevVal].style.display = "none";
      } else {
        pos += 5;
        elem.style.left = pos + "px";
      }
    }
  }

  const selectSlide = (n) => {
    prevVal = indexItem;
    dots[indexItem].classList.remove("active");
    indexItem = n;
    dots[indexItem].classList.add("active");
    if (n !== prevVal) {
      n < prevVal
        ? requestAnimationFrame(animationDecrease)
        : requestAnimationFrame(animationIncrease);
    }
  };

  const nextSlide = () => {
    prevVal = indexItem;
    dots[indexItem].classList.remove("active");
    indexItem >= items.length - 1 ? (indexItem = 0) : (indexItem += 1);
    dots[indexItem].classList.add("active");
    requestAnimationFrame(animationIncrease);
  };

  const prevSlide = () => {
    prevVal = indexItem;
    dots[indexItem].classList.remove("active");
    indexItem <= 0 ? (indexItem = items.length - 1) : (indexItem -= 1);
    dots[indexItem].classList.add("active");
    requestAnimationFrame(animationDecrease);
  };

  next.addEventListener("click", () => {
    if (!throttling) {
      nextSlide();
    }
  });

  prev.addEventListener("click", () => {
    if (!throttling) {
      prevSlide();
    }
  });

  pagination.addEventListener("click", (e) => {
    if (!throttling) {
      if (e.target.classList[0] === "gallery__pagination-item") {
        selectSlide(+e.target.id);
      }
    }
  });
});
