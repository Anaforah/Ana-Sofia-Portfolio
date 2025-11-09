const scrollUpBtn = document.querySelector(".scrollUp");
const scrollDownBtn = document.querySelector(".scrollDown");
const scrollContainer = document.querySelector(".card-grid");
const scrollLeftBtn = document.querySelector(".scrollLeft");
const scrollRightBtn = document.querySelector(".scrollRight");

const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

const toggleScrollButtons = () => {
  const scrollY = window.scrollY;
  const headerBottom = header.offsetTop + header.offsetHeight;
  const mainBottom = main.offsetTop + main.offsetHeight;

  if (scrollY < headerBottom) {
    scrollUpBtn.classList.remove("show");
    scrollDownBtn.classList.add("show");
  }
  else if (scrollY >= mainBottom) {
    scrollUpBtn.classList.add("show");
    scrollDownBtn.classList.remove("show");
  }
  else {
    scrollUpBtn.classList.add("show");
    scrollDownBtn.classList.add("show");
  }
};

window.addEventListener("scroll", toggleScrollButtons);
document.addEventListener("DOMContentLoaded", toggleScrollButtons);

scrollUpBtn.addEventListener("click", () => {
  window.scrollTo({ top: header.offsetTop, behavior: "smooth" });
});

scrollDownBtn.addEventListener("click", () => {
  window.scrollTo({ top: footer.offsetTop, behavior: "smooth" });
});

const scrollAmount = () => scrollContainer.clientWidth * 0.9;

scrollLeftBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
});

scrollRightBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: scrollAmount(), behavior: "smooth" });
});

function toggleHorizontalButtons() {
  const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

  if (maxScrollLeft > 5) {
    scrollRightBtn.classList.add("show");
  } else {
    scrollRightBtn.classList.remove("show");
  }

  if (scrollContainer.scrollLeft <= 0) {
    scrollLeftBtn.classList.remove("show");
  } else {
    scrollLeftBtn.classList.add("show");
  }
}

scrollContainer.addEventListener("scroll", toggleHorizontalButtons);
window.addEventListener("resize", toggleHorizontalButtons);

window.addEventListener("load", () => {
  setTimeout(toggleHorizontalButtons, 200);
});

scrollContainer.querySelectorAll("img").forEach(img => {
  img.addEventListener("load", toggleHorizontalButtons);
});