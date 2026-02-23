const elements = ["scrollUp", "scrollDown"].map((cls) =>
    document.querySelector(`.${cls}`)
);
const [scrollUpBtn, scrollDownBtn] = elements

const scrollContainer = document.querySelector(".card-grid")
// Include About section by id `#about` between header and main
const sections = ["header", "#about", "main", "footer"].map((sel) => document.querySelector(sel)).filter(Boolean)
const header = sections[0]

const revealElements = document.querySelectorAll(".reveal")
const revealOnLoadElements = document.querySelectorAll(".reveal-on-load")

const OFFSET = 80

const toggle = (el, condition) => el.classList.toggle("show", condition)

const getActiveSectionIndex = () => {
    const midScreen = window.scrollY + window.innerHeight / 2
    let idx = 0
    for (let i = 0; i < sections.length; i++) {
        const sec = sections[i]
        const top = sec.offsetTop - OFFSET
        const bottom = top + sec.offsetHeight
        if (midScreen >= top && midScreen < bottom) {
            idx = i
            break
        }
    }
    return idx
}

const toggleScrollButtons = () => {
    if (!scrollUpBtn || !scrollDownBtn || sections.length === 0) return;
    const idx = getActiveSectionIndex();
    toggle(scrollUpBtn, idx > 0)
    toggle(scrollDownBtn, idx < sections.length - 1)
};

["scroll", "resize"].forEach((event) => window.addEventListener(event, toggleScrollButtons))
document.addEventListener("DOMContentLoaded", toggleScrollButtons)

const scrollToSection = (section) => window.scrollTo({top: section.offsetTop - OFFSET, behavior: "smooth"})

scrollUpBtn.addEventListener("click", () => {
    const idx = getActiveSectionIndex();
    const prevIdx = Math.max(0, idx - 1);
    scrollToSection(sections[prevIdx]);
});

scrollDownBtn.addEventListener("click", () => {
    const idx = getActiveSectionIndex();
    const nextIdx = Math.min(sections.length - 1, idx + 1);
    scrollToSection(sections[nextIdx]);
});

const isInViewport = (el, triggerFactor = 0.85) => {
    const rect = el.getBoundingClientRect()
    const triggerPoint = window.innerHeight * triggerFactor
    return rect.top < triggerPoint && rect.bottom > 0
};

const updateRevealElements = () => {
    const revealElements = document.querySelectorAll(".reveal")
    revealElements.forEach((el) => el.classList.toggle("active", isInViewport(el)))
};

const activateOnLoadElements = () => {
    setTimeout(() => {
        revealOnLoadElements.forEach((el) => el.classList.add("active"))
    }, 200);
};

window.addEventListener("scroll", updateRevealElements)
window.addEventListener("load", () => {
    updateRevealElements()
    activateOnLoadElements()
})
