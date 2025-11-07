const scrollUpBtn = document.querySelector(".scrollUp");
const scrollDownBtn = document.querySelector(".scrollDown");

const toggleScrollButtons = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const maxScroll = docHeight - windowHeight;

  const offset = 5; // margem de tolerância em pixels

  if (scrollY <= offset) {
    scrollUpBtn.classList.remove("show");
    scrollDownBtn.classList.add("show");
  } else if (scrollY >= maxScroll - offset) {
    scrollUpBtn.classList.add("show");
    scrollDownBtn.classList.remove("show");
  } else {
    scrollUpBtn.classList.add("show");
    scrollDownBtn.classList.add("show");
  }
};

// Atualiza ao carregar e ao rolar
window.addEventListener("scroll", toggleScrollButtons);
document.addEventListener("DOMContentLoaded", toggleScrollButtons);

// Scroll funcional
scrollUpBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
scrollDownBtn.addEventListener("click", () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});
