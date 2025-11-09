const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-bar");
const links = document.querySelectorAll(".nav-bar a");

function toggleMenu() {
    const isOpen = menu.classList.toggle("open");
    document.body.classList.toggle("no-scroll", isOpen);

    hamburger.innerHTML = isOpen ? "&times;" : "&#9776;";
    hamburger.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

hamburger.addEventListener("click", toggleMenu);

links.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.contains("open") && toggleMenu();
    });
});
