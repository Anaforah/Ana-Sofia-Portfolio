class NewCard extends HTMLElement {
    static get observedAttributes() {
        return ["img", "title", "tags", "description", "link1", "link1-text", "link2", "link2-text"];
    }

    constructor() {
        super()

        this.shadow = this.attachShadow({mode: "open"})

        this.wrapper = document.createElement("article")
        this.wrapper.classList.add("card")

        const cardCSS = document.createElement("link")
        cardCSS.rel = "stylesheet"
        cardCSS.href = "card.css"

        this.shadow.append(cardCSS, this.wrapper)
    }

    connectedCallback() {
        this.render()
    }

    attributeChangedCallback() {
        if (this.isConnected) this.render()
    }

    render() {
        const imgSrc = this.getAttribute("img") || ""
        const title = this.getAttribute("title") || ""
        const tags = (this.getAttribute("tags") || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        const description = this.getAttribute("description") || ""
        const link1 = this.getAttribute("link1") || "";
        const link1Text = this.getAttribute("link1-text") || ""
        const link2 = this.getAttribute("link2") || "";
        const link2Text = this.getAttribute("link2-text") || ""

        if (!this.wrapper) return;

        this.wrapper.innerHTML = `
      ${imgSrc ? `<img src="${imgSrc}" alt="${title}">` : ""}
      <div class="content">
        <div class="title-tags-container">
          <h2>${title}</h2>
          <div class="tags">
            ${tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </div>
        <div class="description">
          <small>${description}</small>
        </div>
        <div class="buttons">
          ${link1 ? `<a href="${link1}" target="_blank">${link1Text}</a>` : ""}
          ${link2 ? `<a href="${link2}" target="_blank" class="secondary">${link2Text}</a>` : ""}
        </div>
      </div>
    `;
    }
}

customElements.define("new-card", NewCard)
