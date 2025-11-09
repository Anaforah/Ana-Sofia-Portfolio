const elements = ["scrollUp", "scrollDown", "scrollLeft", "scrollRight"].map((cls) =>
    document.querySelector(`.${cls}`)
);
const [scrollUpBtn, scrollDownBtn, scrollLeftBtn, scrollRightBtn] = elements;

const scrollContainer = document.querySelector(".card-grid");
const sections = ["header", "main", "footer"].map((sel) => document.querySelector(sel));
const [header, main, footer] = sections;

const OFFSET = 80;

const toggle = (el, condition) => el.classList.toggle("show", condition);

const getScrollState = () => {
    const scrollY = window.scrollY;
    const mainTop = main.offsetTop - OFFSET;
    const footerTop = footer.offsetTop - OFFSET;

    return scrollY < mainTop ? "header" : scrollY < footerTop - window.innerHeight / 2 ? "main" : "footer";
};

const toggleScrollButtons = () => {
    const state = getScrollState();
    toggle(scrollUpBtn, state !== "header");
    toggle(scrollDownBtn, state !== "footer");
};

["scroll", "resize"].forEach((event) => window.addEventListener(event, toggleScrollButtons));
document.addEventListener("DOMContentLoaded", toggleScrollButtons);

const scrollToSection = (section) => window.scrollTo({top: section.offsetTop - OFFSET, behavior: "smooth"});

scrollUpBtn.addEventListener("click", () => {
    const state = getScrollState();
    if (state === "footer") {
        scrollToSection(main);
    } else {
        scrollToSection(header);
    }
});

scrollDownBtn.addEventListener("click", () => {
    const state = getScrollState();
    if (state === "header") {
        scrollToSection(main);
    } else {
        scrollToSection(footer);
    }
});

const scrollByAmount = (dir) =>
    scrollContainer.scrollBy({
        left: dir * scrollContainer.clientWidth * 0.9,
        behavior: "smooth",
    });

scrollLeftBtn.addEventListener("click", () => scrollByAmount(-1));
scrollRightBtn.addEventListener("click", () => scrollByAmount(1));

const updateHorizontalButtons = () => {
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    toggle(scrollLeftBtn, scrollContainer.scrollLeft > 0);
    toggle(scrollRightBtn, scrollContainer.scrollLeft < maxScrollLeft - 5);
};

scrollContainer.addEventListener("scroll", updateHorizontalButtons);
scrollContainer.addEventListener("resize", updateHorizontalButtons);

window.addEventListener("load", () => setTimeout(updateHorizontalButtons, 200));
scrollContainer.querySelectorAll("img").forEach((img) => img.addEventListener("load", updateHorizontalButtons));
