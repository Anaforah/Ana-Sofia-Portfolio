const hamburger = document.querySelector(".hamburger")
const menu = document.querySelector(".nav-bar")
const links = document.querySelectorAll(".nav-bar a")
const filtersToggle = document.querySelector(".filters-toggle")
const filtersModal = document.querySelector(".form-controllers-container")
const filtersClose = document.querySelector(".filters-close")
const filtersOverlay = document.querySelector(".filters-overlay")
const DESKTOP_BREAKPOINT = 1024

const isElementOpen = (element) => element?.classList.contains("open")

function updateBodyScroll() {
    const menuOpen = isElementOpen(menu)
    const filtersOpen = isElementOpen(filtersModal)
    document.body.classList.toggle("no-scroll", Boolean(menuOpen || filtersOpen))
}

function toggleMenu(forceState) {
    if (!menu || !hamburger) return
    const shouldOpen = typeof forceState === "boolean" ? forceState : !isElementOpen(menu)
    menu.classList.toggle("open", shouldOpen)
    hamburger.innerHTML = shouldOpen ? "&times;" : "&#9776;"
    hamburger.setAttribute("aria-label", shouldOpen ? "Fechar menu" : "Abrir menu")
    hamburger.classList.toggle("active", shouldOpen)
    updateBodyScroll()
}

function toggleFilters(forceState) {
    if (!filtersModal) return
    const shouldOpen = typeof forceState === "boolean" ? forceState : !isElementOpen(filtersModal)
    filtersModal.classList.toggle("open", shouldOpen)
    filtersModal.setAttribute("aria-hidden", shouldOpen ? "false" : "true")
    if (filtersToggle) {
        filtersToggle.classList.toggle("active", shouldOpen)
        filtersToggle.setAttribute("aria-label", shouldOpen ? "Fechar filtros" : "Abrir filtros")
        filtersToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false")
    }
    filtersOverlay?.classList.toggle("open", shouldOpen)
    filtersOverlay?.setAttribute("aria-hidden", shouldOpen ? "false" : "true")
    updateBodyScroll()
}

function syncFiltersToViewport() {
    if (!filtersModal) return
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        filtersModal.classList.remove("open")
        filtersModal.setAttribute("aria-hidden", "false")
        filtersToggle?.classList.remove("active")
        filtersToggle?.setAttribute("aria-expanded", "false")
        filtersOverlay?.classList.remove("open")
        filtersOverlay?.setAttribute("aria-hidden", "true")
    } else if (!isElementOpen(filtersModal)) {
        filtersModal.setAttribute("aria-hidden", "true")
        filtersOverlay?.classList.remove("open")
        filtersOverlay?.setAttribute("aria-hidden", "true")
    }
    updateBodyScroll()
}

hamburger?.addEventListener("click", () => toggleMenu())

links.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false))
})

filtersToggle?.addEventListener("click", () => toggleFilters())
filtersClose?.addEventListener("click", () => toggleFilters(false))
filtersOverlay?.addEventListener("click", () => toggleFilters(false))

window.addEventListener("resize", syncFiltersToViewport)
syncFiltersToViewport()
