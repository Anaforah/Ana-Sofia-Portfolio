const elements = ["scrollUp", "scrollDown", "scrollLeft", "scrollRight"].map((cls) =>
    document.querySelector(`.${cls}`)
);
const [scrollUpBtn, scrollDownBtn, scrollLeftBtn, scrollRightBtn] = elements;

const scrollContainer = document.querySelector(".card-grid");
const sections = ["header", "main", "footer"].map((sel) => document.querySelector(sel));
const [header, main, footer] = sections;

const revealElements = document.querySelectorAll(".reveal");
const revealOnLoadElements = document.querySelectorAll(".reveal-on-load");

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
    state === "footer" ? scrollToSection(main) : scrollToSection(header);
});

scrollDownBtn.addEventListener("click", () => {
    const state = getScrollState();
    state === "header" ? scrollToSection(main) : scrollToSection(footer);
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

const isInViewport = (el, triggerFactor = 0.85) => {
    const rect = el.getBoundingClientRect();
    const triggerPoint = window.innerHeight * triggerFactor;
    return rect.top < triggerPoint && rect.bottom > 0;
};

const updateRevealElements = () => {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => el.classList.toggle("active", isInViewport(el)));
};

const activateOnLoadElements = () => {
    setTimeout(() => {
        revealOnLoadElements.forEach((el) => el.classList.add("active"));
    }, 200);
};

window.addEventListener("scroll", updateRevealElements);
window.addEventListener("load", () => {
    updateRevealElements();
    activateOnLoadElements();
});
