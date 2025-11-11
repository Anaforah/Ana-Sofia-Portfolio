const API_URL = "https://projects-api-2.vercel.app/api/projects"
const select = document.querySelector("#Interest")
const container = document.querySelector(".card-grid")
const BATCH_SIZE = 3
let currentIndex = 0
let currentFilter = ""
let isLoading = false

fetch(API_URL)
.then((res) => res.json())
.then((projects) => {
    if (!container) return

    const descriptions = [...new Set(projects.map((p) => p.description).filter(Boolean))]
    if (select) {
        const defaultOption = document.createElement("option")
        defaultOption.value = ""
        defaultOption.textContent = "All"
        select.appendChild(defaultOption)

        descriptions.forEach((desc) => {
            const option = document.createElement("option")
            option.value = desc
            option.textContent = desc
            select.appendChild(option)
        });
    }

    function renderCards(filter = "", append = false) {
      !append ? (container.innerHTML = "", currentIndex = 0) : null
      
        const filteredProjects = filter ? projects.filter((p) => p.description === filter) : projects
        const nextProjects = filteredProjects.slice(currentIndex, currentIndex + BATCH_SIZE)

        nextProjects.forEach((project) => {
            const card = document.createElement("new-card")

            card.setAttribute("img", project.image || "")
            card.setAttribute("title", project.title || "")
            card.setAttribute("tags", (project.tags || []).join(", "))
            card.setAttribute("description", project.description || "")

            const [link1, link2] = project.links || []
            link1
            ? (card.setAttribute("link1", link1.url || ""),
        card.setAttribute("link1-text", link1.text || ""))
        : null

          link2
          ? (card.setAttribute("link2", link2.url || ""),
          card.setAttribute("link2-text", link2.text || ""))
          : null

            container.appendChild(card)
        });
        currentIndex += nextProjects.length
        console.log("currentIndex after render:", currentIndex)
    }

    const urlParams = new URLSearchParams(window.location.search)
    const filterFromUrl = urlParams.get("filter") || ""
    select ? (select.value = filterFromUrl) : null

    currentFilter = filterFromUrl
    renderCards(filterFromUrl)

    if (select) {
        select.addEventListener("change", () => {
            const selected = select.value
            console.log("Filter changed to:", selected)
            const newUrl = new URL(window.location)
            selected ? newUrl.searchParams.set("filter", selected) : newUrl.searchParams.delete("filter")
            window.history.pushState({}, "", newUrl)

            currentFilter = selected
            renderCards(currentFilter)
            updateRevealElements()
        });
    }
    const loadMore = () => {
      if (isLoading) return
    
      const filteredProjects = currentFilter
        ? projects.filter((p) => p.description === currentFilter)
        : projects
    
      if (currentIndex >= filteredProjects.length) {
        console.log("No more projects to load")
        return
      }
    
      console.log("Loading next batch", { currentIndex, BATCH_SIZE })
      isLoading = true
    
      renderCards(currentFilter, true)
    
      setTimeout(() => {
        isLoading = false
        console.log("Batch loaded, currentIndex now", currentIndex)
      }, 50)
    }
    
    renderCards(currentFilter);
    
    container.addEventListener("scroll", () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth /2) {
        console.log("Near end of scroll, loading more")
        loadMore()
      }
    })
    
  })