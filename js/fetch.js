const API_URL = "https://projects-api-2.vercel.app/api/projects";
const select = document.querySelector("#Scope");
const toolSelect = document.querySelector("#Topic");
const container = document.querySelector(".card-grid");
const BATCH_SIZE = 6;
let currentIndex = 0;
let currentFilter = "";
let currentTagFilter = "";
let isLoading = false;

fetch(API_URL)
  .then((res) => res.json())
  .then((projects) => {
    if (!container) return;

    const descriptions = [
      ...new Set(projects.map((p) => p.description).filter(Boolean)),
    ];
    const tags = [
      ...new Set(
        projects
          .flatMap((p) => Array.isArray(p.tags) ? p.tags : [])
          .map((t) => t && String(t).trim())
          .filter(Boolean)
      ),
    ];

    const getFilteredProjects = (filter = "", tagFilter = "") => {
      let filteredProjects = projects;

      if (filter) {
        filteredProjects = filteredProjects.filter((p) => p.description === filter);
      }

      if (tagFilter) {
        filteredProjects = filteredProjects.filter(
          (p) => Array.isArray(p.tags) && p.tags.includes(tagFilter)
        );
      }

      return filteredProjects;
    };

    const updateSelectOptions = (selectElement, values, selectedValue = "") => {
      if (!selectElement) return "";

      selectElement.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "All";
      selectElement.appendChild(defaultOption);

      values.forEach((value) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        selectElement.appendChild(option);
      });

      const isSelectionAvailable = !selectedValue || values.includes(selectedValue);
      selectElement.value = isSelectionAvailable ? selectedValue : "";
      return selectElement.value;
    };

    const updateUrlWithCurrentFilters = () => {
      const newUrl = new URL(window.location);
      currentFilter
        ? newUrl.searchParams.set("filter", currentFilter)
        : newUrl.searchParams.delete("filter");
      currentTagFilter
        ? newUrl.searchParams.set("tag", currentTagFilter)
        : newUrl.searchParams.delete("tag");
      window.history.pushState({}, "", newUrl);
    };

    const syncFilterOptions = () => {
      const descriptionsWithMatch = descriptions.filter((description) =>
        getFilteredProjects(description, currentTagFilter).length > 0
      );
      const tagsWithMatch = tags.filter(
        (tag) => getFilteredProjects(currentFilter, tag).length > 0
      );

      currentFilter = updateSelectOptions(select, descriptionsWithMatch, currentFilter);
      currentTagFilter = updateSelectOptions(toolSelect, tagsWithMatch, currentTagFilter);
    };

    function renderCards(filter = "", tagFilter = "", append = false) {
      !append ? ((container.innerHTML = ""), (currentIndex = 0)) : null;

      let filteredProjects = projects;
      
      if (filter) {
        filteredProjects = filteredProjects.filter((p) => p.description === filter);
      }
      
      if (tagFilter) {
        filteredProjects = filteredProjects.filter((p) => 
          Array.isArray(p.tags) && p.tags.includes(tagFilter)
        );
      }
      const nextProjects = filteredProjects.slice(
        currentIndex,
        currentIndex + BATCH_SIZE
      );

      nextProjects.forEach((project) => {
        const card = document.createElement("new-card");

        card.setAttribute("img", project.image || "");
        card.setAttribute("title", project.title || "");
        card.setAttribute("tags", (project.tags || []).join(", "));
        card.setAttribute("description", project.description || "");

        const [link1, link2] = project.links || [];
        link1
          ? (card.setAttribute("link1", link1.url || ""),
            card.setAttribute("link1-text", link1.text || ""))
          : null;

        link2
          ? (card.setAttribute("link2", link2.url || ""),
            card.setAttribute("link2-text", link2.text || ""))
          : null;

        container.appendChild(card);
      });
      currentIndex += nextProjects.length;
      console.log("currentIndex after render:", currentIndex);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const filterFromUrl = urlParams.get("filter") || "";
    const tagFromUrl = urlParams.get("tag") || "";

    currentFilter = filterFromUrl;
    currentTagFilter = tagFromUrl;
    syncFilterOptions();
    updateUrlWithCurrentFilters();

    if (select) {
      select.addEventListener("change", () => {
        const selected = select.value;
        console.log("Filter changed to:", selected);

        currentFilter = selected;
        syncFilterOptions();
        updateUrlWithCurrentFilters();
        renderCards(currentFilter, currentTagFilter);
        updateRevealElements();
      });
    }
    
    if (toolSelect) {
      toolSelect.addEventListener("change", () => {
        const selectedTag = toolSelect.value;
        console.log("Tag filter changed to:", selectedTag);

        currentTagFilter = selectedTag;
        syncFilterOptions();
        updateUrlWithCurrentFilters();
        renderCards(currentFilter, currentTagFilter);
        updateRevealElements();
      });
    }
    const loadMore = () => {
      if (isLoading) return;

      const filteredProjects = getFilteredProjects(currentFilter, currentTagFilter);

      if (currentIndex >= filteredProjects.length) {
        console.log("No more projects to load");
        return;
      }

      console.log("Loading next batch", { currentIndex, BATCH_SIZE });
      isLoading = true;

      renderCards(currentFilter, currentTagFilter, true);

      setTimeout(() => {
        isLoading = false;
        console.log("Batch loaded, currentIndex now", currentIndex);
      }, 50);
    };

    renderCards(currentFilter, currentTagFilter);

    const loadMoreOnPageScroll = () => {
      const threshold = 220;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold;

      if (nearBottom) {
        console.log("Near end of page, loading more");
        loadMore();
      }
    };

    window.addEventListener("scroll", loadMoreOnPageScroll, { passive: true });
    window.addEventListener("resize", loadMoreOnPageScroll);

    setTimeout(loadMoreOnPageScroll, 100);
  });
