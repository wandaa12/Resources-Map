/* The assistant matches everyday phrases to the current directory in the browser. */
function createResourceAssistant(directory) {
  const byId = name => document.getElementById("assistant" + name);
  const dialog = byId("Dialog");
  const log = byId("Messages");
  const input = byId("Input");
  const mic = byId("Mic");
  const language = byId("Language");
  const status = byId("Status");
  const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
  const speech = window.speechSynthesis;
  let lang = directory.language();
  let preferredLanguage = null;
  let lastReply;
  let matches = [];
  let pendingGoal;
  let recognition;
  let voiceSession = false;
  let aiRequest;
  let aiContext;
  let aiQuestion = "";

  const copy = {
    en: {
      title: "Resource assistant", close: "Close resource assistant", language: "Chat and microphone",
      autoSpeak: "Read replies aloud", slow: "Speak slowly", conversation: "Conversation",
      input: "Your message", send: "Send", mic: "🎙 Speak", stop: "Stop listening", replay: "🔊 Replay reply",
      aiTitle: "AI help (optional)", aiLabel: "Use AI to understand my questions",
      aiNotice: "AI help sends your current message or voice transcript to Cloudflare. Please leave out personal information.",
      aiThinking: "Looking at what you’re asking…", aiFallback: "AI help is unavailable. The directory assistant answered instead.",
      askFormat: "Would an online option work for you, or would you rather go in person?",
      scheduleNote: "These listings mention the time you asked for. Call ahead to confirm the schedule.",
      scheduleUnknown: "The listings I found don’t mention the time you asked for. You can contact these providers to check.",
      hello: "Hi! I can help you find programs in the Everett guide. What would you like help with?",
      job: "Find a job", english: "Learn English", help: "How to use the guide",
      guide: "You can search the guide, browse programs on a list or map, or answer three questions in the program matcher. What would you like help finding?",
      matcher: "Open the program matcher", browse: "Browse the directory",
      age: "Is this for an adult or a young person? You can also say “either.”",
      loading: "The directory is still loading. Please try again in a moment.",
      empty: "There are no programs listed right now. Please check back later.",
      unknown: "I’m not sure I understood. Are you looking for work, classes, or help with something like food or transportation?",
      noMatch: "I couldn’t find a match in this guide. Would you like to try a different search?",
      results: "Here are a few places to start. You can open a listing or ask me about one by name or number.",
      programDetails: "Here’s what the guide says about this program.",
      details: "What would you like to find out about a program? You can give me its name or number.",
      eligibility: "Who can use it", population: "Who it serves", services: "What it offers", contact: "Contact",
      missing: "The guide doesn’t have all the details. Use the listing to see what’s available and confirm directly with the provider.",
      confirm: "Contact the provider to confirm current details before applying or visiting.",
      listing: "View listing", call: "Call", email: "Email", website: "Provider website", englishOnly: "From the directory (English)",
      listening: "Listening…", checking: "Checking on-device speech…",
      micUnavailable: "On-device speech input in this language isn’t available here. You can type your message.",
      pack: "Your browser needs a speech pack for this language.", install: "Install speech pack",
      installing: "Installing speech pack…", ready: "Speech pack ready. Press Speak to try it.",
      micError: "I couldn’t hear that. Check microphone access, try speaking again, or type your message.",
      noVoice: "A local voice for this language isn’t available on this device. You can read the reply above."
    },
    es: {
      title: "Guía de recursos", close: "Cerrar la guía de recursos", language: "Chat y micrófono",
      autoSpeak: "Leer las respuestas en voz alta", slow: "Hablar más despacio", conversation: "Conversación",
      input: "Tu mensaje", send: "Enviar", mic: "🎙 Hablar", stop: "Dejar de escuchar", replay: "🔊 Repetir respuesta",
      aiTitle: "Ayuda con IA (opcional)", aiLabel: "Usar IA para entender mis preguntas",
      aiNotice: "La ayuda con IA envía tu mensaje actual o su transcripción a Cloudflare. Evita incluir datos personales.",
      aiThinking: "Buscando cómo ayudarte…", aiFallback: "La ayuda con IA no está disponible. La guía de recursos respondió en su lugar.",
      askFormat: "¿Te serviría una opción en línea o prefieres ir en persona?",
      scheduleNote: "Estas fichas mencionan el horario que buscas. Confírmalo con la organización.",
      scheduleUnknown: "Las fichas que encontré no mencionan el horario que buscas. Puedes consultar con estas organizaciones.",
      hello: "¡Hola! Puedo ayudarte a encontrar programas en la guía de Everett. ¿Qué tipo de ayuda buscas?",
      job: "Buscar trabajo", english: "Aprender inglés", help: "Cómo usar la guía",
      guide: "Puedes buscar en la guía, ver los programas en una lista o en el mapa, o contestar tres preguntas en el buscador de programas. ¿Qué te gustaría encontrar?",
      matcher: "Abrir el buscador de programas", browse: "Ver el directorio",
      age: "¿Buscas para una persona adulta o joven? También puedes decir «cualquiera».",
      loading: "La guía todavía se está cargando. Inténtalo de nuevo en un momento.",
      empty: "Por ahora no hay programas publicados. Vuelve a consultar más adelante.",
      unknown: "No estoy seguro de haber entendido. ¿Buscas trabajo, clases o ayuda con algo como comida o transporte?",
      noMatch: "No encontré un programa que encaje en esta guía. ¿Quieres probar otra búsqueda?",
      results: "Aquí tienes algunas opciones para empezar. Puedes abrir una ficha o preguntarme por el nombre o el número de un programa.",
      programDetails: "Esto es lo que dice la guía sobre este programa.",
      details: "¿Sobre qué programa quieres saber más? Puedes escribir o decir su nombre o número.",
      eligibility: "Requisitos", population: "A quién atiende", services: "Qué ofrece", contact: "Contacto",
      missing: "La guía no tiene todos los detalles. Abre la ficha para ver la información disponible y confirma con la organización.",
      confirm: "Comunícate con la organización para confirmar los detalles antes de ir o inscribirte.",
      listing: "Ver ficha", call: "Llamar", email: "Correo electrónico", website: "Sitio de la organización", englishOnly: "De la guía (en inglés)",
      listening: "Escuchando…", checking: "Comprobando el reconocimiento de voz…",
      micUnavailable: "El reconocimiento de voz en este idioma no está disponible en este dispositivo. Puedes escribir tu mensaje.",
      pack: "Tu navegador necesita un paquete de voz para este idioma.", install: "Instalar paquete de voz",
      installing: "Instalando el paquete de voz…", ready: "El paquete está listo. Pulsa Hablar para probarlo.",
      micError: "No pude escucharte. Revisa el permiso del micrófono, vuelve a hablar o escribe tu mensaje.",
      noVoice: "Este dispositivo no tiene una voz local para este idioma. Puedes leer la respuesta arriba."
    }
  };

  const goals = [
    { id: "english", words: /\b(english|esl|esol|ingles)\b/, matches: r => r.englishLearning },
    { id: "ged", words: /\b(ged|hiset|diploma)\b/, matches: r => r.categories.includes("Education") && /\b(ged|hiset|equivalency)\b/i.test([r.summary, r.services, ...r.tags].join(" ")) },
    { id: "food", words: /\b(food|pantry|groceries|comida|alimentos|despensa)\b/, topic: /\b(food|pantry|comida|alimentos|despensa)\b/ },
    { id: "transport", words: /\b(transportation|transit|bus|mobility|transporte|movilidad|autobus)\b/, topic: /\b(mobility|travel training|movilidad)\b/ },
    { id: "health", words: /\b(health|doctor|clinic|salud|medico|clinica)\b/, topic: /\b(primary care|health center|clinic|atencion primaria|clinica)\b/ },
    { id: "family", words: /\b(childcare|child care|family|familia|guarderia|cuidado infantil)\b/, topic: /\b(childcare|child care|family resource|cuidado infantil|recursos familiares)\b/ },
    { id: "immigration", words: /\b(immigration|immigrant|citizenship|inmigracion|inmigrante|ciudadania)\b/, topic: /\b(immigration|citizenship|inmigracion|ciudadania)\b/ },
    { id: "worker", words: /\b(worker rights|wage theft|derechos laborales|robo de salario)\b/, category: "Worker Support" },
    { id: "cityJobs", words: /\b(city jobs|municipal jobs|empleos municipales)\b/, category: "City Jobs" },
    { id: "youthJobs", words: /\b(youth|teen|summer job|joven|jovenes|adolescente)\b/, category: "Youth Jobs" },
    { id: "training", words: /\b(training|skills|certificate|capacitacion|habilidades|certificado)\b/, category: "Training" },
    { id: "support", words: /\b(support services|servicios de apoyo)\b/, category: "Support Services" },
    { id: "jobs", words: /\b(job|jobs|work|employment|trabajo|empleo|trabajar)\b/, category: "Job Search", askAudience: true }
  ];

  const normalize = value => value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  const text = key => copy[lang][key];
  const speechLang = () => lang === "es" ? "es-US" : "en-US";

  function detectLanguage(message) {
    const value = normalize(message);
    const spanish = value.match(/\b(hola|necesito|quiero|puedo|donde|como|ayuda|busco|empleo|trabajo|trabajar|ingles|aprender|capacitacion|clases|joven|jovenes|comida|transporte|espanol|requisitos|adulto|adulta|cualquiera|gracias)\b/g) ?? [];
    const english = value.match(/\b(hi|hello|need|want|can|where|how|help|find|job|jobs|work|training|english|classes|learn|youth|food|transportation|eligibility|adult|either|thanks)\b/g) ?? [];
    if (spanish.length !== english.length) return spanish.length > english.length ? "es" : "en";
    return lang;
  }

  function setLanguage(next) {
    if (next !== lang && recognition) finishListening(recognition, true);
    lang = next;
    dialog.lang = lang;
    language.value = lang;
    byId("Launch").textContent = copy[directory.language()].title;
    for (const [id, key] of Object.entries({
      Title: "title", LanguageLabel: "language", AutoSpeakLabel: "autoSpeak", SlowLabel: "slow",
      InputLabel: "input", Send: "send", Replay: "replay",
      AiTitle: "aiTitle", AiLabel: "aiLabel", AiNotice: "aiNotice"
    })) byId(id).textContent = text(key);
    mic.textContent = recognition ? text("stop") : text("mic");
    byId("Close").setAttribute("aria-label", text("close"));
    log.setAttribute("aria-label", text("conversation"));
    const suggestions = ["job", "english", "help"].map(key => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = text(key);
      button.addEventListener("click", () => {
        submit(button.textContent);
        input.focus();
      });
      return button;
    });
    byId("Suggestions").replaceChildren(...suggestions);
  }

  function message(content, sender, locale = lang) {
    const item = document.createElement("div");
    item.className = "assistant-message assistant-" + sender;
    item.lang = locale;
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    item.append(paragraph);
    log.append(item);
    return item;
  }

  function link(label, href, action) {
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.textContent = label;
    if (action) anchor.addEventListener("click", event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      close();
      action();
    });
    return anchor;
  }

  function detailLine(parent, field, value, itemLang) {
    const line = document.createElement("p");
    line.append(field + " ");
    const detail = document.createElement("span");
    detail.lang = itemLang;
    detail.textContent = value;
    line.append(detail);
    parent.append(line);
  }

  function resourceCard(resource, index, expanded) {
    const locale = lang;
    const card = document.createElement("section");
    card.className = "assistant-resource";
    const title = document.createElement("h3");
    title.textContent = index ? `${index}. ${resource.name}` : resource.name;
    card.append(title);
    const spoken = [{ value: title.textContent, lang }];
    for (const [field, label] of [["summary", ""], ["services", text("services")], ["eligibility", text("eligibility")], ["population", text("population")]]) {
      if (!expanded && field !== "summary") continue;
      const translation = lang === "es" && resource.translations?.es?.[field];
      const value = translation || resource[field];
      if (!value) continue;
      const itemLang = lang === "es" && !translation ? "en" : lang;
      const prefix = [label, itemLang !== lang ? text("englishOnly") : ""].filter(Boolean).join(". ");
      detailLine(card, prefix ? prefix + ":" : "", value, itemLang);
      spoken.push({ value: prefix ? prefix + "." : "", lang }, { value, lang: itemLang });
    }
    if (expanded && resource.contact) {
      const translation = lang === "es" && resource.translations?.es?.contact;
      const itemLang = lang === "es" && !translation ? "en" : lang;
      detailLine(card, text("contact") + ":", translation || resource.contact, itemLang);
      spoken.push({ value: translation || resource.contact, lang: itemLang });
    }
    const actions = document.createElement("div");
    actions.className = "assistant-links";
    const listing = link(text("listing"), "#program=" + encodeURIComponent(resource.id), () => directory.openProgram(resource, locale));
    listing.setAttribute("aria-label", `${text("listing")}: ${resource.name}`);
    actions.append(listing);
    if (resource.phone) {
      actions.append(link(`${text("call")} ${resource.phone}`, "tel:" + resource.phone.replace(/[^\d+]/g, "")));
      spoken.push({ value: `${text("call")} ${resource.phone}`, lang });
    }
    if (resource.website) actions.append(link(text("website"), resource.website));
    if (resource.email) actions.append(link(text("email"), "mailto:" + encodeURIComponent(resource.email)));
    card.append(actions);
    return { card, spoken };
  }

  function speak(parts) {
    if (!speech || !window.SpeechSynthesisUtterance) {
      status.textContent = text("noVoice");
      return;
    }
    speech.cancel();
    const voices = speech.getVoices().filter(voice => voice.localService);
    const rate = byId("Slow").checked ? 0.78 : 1;
    let missingVoice = false;
    for (const { value, lang } of parts) {
      if (!value) continue;
      const voice = voices.find(candidate => candidate.lang.toLowerCase().split(/[-_]/)[0] === lang);
      if (!voice) {
        missingVoice = true;
        continue;
      }
      const line = new SpeechSynthesisUtterance(value);
      line.voice = voice;
      line.lang = voice.lang;
      line.rate = rate;
      line.onerror = event => {
        if (!["interrupted", "canceled"].includes(event.error)) status.textContent = text("noVoice");
      };
      speech.speak(line);
    }
    if (missingVoice) status.textContent = text("noVoice");
  }

  function reply(content, resources = [], { expanded = false, navigation = false, speakReply = true } = {}) {
    const item = message(content, "reply");
    lastReply = [{ value: content, lang }];
    resources.forEach((resource, index) => {
      const { card, spoken } = resourceCard(resource, expanded ? 0 : index + 1, expanded);
      item.append(card);
      lastReply.push(...spoken);
    });
    if (expanded) {
      const resource = resources[0];
      const note = resource.eligibility && (resource.phone || resource.website || resource.email) ? text("confirm") : text("missing");
      detailLine(item, "", note, lang);
      lastReply.push({ value: note, lang });
    }
    if (navigation) {
      const actions = document.createElement("div");
      actions.className = "assistant-links";
      actions.append(link(text("browse"), "#directory", () => { location.hash = "directory"; }),
        link(text("matcher"), "#directory", directory.openMatcher));
      item.append(actions);
    }
    log.scrollTop = log.scrollHeight;
    if (dialog.open && speakReply && (voiceSession || byId("AutoSpeak").checked)) speak(lastReply);
  }

  function recommend(resources, goal, { audience, format, free, schedule }) {
    const category = goal.askAudience && audience === "youth" ? "Youth Jobs" : goal.category;
    const candidates = resources.filter(resource => {
      if (audience && !resource.audiences.includes(audience)) return false;
      if (format && !resource.formats.includes(format)) return false;
      if (free && !resource.free) return false;
      if (category) return resource.categories.includes(category);
      if (goal.matches) return goal.matches(resource);
      const keywords = [resource.name, resource.summary, resource.services, ...resource.tags,
        resource.translations?.es?.summary, resource.translations?.es?.services];
      return goal.topic.test(normalize(keywords.join(" ")));
    });
    if (!candidates.length) {
      matches = [];
      return reply(text("noMatch"), [], { navigation: true });
    }
    const scheduleWords = schedule === "evening" ? /\b(evenings?|night(s)?|noches?|tardes?)\b/
      : schedule === "weekend" ? /\b(weekends?|saturdays?|sundays?|sabados?|domingos?|fin de semana)\b/ : null;
    const timed = scheduleWords
      ? candidates.filter(resource => scheduleWords.test(normalize(resource.hours + " " + (resource.translations?.es?.hours ?? ""))))
      : [];
    matches = (timed.length ? timed : candidates).slice(0, 3);
    reply(text(scheduleWords ? timed.length ? "scheduleNote" : "scheduleUnknown" : "results"), matches);
  }

  async function classify(message, signal) {
    const response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language: lang }),
      signal
    });
    if (!response.ok) throw new Error("AI classification unavailable");
    return response.json();
  }

  function applyIntent(intent, resources) {
    if (!["en", "es"].includes(intent?.language)) return false;
    if (intent.goal === "guide") {
      setLanguage(intent.language);
      aiContext = pendingGoal = null;
      aiQuestion = "";
      reply(text("guide"), [], { navigation: true });
      return true;
    }
    const goal = goals.find(entry => entry.id === intent.goal);
    if (!goal && (intent.goal || !aiContext || !(intent.audience || intent.format || intent.schedule || intent.free || intent.transportBarrier))) return false;
    const previous = !goal || aiContext?.goal === goal ? aiContext : null;
    const preferences = {
      goal: goal ?? previous.goal,
      audience: intent.audience || previous?.audience || "",
      format: intent.format || previous?.format || "",
      schedule: intent.schedule || previous?.schedule || "",
      free: Boolean(intent.free || previous?.free),
      transportBarrier: Boolean(intent.transportBarrier || previous?.transportBarrier)
    };
    aiContext = preferences;
    setLanguage(intent.language);
    if (preferences.goal.askAudience && !preferences.audience) {
      pendingGoal = preferences;
      matches = [];
      aiQuestion = "age";
      reply(text("age"));
    } else if (preferences.transportBarrier && !preferences.format) {
      pendingGoal = null;
      matches = [];
      aiQuestion = "format";
      reply(text("askFormat"));
    } else {
      pendingGoal = null;
      aiQuestion = "";
      recommend(resources, preferences.goal, {
        ...preferences,
        audience: preferences.audience === "either" ? "" : preferences.audience,
        format: preferences.format === "either" ? "" : preferences.format
      });
    }
    return true;
  }

  function lockAiRequest(locked) {
    byId("Send").disabled = locked;
    language.disabled = locked;
    mic.disabled = locked;
  }

  async function submit(value, fromVoice = false) {
    const content = value.trim().slice(0, 400);
    if (!content || aiRequest) return;
    if (recognition) finishListening(recognition, true);
    input.value = "";
    status.textContent = "";
    voiceSession = fromVoice;
    const detected = fromVoice ? lang : detectLanguage(content);
    if (detected !== lang) setLanguage(detected);
    message(content, "visitor");
    const query = normalize(content);
    if (/\b(how (do i|to) (use|navigate)|how does|guide work|como (usar|uso|funciona)|que ofrece|matcher|buscador de programas)\b/.test(query)) {
      pendingGoal = null;
      aiContext = null;
      aiQuestion = "";
      reply(text("guide"), [], { navigation: true });
      return;
    }

    const resources = directory.resources();
    if (!resources) return reply(text("loading"));
    if (!resources.length) return reply(text("empty"));
    const number = query.match(/^(?:(?:program|programa|option|opcion|number|numero)\s+)?([1-3])[.!?]?$/)
      ?? query.match(/\b(?:program|programa|option|opcion|number|numero)\s+([1-3])\b/);
    const named = resources.find(resource => query.includes(normalize(resource.name)));
    const followUp = /\b(eligibility|eligible|requirements|contact|phone|call|tell me more|requisitos|contacto|telefono|llamar|mas informacion)\b/.test(query);
    const selected = named ?? (number ? matches[Number(number[1]) - 1] : followUp && matches.length === 1 ? matches[0] : undefined);
    if (selected) {
      pendingGoal = null;
      reply(text("programDetails"), [selected], { expanded: true });
      return;
    }
    if (byId("Ai").checked && document.documentElement.dataset.dataSource === "google-sheet") {
      const quickFormat = aiQuestion === "format" && /^(yes|yeah|sure|si|claro)[.!?]?$/.test(query) ? "online"
        : aiQuestion === "format" && /^no[.!?]?$/.test(query) ? "inPerson" : "";
      if (quickFormat && applyIntent({ language: lang, goal: "", format: quickFormat }, resources)) return;

      const controller = new AbortController();
      aiRequest = controller;
      lockAiRequest(true);
      status.textContent = text("aiThinking");
      const timeout = setTimeout(() => controller.abort(), 6500);
      try {
        const intent = await classify(content, controller.signal);
        if (!controller.signal.aborted && dialog.open && byId("Ai").checked) {
          status.textContent = "";
          if (applyIntent(intent, resources)) return;
        }
      } catch {
        if (dialog.open && byId("Ai").checked) status.textContent = text("aiFallback");
      } finally {
        clearTimeout(timeout);
        aiRequest = null;
        lockAiRequest(false);
      }
    }
    answerLocally(query, resources, followUp, number);
  }

  function answerLocally(query, resources, followUp, number) {
    const audience = /\b(youth|teen|joven|jovenes|adolescente)\b/.test(query) ? "youth"
      : /\b(adults?|adultos?|adultas?)\b/.test(query) ? "adult" : "";
    const either = /\b(either|any|both|cualquiera|ambos)\b/.test(query);
    const format = /\b(online|virtual|remote|en linea|a distancia)\b/.test(query) ? "online"
      : /\b(in person|presencial)\b/.test(query) ? "inPerson" : "";
    const free = /\b(free|no cost|gratis|gratuit[oa]s?|sin costo)\b/.test(query);
    const goal = goals.find(entry => entry.words.test(query));
    if (pendingGoal && (audience || either)) {
      const previous = pendingGoal;
      pendingGoal = null;
      recommend(resources, goal ?? previous.goal, {
        audience, format: format || previous.format, free: free || previous.free, schedule: previous.schedule
      });
      return;
    }
    if (goal?.askAudience && !audience && !either) {
      pendingGoal = { goal, format, free };
      matches = [];
      reply(text("age"));
    } else if (goal) {
      pendingGoal = null;
      recommend(resources, goal, { audience, format, free });
    } else {
      const nameQuery = query.replace(/^(tell me about|what is|que es|hablame de)\s+/, "").replace(/[?!.]+$/, "").trim();
      const possibleNames = nameQuery.length >= 5
        ? resources.filter(resource => normalize(resource.name).includes(nameQuery)) : [];
      if (!pendingGoal && !number && possibleNames.length === 1) {
        reply(text("programDetails"), possibleNames, { expanded: true });
      } else {
        reply(text(pendingGoal ? "age" : followUp || number ? "details" : "unknown"));
      }
    }
  }

  function finishListening(active, abort = false) {
    if (recognition !== active) return;
    recognition = null;
    if (abort) active.abort();
    mic.textContent = text("mic");
    mic.setAttribute("aria-pressed", "false");
  }

  async function listen() {
    if (recognition) {
      recognition.stop();
      return;
    }
    if (!Recognition?.available) {
      status.textContent = text("micUnavailable");
      return;
    }
    const active = new Recognition();
    if (!("processLocally" in active)) {
      status.textContent = text("micUnavailable");
      return;
    }

    const options = { langs: [speechLang()], processLocally: true, quality: "dictation" };
    status.textContent = text("checking");
    mic.disabled = true;
    try {
      const availability = await Recognition.available(options);
      if (!dialog.open || aiRequest || options.langs[0] !== speechLang()) return;
      if (availability !== "available") {
        status.textContent = text("micUnavailable");
        if (availability === "downloadable" && Recognition.install) {
          status.textContent = text("pack") + " ";
          const install = document.createElement("button");
          install.type = "button";
          install.textContent = text("install");
          install.addEventListener("click", async () => {
            status.textContent = text("installing");
            try {
              status.textContent = text(await Recognition.install(options) ? "ready" : "micUnavailable");
            } catch {
              status.textContent = text("micUnavailable");
            }
          });
          status.append(install);
        }
        return;
      }
      speech?.cancel();
      active.lang = options.langs[0];
      active.processLocally = true;
      active.onresult = event => {
        if (recognition !== active) return;
        finishListening(active);
        submit(event.results[0][0].transcript, true);
      };
      active.onerror = () => {
        if (recognition !== active) return;
        finishListening(active);
        status.textContent = text("micError");
      };
      active.onend = () => {
        if (recognition !== active) return;
        finishListening(active);
        status.textContent = text("micError");
      };
      recognition = active;
      active.start();
      mic.textContent = text("stop");
      mic.setAttribute("aria-pressed", "true");
      status.textContent = text("listening");
    } catch {
      if (recognition === active) finishListening(active);
      status.textContent = text("micUnavailable");
    } finally {
      mic.disabled = Boolean(aiRequest);
    }
  }

  function close() {
    dialog.close();
  }

  byId("Launch").addEventListener("click", () => {
    setLanguage(preferredLanguage ?? directory.language());
    dialog.showModal();
    if (!lastReply) reply(text("hello"), [], { speakReply: false });
  });
  byId("Close").addEventListener("click", close);
  dialog.addEventListener("close", () => {
    aiRequest?.abort();
    if (recognition) finishListening(recognition, true);
    speech?.cancel();
    status.textContent = "";
    voiceSession = false;
  });
  byId("Ai").addEventListener("change", () => {
    if (!byId("Ai").checked) {
      aiRequest?.abort();
      aiContext = null;
      aiQuestion = "";
      status.textContent = "";
    }
  });
  language.addEventListener("change", () => {
    preferredLanguage = language.value;
    setLanguage(preferredLanguage);
    status.textContent = "";
    speech?.cancel();
  });
  byId("Form").addEventListener("submit", event => {
    event.preventDefault();
    if (recognition) finishListening(recognition, true);
    submit(input.value);
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      byId("Form").requestSubmit();
    }
  });
  byId("Replay").addEventListener("click", () => {
    if (recognition) finishListening(recognition, true);
    status.textContent = "";
    if (lastReply) speak(lastReply);
  });
  mic.addEventListener("click", listen);
  setLanguage(lang);
  return { syncLanguage: () => setLanguage(preferredLanguage ?? directory.language()) };
}
