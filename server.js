const API_URL = "https://projects-api-2.vercel.app/api/projects";
const select = document.querySelector("#Interest");
const container = document.querySelector(".card-grid");

fetch(API_URL)
.then((res) => res.json())
.then((projects) => {
    if (!container) return;

    const descriptions = [...new Set(projects.map((p) => p.description).filter(Boolean))];
    if (select) {
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Todos";
        select.appendChild(defaultOption);

        descriptions.forEach((desc) => {
            const option = document.createElement("option");
            option.value = desc;
            option.textContent = desc;
            select.appendChild(option);
        });
    }

    function renderCards(filter = "") {
        container.innerHTML = "";

        const filteredProjects = filter ? projects.filter((p) => p.description === filter) : projects;

        filteredProjects.forEach((project) => {
            const card = document.createElement("new-card");
            card.classList.add("reveal");

            card.setAttribute("img", project.image || "");
            card.setAttribute("title", project.title || "");
            card.setAttribute("tags", (project.tags || []).join(", "));
            card.setAttribute("description", project.description || "");

            const [link1, link2] = project.links || [];
            if (link1) {
                card.setAttribute("link1", link1.url || "");
                card.setAttribute("link1-text", link1.text || "");
            }
            if (link2) {
                card.setAttribute("link2", link2.url || "");
                card.setAttribute("link2-text", link2.text || "");
            }

            container.appendChild(card);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const filterFromUrl = urlParams.get("filter") || "";
    if (select) select.value = filterFromUrl;

    renderCards(filterFromUrl);

    if (select) {
        select.addEventListener("change", () => {
            const selected = select.value;

            const newUrl = new URL(window.location);
            if (selected) {
                newUrl.searchParams.set("filter", selected);
            } else {
                newUrl.searchParams.delete("filter");
            }
            window.history.pushState({}, "", newUrl);

            renderCards(selected);
            updateRevealElements();
        });
    }
});
