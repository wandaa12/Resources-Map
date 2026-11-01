/*
  Directory behavior
  ------------------
  Vanilla JavaScript keeps the project deployable on Netlify with no build
  process. State is intentionally small: search, category, bilingual and saved.
*/
(() => {
  const grid = document.querySelector("#resourceGrid");
  const template = document.querySelector("#resourceCardTemplate");
  const categoryFilters = document.querySelector("#categoryFilters");
  const searchInput = document.querySelector("#searchInput");
  const bilingualOnly = document.querySelector("#bilingualOnly");
  const resultSummary = document.querySelector("#resultSummary");
  const emptyState = document.querySelector("#emptyState");
  const savedCount = document.querySelector("#savedCount");
  const dialog = document.querySelector("#resourceDialog");
  const dialogContent = document.querySelector("#dialogContent");

  const state = {
    query: "",
    category: "All",
    bilingual: false,
    savedOnly: false,
    saved: new Set(JSON.parse(localStorage.getItem("everett-resource-saves") || "[]"))
  };

  // Normalize text once per comparison so a visitor can search across every field.
  const searchableText = resource => Object.values(resource)
    .flat()
    .join(" ")
    .toLowerCase();

  const visibleResources = () => RESOURCES.filter(resource => {
    const matchesQuery = !state.query || searchableText(resource).includes(state.query.toLowerCase());
    const matchesCategory = state.category === "All" || resource.categories.includes(state.category);
    const matchesLanguage = !state.bilingual || resource.bilingual;
    const matchesSaved = !state.savedOnly || state.saved.has(resource.id);
    return matchesQuery && matchesCategory && matchesLanguage && matchesSaved;
  });

  function renderCategoryFilters() {
    categoryFilters.replaceChildren(...CATEGORIES.map(category => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-button";
      button.textContent = category;
      button.dataset.category = category;
      button.setAttribute("aria-pressed", String(state.category === category));
      button.addEventListener("click", () => {
        state.category = category;
        state.savedOnly = false;
        render();
      });
      return button;
    }));
  }

  function iconText(text, fallback) {
    return text && text.trim() ? text : fallback;
  }

  function createCard(resource) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.id = resource.id;
    card.querySelector(".category-badge").textContent = resource.category;
    card.querySelector("h3").textContent = resource.name;
    card.querySelector(".card-summary").textContent = resource.summary;
    card.querySelector(".meta-location").textContent = resource.address;
    card.querySelector(".meta-hours").textContent = resource.hours;

    const tagContainer = card.querySelector(".card-tags");
    resource.tags.slice(0, 3).forEach(tag => {
      const item = document.createElement("span");
      item.textContent = tag;
      tagContainer.append(item);
    });

    const saveButton = card.querySelector(".save-button");
    updateSaveButton(saveButton, resource);
    saveButton.addEventListener("click", () => toggleSaved(resource, saveButton));

    card.querySelector(".details-button").addEventListener("click", () => openDetails(resource));
    const callButton = card.querySelector(".call-button");
    if (resource.phone) {
      callButton.href = `tel:${resource.phone.replace(/[^\d+]/g, "")}`;
    } else {
      callButton.textContent = "Website";
      callButton.href = resource.website;
      callButton.target = "_blank";
      callButton.rel = "noopener";
    }
    return card;
  }

  function updateSaveButton(button, resource) {
    const isSaved = state.saved.has(resource.id);
    button.classList.toggle("saved", isSaved);
    button.setAttribute("aria-label", `${isSaved ? "Remove" : "Save"} program: ${resource.name}`);
    button.setAttribute("aria-pressed", String(isSaved));
  }

  function toggleSaved(resource, button) {
    state.saved.has(resource.id) ? state.saved.delete(resource.id) : state.saved.add(resource.id);
    localStorage.setItem("everett-resource-saves", JSON.stringify([...state.saved]));
    updateSaveButton(button, resource);
    savedCount.textContent = state.saved.size;
    if (state.savedOnly) render();
  }

  // Detail content uses text interpolation only from the local curated dataset.
  function openDetails(resource) {
    const contactLinks = [
      resource.phone && `<a href="tel:${resource.phone.replace(/[^\d+]/g, "")}">Call ${resource.phone}</a>`,
      resource.email && `<a href="mailto:${resource.email}">Email</a>`,
      resource.website && `<a href="${resource.website}" target="_blank" rel="noopener">Official website ↗</a>`
    ].filter(Boolean).join("");

    dialogContent.innerHTML = `
      <div class="dialog-hero">
        <span class="category-badge">${resource.category}</span>
        <h2 id="dialogTitle">${resource.name}</h2>
        <p>${resource.summary}</p>
      </div>
      <div class="dialog-body">
        <div class="detail-contact">${contactLinks}</div>
        <div class="detail-grid">
          ${detailBlock("Location", resource.address)}
          ${detailBlock("Hours", resource.hours)}
          ${detailBlock("Services", resource.services)}
          ${detailBlock("Eligibility", resource.eligibility)}
          ${detailBlock("Who it serves", resource.population)}
          ${detailBlock("Accessibility", resource.accessibility)}
          ${detailBlock("Languages", resource.languages)}
          ${detailBlock("Referrals / next steps", resource.referrals)}
          ${detailBlock("Point of contact", resource.contact)}
        </div>
        <p class="source-note"><strong>Please confirm before visiting.</strong> Hours, eligibility, enrollment and language access can change. Use the official website or phone number above for current information.</p>
      </div>`;
    dialog.showModal();
  }

  function detailBlock(title, value) {
    return `<section class="detail-block"><h3>${title}</h3><p>${iconText(value, "Contact the provider for details.")}</p></section>`;
  }

  function render() {
    const resources = visibleResources();
    grid.replaceChildren(...resources.map(createCard));
    renderCategoryFilters();
    savedCount.textContent = state.saved.size;
    emptyState.hidden = resources.length !== 0;

    const mode = state.savedOnly ? "saved " : "";
    resultSummary.textContent = `Showing ${resources.length} ${mode}program${resources.length === 1 ? "" : "s"}`;

    // Newly rendered cards need a fresh reveal observer.
    observeReveals();
  }

  function resetFilters() {
    state.query = "";
    state.category = "All";
    state.bilingual = false;
    state.savedOnly = false;
    searchInput.value = "";
    bilingualOnly.checked = false;
    render();
  }

  document.querySelector("#heroSearch").addEventListener("submit", event => {
    event.preventDefault();
    state.query = searchInput.value.trim();
    state.savedOnly = false;
    render();
    document.querySelector("#directory").scrollIntoView({ behavior: "smooth" });
  });

  // Live search is debounced so typing stays responsive on older phones.
  let searchTimer;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = searchInput.value.trim();
      state.savedOnly = false;
      render();
    }, 160);
  });

  document.querySelectorAll("[data-quick]").forEach(button => button.addEventListener("click", () => {
    const value = button.dataset.quick;
    searchInput.value = "";
    state.query = "";
    state.category = value;
    state.savedOnly = false;
    render();
    document.querySelector("#directory").scrollIntoView({ behavior: "smooth" });
  }));

  bilingualOnly.addEventListener("change", () => {
    state.bilingual = bilingualOnly.checked;
    render();
  });

  document.querySelector("#savedNav").addEventListener("click", () => {
    state.savedOnly = !state.savedOnly;
    state.category = "All";
    render();
    document.querySelector("#directory").scrollIntoView({ behavior: "smooth" });
  });

  document.querySelector("#resetFilters").addEventListener("click", resetFilters);
  document.querySelector("#emptyReset").addEventListener("click", resetFilters);
  document.querySelector("#dialogClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  // IntersectionObserver avoids scroll-event work and disables itself gracefully.
  let revealObserver;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(item => item.classList.add("visible"));
      return;
    }
    revealObserver ||= new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal:not(.visible)").forEach(item => revealObserver.observe(item));
  }

  render();
  observeReveals();
})();
