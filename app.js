/*
  Directory behavior
  ------------------
  The build-free site handles search, filters, mapping, saved programs,
  translation, sharing and the program matcher entirely in the browser.
*/
(() => {
  const TEXT = {
    en: {
      skip: "Skip to resource directory", brandSubtitle: "Workforce Guide", navFind: "Find programs", navHow: "How it works", saved: "Saved",
      heroEyebrow: "Everett workforce directory", heroTitle: "Find workforce support in Everett.", heroCopy: "Explore job-search help, career training, English and GED programs, youth employment and worker advocacy in one clear guide.",
      searchLabel: "Search by service, organization, or need", searchPlaceholder: "Try “English classes” or “job training”", searchButton: "Search", popular: "Popular:", catJob: "Job search", catTraining: "Training", catEducation: "Education", catYouth: "Youth jobs",
      startGoal: "Start with your goal", goalJob: "Find a job", goalJobSub: "Applications and career coaching", goalSkills: "Build new skills", goalSkillsSub: "Credentials and workforce training", goalEducation: "Learn English or earn a GED", goalEducationShort: "English or GED", goalEducationSub: "Adult education programs", goalSupport: "Get worker support", goalSupportSub: "Rights, advocacy and navigation",
      matcherLaunch: "Not sure where to start? Find my program", statPrograms: "Workforce programs", statCategories: "Workforce categories", statFree: "Free", statAccount: "No account required", callAhead: "Call ahead: hours and eligibility can change.",
      browse: "Browse programs", directoryTitle: "Choose your next step.", directoryCopy: "Filter by your workforce goal. Open any program for eligibility, accessibility, languages and contact details.",
      audience: "Audience", allAges: "All ages", youth: "Youth", adults: "Adults", format: "Format", anyFormat: "Any format", inPerson: "In person", online: "Online", freePrograms: "Free programs", englishClasses: "English classes",
      list: "List", map: "Map", reset: "Reset filters", noMatches: "No exact matches", noMatchesCopy: "Try a broader search or reset the filters.", showAll: "Show all programs",
      matcherEyebrow: "Program matcher", matcherTitle: "Find a good place to start.", matcherIntro: "Answer three short questions. You can change the filters afterward.", matcherSelectMany: "Select all that apply in each section.", matcherGoal: "What are your goals?", matcherAge: "Who are the programs for?", matcherFormat: "How would you prefer to participate?", showMatches: "Show my matches", matcherSelectError: "Choose at least one option in each section.",
      viewDetails: "View details", call: "Call", website: "Website", directions: "Directions", save: "Save", remove: "Remove", program: "program", reviewed: "Record reviewed", share: "Share", print: "Print", linkCopied: "Program link copied.", shareUnavailable: "Copy this page address to share the program.",
      location: "Location", hours: "Hours", services: "Services", eligibility: "Eligibility", serves: "Who it serves", accessibility: "Accessibility", languages: "Languages", referrals: "Referrals / next steps", contact: "Point of contact",
      confirmTitle: "Please confirm before visiting.", confirmCopy: "Hours, eligibility, enrollment and language access can change. Use the official website or phone number above for current information.", mapFailed: "The interactive map could not load. Use list view to browse programs.",
      howEyebrow: "Use the guide", howTitle: "Plan your next move.", howCopy: "Compare programs, review requirements and contact the provider before applying.", step1: "Search your goal", step1Copy: "Use everyday words like “job,” “training,” “English” or “GED.”", step2: "Review the details", step2Copy: "Check who the program serves, hours, languages and accessibility.", step3: "Call before visiting", step3Copy: "Confirm availability and documents you may need before you travel.",
      footerTitle: "Everett Workforce Guide", footerBuilt: "A student-built workforce directory.", footerNote: "Information was compiled from project documents and provider websites. Program hours, eligibility and enrollment can change, so contact the provider before applying or visiting.", projectNotes: "Project notes", email: "Email"
    },
    es: {
      skip: "Ir al directorio de recursos", brandSubtitle: "Guía de Empleo", navFind: "Buscar programas", navHow: "Cómo funciona", saved: "Guardados",
      heroEyebrow: "Directorio laboral de Everett", heroTitle: "Encuentre apoyo laboral en Everett.", heroCopy: "Encuentre opciones de apoyo para buscar empleo, capacitación profesional, clases de inglés y preparación para el GED, empleo juvenil y defensa de los derechos laborales, todo en una guía clara.",
      searchLabel: "Buscar por servicio, organización o necesidad", searchPlaceholder: "Pruebe “clases de inglés” o “capacitación laboral”", searchButton: "Buscar", popular: "Popular:", catJob: "Búsqueda de empleo", catTraining: "Capacitación", catEducation: "Educación", catYouth: "Empleo juvenil",
      startGoal: "Comience con su meta", goalJob: "Buscar empleo", goalJobSub: "Solicitudes y orientación profesional", goalSkills: "Desarrollar habilidades", goalSkillsSub: "Credenciales y capacitación laboral", goalEducation: "Aprender inglés u obtener un GED", goalEducationShort: "Inglés o GED", goalEducationSub: "Programas de educación para adultos", goalSupport: "Recibir apoyo para trabajadores", goalSupportSub: "Derechos, defensa y orientación",
      matcherLaunch: "¿No sabe por dónde empezar? Buscar programas recomendados", statPrograms: "Programas laborales", statCategories: "Categorías laborales", statFree: "Gratis", statAccount: "No necesita una cuenta", callAhead: "Llame antes: los horarios y requisitos pueden cambiar.",
      browse: "Ver programas", directoryTitle: "Encuentre su próximo paso.", directoryCopy: "Filtre según su meta laboral. Abra un programa para ver requisitos, accesibilidad, idiomas e información de contacto.",
      audience: "Grupo de edad", allAges: "Todas las edades", youth: "Jóvenes", adults: "Adultos", format: "Modalidad", anyFormat: "Cualquier modalidad", inPerson: "Presencial", online: "En línea", freePrograms: "Programas gratuitos", englishClasses: "Clases de inglés",
      list: "Lista", map: "Mapa", reset: "Restablecer filtros", noMatches: "No hay coincidencias exactas", noMatchesCopy: "Pruebe una búsqueda más amplia o restablezca los filtros.", showAll: "Ver todos los programas",
      matcherEyebrow: "Recomendador de programas", matcherTitle: "Encuentre un buen lugar para comenzar.", matcherIntro: "Responda tres preguntas breves. Después puede cambiar los filtros.", matcherSelectMany: "Seleccione todas las opciones que correspondan en cada sección.", matcherGoal: "¿Cuáles son sus metas?", matcherAge: "¿Para quién son los programas?", matcherFormat: "¿Cómo prefiere participar?", showMatches: "Ver programas recomendados", matcherSelectError: "Seleccione al menos una opción en cada sección.",
      viewDetails: "Ver detalles", call: "Llamar", website: "Sitio web", directions: "Cómo llegar", save: "Guardar", remove: "Quitar", program: "programa", reviewed: "Registro revisado", share: "Compartir", print: "Imprimir", linkCopied: "Enlace del programa copiado.", shareUnavailable: "Copie la dirección de esta página para compartir el programa.",
      location: "Ubicación", hours: "Horario", services: "Servicios", eligibility: "Elegibilidad", serves: "A quién atiende", accessibility: "Accesibilidad", languages: "Idiomas", referrals: "Referencias / próximos pasos", contact: "Punto de contacto",
      confirmTitle: "Confirme antes de visitar.", confirmCopy: "Los horarios, la elegibilidad, la inscripción y el acceso lingüístico pueden cambiar. Use el sitio oficial o el teléfono para obtener información actual.", mapFailed: "El mapa interactivo no pudo cargarse. Use la vista de lista para explorar los programas.",
      howEyebrow: "Use la guía", howTitle: "Planifique su próximo paso.", howCopy: "Compare programas, revise los requisitos y comuníquese con el proveedor antes de solicitar.", step1: "Busque su meta", step1Copy: "Use palabras comunes como “empleo”, “capacitación”, “inglés” o “GED”.", step2: "Revise los detalles", step2Copy: "Compruebe a quién atiende, los horarios, los idiomas y la accesibilidad.", step3: "Llame antes de visitar", step3Copy: "Confirme la disponibilidad y los documentos necesarios antes de viajar.",
      footerTitle: "Guía de Empleo de Everett", footerBuilt: "Un directorio laboral creado por estudiantes.", footerNote: "La información se recopiló de documentos del proyecto y sitios web de proveedores. Los horarios, la elegibilidad y la inscripción pueden cambiar; comuníquese con el proveedor antes de solicitar o visitar.", projectNotes: "Notas del proyecto", email: "Correo electrónico"
    }
  };

  const CATEGORY_LABELS = {
    en: { All: "All", "Job Search": "Job Search", Training: "Training", Education: "Education", "Youth Jobs": "Youth Jobs", "Worker Support": "Worker Support", "City Jobs": "City Jobs" },
    es: { All: "Todos", "Job Search": "Búsqueda de empleo", Training: "Capacitación", Education: "Educación", "Youth Jobs": "Empleo juvenil", "Worker Support": "Apoyo laboral", "City Jobs": "Empleos municipales" }
  };

  const $ = selector => document.querySelector(selector);
  const grid = $("#resourceGrid");
  const template = $("#resourceCardTemplate");
  const categoryFilters = $("#categoryFilters");
  const searchInput = $("#searchInput");
  const audienceFilter = $("#audienceFilter");
  const formatFilter = $("#formatFilter");
  const freeOnly = $("#freeOnly");
  const englishClassesOnly = $("#englishClassesOnly");
  const resultSummary = $("#resultSummary");
  const emptyState = $("#emptyState");
  const savedCount = $("#savedCount");
  const dialog = $("#resourceDialog");
  const dialogContent = $("#dialogContent");
  const matcherDialog = $("#matcherDialog");
  const matcherForm = $("#matcherForm");
  const mapView = $("#mapView");
  const mapInfo = $("#mapInfo");
  const listViewButton = $("#listViewButton");
  const mapViewButton = $("#mapViewButton");

  const state = {
    query: "", categories: new Set(["All"]), audience: "all", format: "all", freeOnly: false,
    englishClassesOnly: false, savedOnly: false, view: "list",
    lang: localStorage.getItem("everett-language") === "es" ? "es" : "en",
    saved: new Set(JSON.parse(localStorage.getItem("everett-resource-saves") || "[]"))
  };

  let resourceMap;
  let markerLayer;
  let currentResource;

  const t = key => TEXT[state.lang][key] || TEXT.en[key] || key;
  const localize = (resource, field) => state.lang === "es" && resource.translations?.es?.[field] ? resource.translations.es[field] : resource[field];
  const categoryLabel = category => CATEGORY_LABELS[state.lang][category] || category;
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
  const directionsUrl = resource => resource.coordinates ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(resource.address)}` : "";
  const reviewDate = resource => new Intl.DateTimeFormat(state.lang === "es" ? "es-US" : "en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${resource.verified}T12:00:00`));

  // Search indexes English and Spanish so switching languages preserves results.
  const searchableText = resource => [resource.name, resource.address, resource.summary, resource.services, resource.eligibility, resource.population, resource.hours, resource.languages, resource.tags, ...Object.values(resource.translations?.es || {})].flat().join(" ").toLowerCase();

  const visibleResources = () => RESOURCES.filter(resource => {
    const matchesQuery = !state.query || searchableText(resource).includes(state.query.toLowerCase());
    const matchesCategory = state.categories.has("All") || resource.categories.some(category => state.categories.has(category));
    const matchesAudience = state.audience === "all" || resource.audiences.includes(state.audience);
    const matchesFormat = state.format === "all" || resource.formats.includes(state.format);
    const matchesFree = !state.freeOnly || resource.free;
    const matchesEnglish = !state.englishClassesOnly || resource.englishLearning;
    const matchesSaved = !state.savedOnly || state.saved.has(resource.id);
    return matchesQuery && matchesCategory && matchesAudience && matchesFormat && matchesFree && matchesEnglish && matchesSaved;
  });

  function renderCategoryFilters() {
    categoryFilters.replaceChildren(...CATEGORIES.map(category => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-button";
      button.textContent = categoryLabel(category);
      button.dataset.category = category;
      button.setAttribute("aria-pressed", String(state.categories.has(category)));
      button.addEventListener("click", () => { state.categories = new Set([category]); state.savedOnly = false; render(); });
      return button;
    }));
  }

  function createCard(resource) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.id = resource.id;
    card.querySelector(".category-badge").textContent = categoryLabel(resource.category);
    card.querySelector("h3").textContent = resource.name;
    card.querySelector(".card-summary").textContent = localize(resource, "summary");
    card.querySelector(".meta-location").textContent = localize(resource, "address");
    card.querySelector(".meta-hours").textContent = localize(resource, "hours");
    card.querySelector(".card-verified").textContent = `${t("reviewed")} ${reviewDate(resource)}`;
    const tagContainer = card.querySelector(".card-tags");
    localize(resource, "tags").slice(0, 3).forEach(tag => { const item = document.createElement("span"); item.textContent = tag; tagContainer.append(item); });

    const saveButton = card.querySelector(".save-button");
    updateSaveButton(saveButton, resource);
    saveButton.addEventListener("click", () => toggleSaved(resource, saveButton));
    card.querySelector(".details-label").textContent = t("viewDetails");
    card.querySelector(".details-button").addEventListener("click", () => openDetails(resource));

    const callButton = card.querySelector(".call-button");
    if (resource.phone) { callButton.textContent = t("call"); callButton.href = `tel:${resource.phone.replace(/[^\d+]/g, "")}`; }
    else { callButton.textContent = t("website"); callButton.href = resource.website; callButton.target = "_blank"; callButton.rel = "noopener"; }
    const directionsButton = card.querySelector(".directions-button");
    const route = directionsUrl(resource);
    if (route) { directionsButton.href = route; directionsButton.textContent = t("directions"); }
    else directionsButton.hidden = true;
    return card;
  }

  function updateSaveButton(button, resource) {
    const isSaved = state.saved.has(resource.id);
    button.classList.toggle("saved", isSaved);
    button.setAttribute("aria-label", `${isSaved ? t("remove") : t("save")} ${t("program")}: ${resource.name}`);
    button.setAttribute("aria-pressed", String(isSaved));
  }

  function toggleSaved(resource, button) {
    state.saved.has(resource.id) ? state.saved.delete(resource.id) : state.saved.add(resource.id);
    localStorage.setItem("everett-resource-saves", JSON.stringify([...state.saved]));
    updateSaveButton(button, resource);
    savedCount.textContent = state.saved.size;
    if (state.savedOnly) render();
  }

  function detailBlock(title, value) {
    return `<section class="detail-block"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(value || "—")}</p></section>`;
  }

  function openDetails(resource, updateHash = true) {
    currentResource = resource;
    const route = directionsUrl(resource);
    const contactLinks = [
      resource.phone && `<a href="tel:${resource.phone.replace(/[^\d+]/g, "")}">${escapeHtml(t("call"))} ${escapeHtml(resource.phone)}</a>`,
      resource.email && `<a href="mailto:${escapeHtml(resource.email)}">${escapeHtml(t("email"))}</a>`,
      resource.website && `<a href="${escapeHtml(resource.website)}" target="_blank" rel="noopener">${escapeHtml(t("website"))} ↗</a>`,
      route && `<a href="${route}" target="_blank" rel="noopener">${escapeHtml(t("directions"))} ↗</a>`
    ].filter(Boolean).join("");
    dialogContent.innerHTML = `
      <div class="dialog-hero"><span class="category-badge">${escapeHtml(categoryLabel(resource.category))}</span><h2 id="dialogTitle">${escapeHtml(resource.name)}</h2><p>${escapeHtml(localize(resource, "summary"))}</p></div>
      <div class="dialog-body"><div class="detail-contact">${contactLinks}<button type="button" id="shareProgram">${escapeHtml(t("share"))}</button><button type="button" id="printProgram">${escapeHtml(t("print"))}</button></div><p class="share-status" id="shareStatus" aria-live="polite"></p>
        <div class="detail-grid">${detailBlock(t("location"), localize(resource, "address"))}${detailBlock(t("hours"), localize(resource, "hours"))}${detailBlock(t("services"), localize(resource, "services"))}${detailBlock(t("eligibility"), localize(resource, "eligibility"))}${detailBlock(t("serves"), localize(resource, "population"))}${detailBlock(t("accessibility"), localize(resource, "accessibility"))}${detailBlock(t("languages"), localize(resource, "languages"))}${detailBlock(t("referrals"), localize(resource, "referrals"))}${detailBlock(t("contact"), localize(resource, "contact"))}</div>
        <p class="review-date">${escapeHtml(t("reviewed"))}: <strong>${escapeHtml(reviewDate(resource))}</strong></p><p class="source-note"><strong>${escapeHtml(t("confirmTitle"))}</strong> ${escapeHtml(t("confirmCopy"))}</p></div>`;
    $("#shareProgram").addEventListener("click", () => shareProgram(resource));
    $("#printProgram").addEventListener("click", () => window.print());
    if (updateHash) history.replaceState(null, "", `${location.pathname}${location.search}#program=${resource.id}`);
    if (!dialog.open) dialog.showModal();
  }

  async function shareProgram(resource) {
    const status = $("#shareStatus");
    const url = new URL(location.href);
    url.hash = `program=${resource.id}`;
    try {
      if (navigator.share) await navigator.share({ title: resource.name, text: localize(resource, "summary"), url: url.href });
      else { await navigator.clipboard.writeText(url.href); status.textContent = t("linkCopied"); }
    } catch (error) { if (error.name !== "AbortError") status.textContent = t("shareUnavailable"); }
  }

  function closeDetails() {
    if (dialog.open) dialog.close();
    currentResource = null;
    if (location.hash.startsWith("#program=")) history.replaceState(null, "", `${location.pathname}${location.search}`);
  }

  function initializeMap() {
    if (resourceMap || typeof L === "undefined") return;
    resourceMap = L.map("resourceMap", { scrollWheelZoom: false }).setView([42.406, -71.052], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(resourceMap);
    markerLayer = L.layerGroup().addTo(resourceMap);
  }

  function renderMap(resources) {
    initializeMap();
    if (!resourceMap) { mapInfo.textContent = t("mapFailed"); return; }
    markerLayer.clearLayers();
    const mapped = resources.filter(resource => resource.coordinates);
    const bounds = [];
    mapped.forEach((resource, index) => {
      const popup = document.createElement("div"); popup.className = "map-popup";
      const name = document.createElement("strong"); name.textContent = resource.name;
      const address = document.createElement("span"); address.textContent = resource.address;
      const actions = document.createElement("div"); actions.className = "map-popup-actions";
      const details = document.createElement("button"); details.type = "button"; details.textContent = t("viewDetails"); details.addEventListener("click", () => openDetails(resource));
      const directions = document.createElement("a"); directions.textContent = t("directions"); directions.href = directionsUrl(resource); directions.target = "_blank"; directions.rel = "noopener";
      actions.append(details, directions); popup.append(name, address, actions);
      const icon = L.divIcon({ className: "", html: `<div class="workforce-marker"><span>${index + 1}</span></div>`, iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -30] });
      L.marker(resource.coordinates, { icon, title: resource.name }).bindPopup(popup).addTo(markerLayer);
      bounds.push(resource.coordinates);
    });
    if (bounds.length > 1) resourceMap.fitBounds(bounds, { padding: [42, 42], maxZoom: 14 });
    else if (bounds.length === 1) resourceMap.setView(bounds[0], 14);
    else resourceMap.setView([42.406, -71.052], 13);
    const withoutLocation = resources.length - mapped.length;
    if (state.lang === "es") mapInfo.textContent = `${mapped.length} ${mapped.length === 1 ? "ubicación" : "ubicaciones"} en el mapa.${withoutLocation ? ` ${withoutLocation} programa${withoutLocation === 1 ? "" : "s"} en línea o de toda la ciudad ${withoutLocation === 1 ? "está" : "están"} disponible${withoutLocation === 1 ? "" : "s"} en la lista.` : ""}`;
    else mapInfo.textContent = `${mapped.length} mapped location${mapped.length === 1 ? "" : "s"}.${withoutLocation ? ` ${withoutLocation} online or citywide program${withoutLocation === 1 ? " is" : "s are"} available in list view.` : ""}`;
    window.setTimeout(() => resourceMap.invalidateSize(), 0);
  }

  function setView(view) { state.view = view; render(); }

  function syncControls() {
    audienceFilter.value = state.audience; formatFilter.value = state.format;
    freeOnly.checked = state.freeOnly; englishClassesOnly.checked = state.englishClassesOnly;
    searchInput.value = state.query;
  }

  function render() {
    const resources = visibleResources();
    grid.replaceChildren(...resources.map(createCard));
    renderCategoryFilters();
    savedCount.textContent = state.saved.size;
    emptyState.hidden = resources.length !== 0;
    grid.hidden = state.view !== "list";
    mapView.hidden = state.view !== "map";
    listViewButton.setAttribute("aria-pressed", String(state.view === "list"));
    mapViewButton.setAttribute("aria-pressed", String(state.view === "map"));
    if (state.view === "map") renderMap(resources);
    const savedWord = state.savedOnly ? (state.lang === "es" ? " guardados" : " saved") : "";
    resultSummary.textContent = state.lang === "es" ? `Mostrando ${resources.length} programa${resources.length === 1 ? "" : "s"}${savedWord}` : `Showing ${resources.length}${savedWord} program${resources.length === 1 ? "" : "s"}`;
    observeReveals();
  }

  function resetFilters() {
    Object.assign(state, { query: "", audience: "all", format: "all", freeOnly: false, englishClassesOnly: false, savedOnly: false });
    state.categories = new Set(["All"]);
    syncControls(); render();
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.title = state.lang === "es" ? "Guía de Empleo de Everett" : "Everett Workforce Guide";
    document.querySelectorAll("[data-i18n]").forEach(element => { const value = TEXT[state.lang][element.dataset.i18n]; if (value) element.textContent = value; });
    searchInput.placeholder = t("searchPlaceholder");
    const languageToggle = $("#languageToggle");
    languageToggle.textContent = state.lang === "en" ? "ES" : "EN";
    languageToggle.setAttribute("aria-label", state.lang === "en" ? "Cambiar a español" : "Switch to English");
    $("#savedNav").setAttribute("aria-label", state.lang === "es" ? "Mostrar programas guardados" : "Show saved programs");
    categoryFilters.setAttribute("aria-label", state.lang === "es" ? "Filtrar por categoría" : "Filter by category");
    document.querySelector(".eligibility-filters").setAttribute("aria-label", state.lang === "es" ? "Filtros de elegibilidad y modalidad" : "Eligibility and format filters");
    document.querySelector(".quick-links").setAttribute("aria-label", state.lang === "es" ? "Búsquedas populares" : "Popular searches");
    mapView.setAttribute("aria-label", state.lang === "es" ? "Mapa de programas laborales" : "Map of workforce programs");
    document.querySelector(".site-header nav").setAttribute("aria-label", state.lang === "es" ? "Navegación principal" : "Primary navigation");
    document.querySelector(".workforce-paths").setAttribute("aria-label", state.lang === "es" ? "Metas laborales comunes" : "Common workforce goals");
    document.querySelector(".trust-bar").setAttribute("aria-label", state.lang === "es" ? "Datos destacados de la guía" : "Guide highlights");
    document.querySelector(".brand").setAttribute("aria-label", state.lang === "es" ? "Inicio de la Guía de Empleo de Everett" : "Everett Workforce Guide home");
    document.querySelector(".view-toggle").setAttribute("aria-label", state.lang === "es" ? "Elegir vista del directorio" : "Choose directory view");
    $("#resourceMap").setAttribute("aria-label", state.lang === "es" ? "Mapa interactivo de programas laborales filtrados" : "Interactive map of filtered workforce programs");
    $("#dialogClose").setAttribute("aria-label", state.lang === "es" ? "Cerrar detalles" : "Close details");
    $("#matcherClose").setAttribute("aria-label", state.lang === "es" ? "Cerrar recomendador de programas" : "Close program matcher");
    localStorage.setItem("everett-language", state.lang);
  }

  $("#heroSearch").addEventListener("submit", event => { event.preventDefault(); state.query = searchInput.value.trim(); state.savedOnly = false; render(); $("#directory").scrollIntoView({ behavior: "smooth" }); });
  let searchTimer;
  searchInput.addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { state.query = searchInput.value.trim(); state.savedOnly = false; render(); }, 160); });
  document.querySelectorAll("[data-quick]").forEach(button => button.addEventListener("click", () => { state.query = ""; searchInput.value = ""; state.categories = new Set([button.dataset.quick]); state.savedOnly = false; render(); $("#directory").scrollIntoView({ behavior: "smooth" }); }));
  [audienceFilter, formatFilter, freeOnly, englishClassesOnly].forEach(control => control.addEventListener("change", () => { state.audience = audienceFilter.value; state.format = formatFilter.value; state.freeOnly = freeOnly.checked; state.englishClassesOnly = englishClassesOnly.checked; state.savedOnly = false; render(); }));
  $("#savedNav").addEventListener("click", () => { state.savedOnly = !state.savedOnly; state.categories = new Set(["All"]); render(); $("#directory").scrollIntoView({ behavior: "smooth" }); });
  $("#languageToggle").addEventListener("click", () => { state.lang = state.lang === "en" ? "es" : "en"; applyLanguage(); render(); if (currentResource) openDetails(currentResource, false); });
  listViewButton.addEventListener("click", () => setView("list"));
  mapViewButton.addEventListener("click", () => setView("map"));
  $("#resetFilters").addEventListener("click", resetFilters);
  $("#emptyReset").addEventListener("click", resetFilters);
  $("#dialogClose").addEventListener("click", closeDetails);
  dialog.addEventListener("click", event => { if (event.target === dialog) closeDetails(); });
  dialog.addEventListener("close", () => {
    currentResource = null;
    if (location.hash.startsWith("#program=")) history.replaceState(null, "", `${location.pathname}${location.search}`);
  });

  $("#matcherLaunch").addEventListener("click", () => { matcherForm.reset(); $("#matcherError").textContent = ""; matcherDialog.showModal(); });
  $("#matcherClose").addEventListener("click", () => matcherDialog.close());
  matcherDialog.addEventListener("click", event => { if (event.target === matcherDialog) matcherDialog.close(); });
  matcherForm.addEventListener("input", () => { $("#matcherError").textContent = ""; });
  matcherForm.addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(matcherForm);
    const goals = form.getAll("goal");
    const audiences = form.getAll("audience");
    const formats = form.getAll("format");
    if (!goals.length || !audiences.length || !formats.length) {
      $("#matcherError").textContent = t("matcherSelectError");
      const firstEmptyGroup = !goals.length ? "goal" : !audiences.length ? "audience" : "format";
      matcherForm.querySelector(`[data-matcher-group="${firstEmptyGroup}"] input`).focus();
      return;
    }
    state.categories = new Set(goals);
    state.audience = audiences.length > 1 ? "all" : audiences[0];
    state.format = formats.length > 1 ? "all" : formats[0];
    state.query = ""; state.savedOnly = false;
    syncControls(); matcherDialog.close(); render(); $("#directory").scrollIntoView({ behavior: "smooth" });
  });

  let revealObserver;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) { document.querySelectorAll(".reveal").forEach(item => item.classList.add("visible")); return; }
    revealObserver ||= new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll(".reveal:not(.visible)").forEach(item => revealObserver.observe(item));
  }

  applyLanguage(); syncControls(); render();
  const sharedProgramId = new URLSearchParams(location.hash.replace(/^#/, "")).get("program");
  if (sharedProgramId) { const sharedResource = RESOURCES.find(resource => resource.id === sharedProgramId); if (sharedResource) openDetails(sharedResource, false); }
})();
