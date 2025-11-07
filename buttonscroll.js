const scrollUpBtn = document.querySelector(".scrollUp");
const scrollDownBtn = document.querySelector(".scrollDown");

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
