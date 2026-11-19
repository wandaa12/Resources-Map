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
  const preferredVoices = {};
  let lang = directory.language();
  let preferredLanguage = null;
  let lastReply;
  let matches = [];
  let selectedProgram;
  let recognition;
  let speechCheck;
  let voiceDraft = false;
  let speechPlayback;
  let speechTimer;
  let voiceSession = false;
  let aiRequest;
  let searchContext;
  let pendingQuestion = "";
  let pendingGoals;

  const copy = {
    en: {
      title: "Resource assistant", close: "Close resource assistant", language: "Chat and microphone",
      autoSpeak: "Read replies aloud", slow: "Speak slowly", conversation: "Conversation",
      input: "Your message", send: "Send", mic: "Speak", stop: "Done speaking", replay: "Replay", replayLabel: "Replay reply",
      voice: "Reply voice", voiceAuto: "Automatic", voiceNone: "No local voices",
      settings: "Chat settings", aiLabel: "Use AI to understand my questions",
      aiNotice: "If the guide needs help understanding your question, it sends your current message or voice transcript to Cloudflare. Please leave out personal information.",
      aiThinking: "Looking at what you’re asking…", aiFallback: "AI help is unavailable. The directory assistant answered instead.",
      askFormat: "Would an online option work for you, or would you rather go in person?",
      scheduleNote: "These listings mention the time you asked for. Call ahead to confirm the schedule.",
      scheduleUnknown: "The listings I found don’t mention the time you asked for. You can contact these providers to check.",
      hello: "Hi! I can help you find programs in the Everett guide. What would you like help with?",
      thanks: "You’re welcome! Let me know if you’d like help with anything else.",
      job: "Find a job", english: "Learn English", help: "How to use the guide",
      guide: "You can search the guide, browse programs on a list or map, or answer three questions in the program matcher. What would you like help finding?",
      matcher: "Open the program matcher", browse: "Browse the directory",
      age: "Is this for an adult or a young person? You can also say “either.”",
      ageClarify: "I didn’t catch who it’s for. You can choose below.",
      adultChoice: "Adult", youthChoice: "Young person", eitherChoice: "Either",
      loading: "The directory is still loading. Please try again in a moment.",
      empty: "There are no programs listed right now. Please check back later.",
      unknown: "Tell me a little about what you need. For example, “I lost my job” or “I can only take English classes on weekends.”",
      noMatch: "I couldn’t find a match in this guide. Would you like to try a different search?",
      chooseGoal: topics => `You mentioned ${topics}. Which would you like to start with?`,
      housingResults: "These listings mention housing help. Contact the provider to ask what’s available, including whether they can help with rent.",
      goalNames: { english: "English classes", ged: "GED or high school", food: "Food", housing: "Housing or rent", transport: "Transportation", health: "Health care", family: "Family or child care", immigration: "Immigration support", worker: "Workers’ rights", cityJobs: "City jobs", youthJobs: "Youth jobs", training: "Job training", support: "Support services", jobs: "Finding work" },
      results: "Here are a few places to start. You can open a listing or ask me about one by name or number.",
      youthJobResults: "Here are a few programs that help young people find work. Want to hear more about one?",
      adultJobResults: "Here are a few places that help adults find work. Want to hear more about one?",
      programDetails: "Here’s what the guide says about this program.",
      details: "What would you like to find out about a program? You can give me its name or number.",
      eligibility: "Who can use it", population: "Who it serves", services: "What it offers", contact: "Contact",
      hours: "Hours and schedule", address: "Location", referrals: "Next steps",
      programHours: "Here are the hours listed in the guide.",
      hoursMissing: "The guide doesn’t list hours for this program. Contact the provider to check.",
      missing: "The guide doesn’t have all the details. Use the listing to see what’s available and confirm directly with the provider.",
      confirm: "Contact the provider to confirm current details before applying or visiting.",
      listing: "View listing", call: "Call", email: "Email", website: "Provider website", englishOnly: "From the directory (English)",
      listening: "Listening… Say your question, then choose Done speaking.", checking: "Checking on-device speech…",
      listeningShort: "Listening for a short phrase… You can add more before sending.",
      reviewSpeech: "Check your message, then press Send. You can edit it or use Speak to add more.",
      micUnavailable: "Speak isn’t available for this language on this device. You can still use keyboard dictation.",
      pack: "Your browser needs a speech pack for this language.", install: "Install speech pack",
      installing: "Installing speech pack…", ready: "Speech pack ready. Press Speak to try it.",
      packDownloading: "The speech pack is still downloading. Try Speak again in a moment.",
      micBlocked: "Microphone access was blocked. Allow it in your browser, or try keyboard dictation.",
      micError: "I couldn’t hear that. Try a short question, or use keyboard dictation.",
      dictationTitle: "How to use keyboard dictation",
      dictationStart: "Click or tap the message box first.",
      dictationMac: "Use the Dictation shortcut in System Settings → Keyboard, or choose Edit → Start Dictation.",
      dictationWindows: "Press the Windows key + H.",
      dictationMobileLabel: "Phone or tablet",
      dictationMobile: "Tap the microphone on your on-screen keyboard.",
      dictationFinish: "Choose English or Spanish on your device, check the text, then press Send. Your device’s speech settings apply.",
      noVoice: "A local voice for this language isn’t available on this device. You can read the reply above."
    },
    es: {
      title: "Guía de recursos", close: "Cerrar la guía de recursos", language: "Chat y micrófono",
      autoSpeak: "Leer las respuestas en voz alta", slow: "Hablar más despacio", conversation: "Conversación",
      input: "Tu mensaje", send: "Enviar", mic: "Hablar", stop: "Terminar de hablar", replay: "Repetir", replayLabel: "Repetir respuesta",
      voice: "Voz de las respuestas", voiceAuto: "Automática", voiceNone: "Sin voces locales",
      settings: "Ajustes del chat", aiLabel: "Usar IA para entender mis preguntas",
      aiNotice: "Si la guía necesita ayuda para entender tu pregunta, envía tu mensaje actual o su transcripción a Cloudflare. Evita incluir datos personales.",
      aiThinking: "Buscando cómo ayudarte…", aiFallback: "La ayuda con IA no está disponible. La guía de recursos respondió en su lugar.",
      askFormat: "¿Te serviría una opción en línea o prefieres ir en persona?",
      scheduleNote: "Estas fichas mencionan el horario que buscas. Confírmalo con la organización.",
      scheduleUnknown: "Las fichas que encontré no mencionan el horario que buscas. Puedes consultar con estas organizaciones.",
      hello: "¡Hola! Puedo ayudarte a encontrar programas en la guía de Everett. ¿Qué tipo de ayuda buscas?",
      thanks: "¡De nada! Si necesitas ayuda con algo más, dime.",
      job: "Buscar trabajo", english: "Aprender inglés", help: "Cómo usar la guía",
      guide: "Puedes buscar en la guía, ver los programas en una lista o en el mapa, o contestar tres preguntas en el buscador de programas. ¿Qué te gustaría encontrar?",
      matcher: "Abrir el buscador de programas", browse: "Ver el directorio",
      age: "¿Buscas para una persona adulta o joven? También puedes decir «cualquiera».",
      ageClarify: "No entendí para quién buscas. Puedes elegir abajo.",
      adultChoice: "Persona adulta", youthChoice: "Persona joven", eitherChoice: "Cualquiera",
      loading: "La guía todavía se está cargando. Inténtalo de nuevo en un momento.",
      empty: "Por ahora no hay programas publicados. Vuelve a consultar más adelante.",
      unknown: "Cuéntame un poco sobre lo que necesitas. Por ejemplo, «me quedé sin trabajo» o «solo puedo tomar clases de inglés los fines de semana».",
      noMatch: "No encontré un programa que encaje en esta guía. ¿Quieres probar otra búsqueda?",
      chooseGoal: topics => `Mencionaste ${topics}. ¿Por cuál quieres empezar?`,
      housingResults: "Estas fichas mencionan ayuda con la vivienda. Pregunta a la organización qué ofrece y si puede ayudarte con la renta.",
      goalNames: { english: "Clases de inglés", ged: "GED o secundaria", food: "Alimentos", housing: "Vivienda o renta", transport: "Transporte", health: "Atención médica", family: "Apoyo familiar o cuidado infantil", immigration: "Apoyo migratorio", worker: "Derechos laborales", cityJobs: "Empleos municipales", youthJobs: "Empleo juvenil", training: "Capacitación laboral", support: "Servicios de apoyo", jobs: "Buscar trabajo" },
      results: "Aquí tienes algunas opciones para empezar. Puedes abrir una ficha o preguntarme por el nombre o el número de un programa.",
      youthJobResults: "Estos programas ayudan a jóvenes a encontrar trabajo. ¿Quieres saber más sobre alguno?",
      adultJobResults: "Estos programas ayudan a personas adultas a encontrar trabajo. ¿Quieres saber más sobre alguno?",
      programDetails: "Esto es lo que dice la guía sobre este programa.",
      details: "¿Sobre qué programa quieres saber más? Puedes escribir o decir su nombre o número.",
      eligibility: "Requisitos", population: "A quién atiende", services: "Qué ofrece", contact: "Contacto",
      hours: "Horarios", address: "Ubicación", referrals: "Próximos pasos",
      programHours: "Estos son los horarios que figuran en la guía.",
      hoursMissing: "La guía no indica el horario de este programa. Consulta con la organización.",
      missing: "La guía no tiene todos los detalles. Abre la ficha para ver la información disponible y confirma con la organización.",
      confirm: "Comunícate con la organización para confirmar los detalles antes de ir o inscribirte.",
      listing: "Ver ficha", call: "Llamar", email: "Correo electrónico", website: "Sitio de la organización", englishOnly: "De la guía (en inglés)",
      listening: "Escuchando… Di tu pregunta y pulsa Terminar de hablar.", checking: "Comprobando el reconocimiento de voz…",
      listeningShort: "Escuchando una frase corta… Puedes agregar más antes de enviar.",
      reviewSpeech: "Revisa tu mensaje y pulsa Enviar. Puedes editarlo o usar Hablar para agregar más.",
      micUnavailable: "La opción Hablar no está disponible para este idioma en tu dispositivo. Puedes usar el dictado del teclado.",
      pack: "Tu navegador necesita un paquete de voz para este idioma.", install: "Instalar paquete de voz",
      installing: "Instalando el paquete de voz…", ready: "El paquete está listo. Pulsa Hablar para probarlo.",
      packDownloading: "El paquete de voz todavía se está descargando. Vuelve a pulsar Hablar en un momento.",
      micBlocked: "El navegador bloqueó el micrófono. Permite el acceso o usa el dictado del teclado.",
      micError: "No pude escucharte. Prueba con una pregunta corta o usa el dictado del teclado.",
      dictationTitle: "Cómo usar el dictado del teclado",
      dictationStart: "Primero, haz clic o toca el cuadro del mensaje.",
      dictationMac: "Usa el atajo de Dictado en Configuración del Sistema → Teclado, o elige Edición → Iniciar dictado.",
      dictationWindows: "Presiona la tecla Windows + H.",
      dictationMobileLabel: "Teléfono o tableta",
      dictationMobile: "Toca el micrófono del teclado en pantalla.",
      dictationFinish: "Elige inglés o español en tu dispositivo, revisa el texto y pulsa Enviar. Se aplica la configuración de voz de tu dispositivo.",
      noVoice: "Este dispositivo no tiene una voz local para este idioma. Puedes leer la respuesta arriba."
    }
  };

  const goals = [
    { id: "english", words: /\b(english|esl|esol|ingles)\b/, matches: r => r.englishLearning },
    { id: "ged", words: /\b(ged|hiset|diploma|finish high school|terminar la secundaria)\b/, matches: r => r.categories.includes("Education") && /\b(ged|hiset|equivalency)\b/i.test([r.summary, r.services, ...r.tags].join(" ")) },
    { id: "food", words: /\b(food|pantry|groceries|something to eat|comida|alimentos|despensa|algo para comer)\b/, topic: /\b(food|pantry|comida|alimentos|despensa)\b/ },
    { id: "housing", words: /\b(housing|rent|eviction|vivienda|alquiler|renta|desalojo)\b/, topic: /\b(housing|rent assistance|rental assistance|vivienda|ayuda con (?:la renta|el alquiler))\b/ },
    { id: "transport", words: /\b(transportation|transit|bus|mobility|transporte|movilidad|autobus)\b/, topic: /\b(mobility|travel training|movilidad)\b/ },
    { id: "health", words: /\b(health|doctor|clinic|salud|medico|clinica)\b/, topic: /\b(primary care|health center|clinic|atencion primaria|clinica)\b/ },
    { id: "family", words: /\b(childcare|child care|family|familia|guarderia|cuidado infantil)\b/, topic: /\b(childcare|child care|family resource|cuidado infantil|recursos familiares)\b/ },
    { id: "immigration", words: /\b(immigration|immigrant|citizenship|inmigracion|inmigrante|ciudadania)\b/, topic: /\b(immigration|citizenship|inmigracion|ciudadania)\b/ },
    { id: "worker", words: /\b(worker rights|wage theft|derechos laborales|robo de salario)\b/, category: "Worker Support" },
    { id: "cityJobs", words: /\b(city jobs|municipal jobs|empleos municipales)\b/, category: "City Jobs" },
    { id: "youthJobs", words: /\b(youth jobs?|teen jobs?|summer jobs?|empleo juvenil|trabajo de verano)\b/, category: "Youth Jobs" },
    { id: "training", words: /\b(training|skills|certificate|learn a trade|capacitacion|habilidades|certificado|aprender un oficio)\b/, category: "Training" },
    { id: "support", words: /\b(support services|servicios de apoyo)\b/, category: "Support Services" },
    { id: "jobs", words: /\b(jobs?|work|employment|laid off|let go|got fired|unemployed|resume|trabajo|empleo|trabajar|desemplead[oa]|despidieron|me corrieron|curriculum)\b/, category: "Job Search", askAudience: true }
  ];

  const normalize = value => value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  const text = key => copy[lang][key];
  const speechLocales = { en: ["en-US", "en-CA", "en-GB", "en-AU"], es: ["es-US", "es-MX", "es-ES", "es-419"] };

  function detectLanguage(message) {
    const value = normalize(message);
    const spanish = value.match(/\b(hola|buenas|buenos dias|buenas tardes|buenas noches|necesito|quiero|quisiera|me gustaria|puedo|pueden|podrian|esto|ayer|donde|como|ayuda|ayudar|busco|empleo|trabajo|trabajar|despidieron|me corrieron|ingles|aprender|capacitacion|clases|joven|jovenes|comida|alimentos|transporte|vivienda|alquiler|renta|desalojo|espanol|requisitos|adulto|adulta|cualquiera|gracias|oficio|horarios?|primer[oa]?|segund[oa]|sabados?)\b/g) ?? [];
    const english = value.match(/\b(hi|hello|hey|good morning|good afternoon|good evening|need|want|can|where|how|help|find|job|jobs|work|training|english|classes|learn|youth|food|transportation|eligibility|adult|either|thanks|thank you|hours|weekends)\b/g) ?? [];
    if (spanish.length !== english.length) return spanish.length > english.length ? "es" : "en";
    return lang;
  }

  function setLanguage(next) {
    if (next !== lang) {
      if (recognition) finishListening(recognition, true);
      clearSpeechCheck();
    }
    lang = next;
    dialog.lang = lang;
    language.value = lang;
    byId("Launch").textContent = copy[directory.language()].title;
    for (const [id, key] of Object.entries({
      Title: "title", LanguageLabel: "language", AutoSpeakLabel: "autoSpeak", SlowLabel: "slow",
      InputLabel: "input", Send: "send", Replay: "replay",
      SettingsTitle: "settings", VoiceLabel: "voice", AiLabel: "aiLabel", AiNotice: "aiNotice",
      DictationTitle: "dictationTitle", DictationStart: "dictationStart", DictationMac: "dictationMac",
      DictationWindows: "dictationWindows", DictationMobileLabel: "dictationMobileLabel",
      DictationMobile: "dictationMobile", DictationFinish: "dictationFinish"
    })) byId(id).textContent = text(key);
    mic.textContent = recognition ? text("stop") : text("mic");
    byId("Close").setAttribute("aria-label", text("close"));
    byId("Replay").setAttribute("aria-label", text("replayLabel"));
    refreshVoiceOptions();
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

  function resourceCard(resource, index, { expanded, hoursOnly }) {
    const locale = lang;
    const card = document.createElement("section");
    card.className = "assistant-resource";
    const title = document.createElement("h3");
    title.textContent = index ? `${index}. ${resource.name}` : resource.name;
    card.append(title);
    const spoken = [{ value: title.textContent, lang }];
    const fields = hoursOnly ? ["hours"] : expanded ? ["summary", "hours", "address", "services", "eligibility", "population", "referrals"] : ["summary"];
    for (const field of fields) {
      const label = field === "summary" ? "" : text(field);
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
    if (!hoursOnly && resource.website) actions.append(link(text("website"), resource.website));
    if (!hoursOnly && resource.email) actions.append(link(text("email"), "mailto:" + encodeURIComponent(resource.email)));
    card.append(actions);
    return { card, spoken };
  }

  function localVoices(locale) {
    return (speech?.getVoices() ?? []).filter(voice =>
      voice.localService && voice.lang.toLowerCase().split(/[-_]/)[0] === locale);
  }

  const voiceKey = voice => voice.voiceURI || voice.name || voice.lang;

  function refreshVoiceOptions() {
    const select = byId("Voice");
    const voices = localVoices(lang);
    const automatic = new Option(text(voices.length ? "voiceAuto" : "voiceNone"), "");
    const options = voices.map(voice => new Option(voice.name || voice.lang, voiceKey(voice)));
    select.replaceChildren(automatic, ...options);
    select.disabled = !voices.length;
    select.value = voices.some(voice => voiceKey(voice) === preferredVoices[lang]) ? preferredVoices[lang] : "";
  }

  function pickVoice(locale) {
    const voices = localVoices(locale);
    return voices.find(voice => voiceKey(voice) === preferredVoices[locale])
      ?? voices.find(voice => /\b(enhanced|premium|natural|neural)\b/i.test(voice.name))
      ?? voices.find(voice => voice.default)
      ?? voices[0];
  }

  function stopSpeaking() {
    speechPlayback = null;
    speech?.cancel();
  }

  function speak(parts) {
    stopSpeaking();
    if (!speech || !window.SpeechSynthesisUtterance) {
      status.textContent = text("noVoice");
      return;
    }

    // Keep adjacent text in the same voice together so it reads as a reply, with pauses.
    const passages = [];
    let missingVoice = false;
    for (const part of parts) {
      if (!part.value?.trim()) continue;
      const voice = pickVoice(part.lang);
      if (!voice) {
        missingVoice = true;
        continue;
      }
      const value = part.value.trim();
      const previous = passages.at(-1);
      if (previous && voiceKey(previous.voice) === voiceKey(voice) &&
          previous.value.length + value.length <= 320) {
        previous.value += /[.!?:;]$/.test(previous.value) ? " " + value : ". " + value;
      } else {
        passages.push({ voice, value });
      }
    }
    const playback = {};
    speechPlayback = playback;
    const rate = byId("Slow").checked ? 0.78 : 1;
    function play(index) {
      if (speechPlayback !== playback) return;
      const next = passages[index];
      if (!next) {
        speechPlayback = null;
        if (missingVoice) status.textContent = text("noVoice");
        return;
      }
      const line = new SpeechSynthesisUtterance(next.value);
      line.voice = next.voice;
      line.lang = next.voice.lang;
      line.rate = rate;
      line.onend = () => play(index + 1);
      line.onerror = event => {
        if (speechPlayback !== playback) return;
        if (["interrupted", "canceled"].includes(event.error)) {
          speechPlayback = null;
        } else {
          missingVoice = true;
          play(index + 1);
        }
      };
      speech.speak(line);
    }
    play(0);
  }

  function askAudience(clarify = false) {
    reply(text(clarify ? "ageClarify" : "age"));
    addChoices(["adultChoice", "youthChoice", "eitherChoice"].map(key => ({ label: text(key) })));
  }

  function askGoal() {
    const options = pendingGoals.goals.map(goal => ({ label: text("goalNames")[goal], goal }));
    const topics = new Intl.ListFormat(lang).format(options.map(({ label }) => label.toLocaleLowerCase(lang)));
    reply(text("chooseGoal")(topics));
    addChoices(options);
  }

  function addChoices(options) {
    const choices = document.createElement("div");
    choices.className = "assistant-choices";
    for (const { label, goal } of options) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", () => {
        if (!recognition) submit(label, voiceSession, goal);
        input.focus();
      });
      choices.append(button);
    }
    log.lastElementChild.append(choices);
  }

  function reply(content, resources = [], { expanded = false, hoursOnly = false, navigation = false, speakReply = true } = {}) {
    const item = message(content, "reply");
    lastReply = [{ value: content, lang }];
    resources.forEach((resource, index) => {
      const { card, spoken } = resourceCard(resource, expanded || hoursOnly ? 0 : index + 1, { expanded, hoursOnly });
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
    log.scrollTop = Math.max(0, item.offsetTop - 12);
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
        resource.translations?.es?.summary, resource.translations?.es?.services, resource.translations?.es?.tags];
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
    let intro = goal.id === "housing" ? "housingResults" : "results";
    if (scheduleWords) intro = timed.length ? "scheduleNote" : "scheduleUnknown";
    else if (goal.askAudience && audience) intro = audience === "youth" ? "youthJobResults" : "adultJobResults";
    reply(text(intro), matches);
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
      if (intent.language !== lang) setLanguage(intent.language);
      searchContext = selectedProgram = null;
      pendingQuestion = "";
      pendingGoals = null;
      matches = [];
      reply(text("guide"), [], { navigation: true });
      return true;
    }
    const goal = goals.find(entry => entry.id === intent.goal);
    const hasPreference = intent.audience || intent.format || intent.schedule || intent.free || intent.transportBarrier;
    if (!goal && (intent.goal || !searchContext || !hasPreference)) return false;

    const choicePreferences = pendingGoals?.goals.includes(intent.goal) ? pendingGoals.intent : null;
    const previous = choicePreferences ?? (!goal || searchContext?.goal === goal ? searchContext : null);
    const preferences = {
      goal: goal ?? previous.goal,
      audience: intent.audience || previous?.audience || "",
      format: intent.format || previous?.format || "",
      schedule: intent.schedule || previous?.schedule || "",
      free: Boolean(intent.free || previous?.free),
      transportBarrier: Boolean(intent.transportBarrier || previous?.transportBarrier)
    };
    searchContext = preferences;
    pendingGoals = null;
    selectedProgram = null;
    if (intent.language !== lang) setLanguage(intent.language);
    if (preferences.goal.askAudience && !preferences.audience) {
      matches = [];
      pendingQuestion = "age";
      askAudience();
    } else if (preferences.transportBarrier && !preferences.format) {
      matches = [];
      pendingQuestion = "askFormat";
      reply(text("askFormat"));
    } else {
      pendingQuestion = "";
      recommend(resources, preferences.goal, {
        ...preferences,
        audience: preferences.audience === "either" ? "" : preferences.audience,
        format: preferences.format === "either" ? "" : preferences.format
      });
    }
    return true;
  }

  function readLocalIntent(query) {
    const either = /\b(either|both|cualquiera|ambos|me da igual)\b/.test(query);
    const youngAnswer = pendingQuestion === "age" && /^(?:young(?: person)?|a young person|younger)[.!?]?$/.test(query);
    const audience = youngAnswer || /\b(youth|teens?|young(?:er)? person|joven|jovenes|adolescente|my (son|daughter|kid)|mi hij[oa])\b/.test(query) ? "youth"
      : /\b(adults?|adultos?|adultas?)\b/.test(query) ? "adult"
      : either && pendingQuestion === "age" ? "either" : "";
    const format = /\b(online|virtual|remote|from home|en linea|desde casa|a distancia)\b/.test(query) ? "online"
      : /\b(in person|presencial)\b/.test(query) ? "inPerson"
      : either && pendingQuestion === "askFormat" ? "either" : "";
    const schedule = /\b(weekends?|saturdays?|sundays?|fin(?:es)? de semana|sabados?|domingos?)\b/.test(query) ? "weekend"
      : /\b(evenings?|night(?:s)?|after work|after (5|five)|por la noche|de noche|por la tarde|despues del trabajo)\b/.test(query) ? "evening" : "";
    const free = /\b(free|no cost|can.t afford|gratis|gratuit[oa]s?|sin costo|no puedo pagar)\b/.test(query);
    const transportBarrier = /\b(no car|(?:don.t|do not) have a car|no tengo (?:carro|coche|auto)|(?:have to|can only|need to) (?:take|ride) the bus|(?:tengo que|solo puedo) (?:tomar|usar) el (?:bus|autobus))\b/.test(query);
    // Work can describe when someone is free instead of what they are looking for.
    const search = query.replace(/\b(after work|i work (?:during the day|full time|daytime)|work for me|despues del trabajo|trabajo de dia)\b/g, "");
    const found = goals.filter(entry => entry.words.test(search)).map(entry => entry.id);
    const foundGoals = found.filter(goal => {
      if (goal === "transport" && transportBarrier && found.length > 1) return false;
      if (goal === "jobs" && found.some(id => ["cityJobs", "youthJobs", "training"].includes(id))) {
        // These phrases describe one goal. Keep job search as a separate goal if
        // it is mentioned again outside the more specific phrase.
        const general = search.replace(/\b((?:city|municipal|youth|teen|summer) jobs?|empleos municipales|empleo juvenil|trabajo de verano|job training|career training|capacitacion (?:para el trabajo|laboral))\b/g, "");
        return goals.find(entry => entry.id === "jobs").words.test(general);
      }
      return true;
    });
    return { language: lang, goal: foundGoals[0] || "", goals: foundGoals, audience, format, schedule, free, transportBarrier };
  }

  function programNumber(query) {
    const number = query.match(/^(?:#)?([1-3])[.!?]?$/)
      ?? query.match(/\b(?:program|programa|option|opcion|number|numero)\s+([1-3])\b/);
    if (number) return Number(number[1]);
    const ordinal = query.match(/\b(first|second|third)\s+(?:one|program|option)\b/)
      ?? query.match(/\b(?:el|la|del)\s+(primer[oa]?|segund[oa]|tercer[oa]?)(?:\s+(?:programa|opcion)\b|[.!?]?\s*$)/);
    if (!ordinal) return 0;
    if (/^(first|primer)/.test(ordinal[1])) return 1;
    return /^(second|segund)/.test(ordinal[1]) ? 2 : 3;
  }

  function lockAiRequest(locked) {
    byId("Send").disabled = locked;
    language.disabled = locked;
    mic.disabled = locked || Boolean(speechCheck);
  }

  async function submit(value, fromVoice = false, chosenGoal = "") {
    const content = value.trim().slice(0, 400);
    if (!content || aiRequest || recognition) return;
    voiceDraft = false;
    log.querySelector(".assistant-choices")?.remove();
    clearSpeechCheck();
    byId("Settings").open = false;
    byId("Suggestions").hidden = true;
    input.value = "";
    status.textContent = "";
    voiceSession = fromVoice;
    const detected = fromVoice ? lang : detectLanguage(content);
    if (detected !== lang) setLanguage(detected);
    message(content, "visitor");
    const query = normalize(content);
    const short = query.replace(/^[¿¡\s]+|[.!?,\s]+$/g, "");
    if (/^(hi|hello|hey|hi there|hello there|good morning|good afternoon|good evening|hola|buenas|buenos dias|buenas tardes|buenas noches)$/.test(short)) {
      return reply(text("hello"));
    }
    if (/^(thanks|thanks so much|thank you|thank you so much|gracias|muchas gracias)$/.test(short)) return reply(text("thanks"));
    if (/\b(how (do i|to) (use|navigate)|how does (the guide|this site|the matcher) work|guide work|what can you (do|help)|como (usar|uso) (la guia|el sitio)|como funciona (la guia|el sitio)|que ofrece (la guia|el sitio)|en que me puedes ayudar|matcher|buscador de programas)\b/.test(query)) {
      applyIntent({ language: lang, goal: "guide" }, []);
      return;
    }

    const resources = directory.resources();
    if (!resources) return reply(text("loading"));
    if (!resources.length) return reply(text("empty"));
    const number = programNumber(query);
    const named = resources.find(resource => query.includes(normalize(resource.name)));
    const asksHours = /\b(hours|when does|horarios?|a que hora)\b/.test(query);
    const followUp = asksHours || /\b(eligibility|eligible|requirements|contact|phone|call|tell me more|where is it|how (do|can) i (apply|sign up)|requisitos|contacto|telefono|llamar|mas informacion|donde queda|como me inscribo)\b/.test(query);
    const selected = named ?? (number ? matches[number - 1] : followUp ? selectedProgram ?? (matches.length === 1 ? matches[0] : null) : null);
    if (selected) {
      selectedProgram = selected;
      pendingQuestion = "";
      pendingGoals = null;
      if (asksHours) {
        const hasHours = selected.hours || (lang === "es" && selected.translations?.es?.hours);
        return reply(text(hasHours ? "programHours" : "hoursMissing"), [selected], { hoursOnly: true });
      }
      return reply(text("programDetails"), [selected], { expanded: true });
    }
    if (number || (followUp && matches.length > 1)) return reply(text("details"));

    const localIntent = readLocalIntent(query);
    if (pendingQuestion === "askFormat" && /^(yes|yeah|sure|si|claro)$/.test(short)) localIntent.format = "online";
    if (pendingQuestion === "askFormat" && short === "no") localIntent.format = "inPerson";
    if (!chosenGoal && localIntent.goals.length > 1) {
      searchContext = selectedProgram = null;
      pendingQuestion = "";
      matches = [];
      pendingGoals = { goals: localIntent.goals, intent: localIntent };
      return askGoal();
    }
    if (chosenGoal) localIntent.goal = chosenGoal;
    if (applyIntent(localIntent, resources)) return;
    if (pendingQuestion === "age" && !localIntent.goal && /^(ad(?:u(?:l)?)?|yo|you|jov)$/.test(short)) return askAudience(true);

    const nameQuery = short.replace(/^(tell me about|what is|que es|hablame de)\s+/, "");
    const possibleNames = nameQuery.length >= 5
      ? resources.filter(resource => normalize(resource.name).includes(nameQuery)) : [];
    if (possibleNames.length === 1) {
      selectedProgram = possibleNames[0];
      pendingQuestion = "";
      pendingGoals = null;
      return reply(text("programDetails"), possibleNames, { expanded: true });
    }

    if (byId("Ai").checked && document.documentElement.dataset.dataSource === "google-sheet") {
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
    if (pendingGoals) return askGoal();
    if (pendingQuestion === "age") return askAudience(true);
    reply(text(pendingQuestion || (followUp ? "details" : "unknown")));
  }

  function finishListening(active, abort = false) {
    if (recognition !== active) return;
    recognition = null;
    clearTimeout(speechTimer);
    input.readOnly = false;
    byId("Send").disabled = Boolean(aiRequest);
    if (abort) active.abort();
    mic.textContent = text("mic");
    mic.setAttribute("aria-pressed", "false");
  }

  function showDictation(key) {
    status.textContent = text(key);
    byId("Dictation").hidden = false;
  }

  function hideDictation() {
    byId("Dictation").hidden = true;
    byId("Dictation").open = false;
  }

  function startSpeechCheck() {
    speechCheck = {};
    mic.disabled = true;
    return speechCheck;
  }

  function clearSpeechCheck() {
    speechCheck = null;
    mic.disabled = Boolean(aiRequest);
  }

  async function findSpeechPack(locale) {
    const preferred = (navigator.languages ?? []).filter(tag => tag.toLowerCase().startsWith(locale + "-")).slice(0, 3);
    const candidates = [...new Set([...preferred, ...speechLocales[locale]])];
    const checked = [];
    for (const quality of ["dictation", "command"]) {
      const packs = await Promise.all(candidates.map(async tag => {
        const options = { langs: [tag], processLocally: true, quality };
        try {
          return { options, state: await Recognition.available(options) };
        } catch {
          return { options, state: "unavailable" };
        }
      }));
      const available = packs.find(pack => pack.state === "available");
      if (available) return available;
      checked.push(...packs);
    }
    return checked.find(pack => pack.state === "downloading")
      ?? checked.find(pack => pack.state === "downloadable");
  }

  function offerSpeechPack(options) {
    showDictation("pack");
    const install = document.createElement("button");
    install.type = "button";
    install.textContent = text("install");
    install.addEventListener("click", async () => {
      const check = startSpeechCheck();
      status.textContent = text("installing");
      try {
        const installed = await Recognition.install(options);
        if (speechCheck !== check) return;
        if (installed) status.textContent = text("ready");
        else showDictation("micUnavailable");
      } catch {
        if (speechCheck === check) showDictation("micUnavailable");
      } finally {
        if (speechCheck === check) clearSpeechCheck();
      }
    });
    status.append(" ", install);
  }

  async function listen() {
    if (recognition) {
      recognition.stop();
      return;
    }
    if (speechCheck || aiRequest) return;
    if (!Recognition?.available) {
      showDictation("micUnavailable");
      return;
    }

    const check = startSpeechCheck();
    status.textContent = text("checking");
    try {
      const active = new Recognition();
      if (!("processLocally" in active)) return showDictation("micUnavailable");
      const pack = await findSpeechPack(lang);
      if (speechCheck !== check || !dialog.open || aiRequest) return;
      if (pack?.state !== "available") {
        if (pack?.state === "downloadable" && Recognition.install) offerSpeechPack(pack.options);
        else showDictation(pack?.state === "downloading" ? "packDownloading" : "micUnavailable");
        return;
      }

      active.lang = pack.options.langs[0];
      active.processLocally = true;
      active.continuous = pack.options.quality === "dictation";
      active.interimResults = active.continuous;
      stopSpeaking();
      hideDictation();
      const originalDraft = input.value;
      let heard = false;
      const finishDraft = error => {
        if (recognition !== active) return;
        finishListening(active);
        if (heard) {
          status.textContent = text("reviewSpeech");
        } else if (["not-allowed", "service-not-allowed"].includes(error)) {
          showDictation("micBlocked");
        } else {
          showDictation("micError");
        }
      };
      active.onresult = event => {
        if (recognition !== active) return;
        const transcript = Array.from(event.results, result => result[0]?.transcript?.trim())
          .filter(Boolean).join(" ");
        if (!transcript) return;
        input.value = [originalDraft.trimEnd(), transcript].filter(Boolean).join(" ").slice(0, input.maxLength);
        heard = true;
        voiceDraft = true;
      };
      active.onerror = event => finishDraft(event.error);
      active.onend = () => finishDraft();
      recognition = active;
      input.readOnly = true;
      byId("Send").disabled = true;
      mic.textContent = text("stop");
      mic.setAttribute("aria-pressed", "true");
      status.textContent = text(active.continuous ? "listening" : "listeningShort");
      active.start();
      if (recognition === active) speechTimer = setTimeout(() => active.stop(), 25000);
    } catch {
      if (speechCheck !== check) return;
      if (recognition) finishListening(recognition);
      showDictation("micUnavailable");
    } finally {
      if (speechCheck === check) clearSpeechCheck();
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
    clearSpeechCheck();
    hideDictation();
    if (recognition) finishListening(recognition, true);
    stopSpeaking();
    status.textContent = "";
    voiceSession = false;
  });
  byId("Ai").addEventListener("change", () => {
    if (!byId("Ai").checked) {
      aiRequest?.abort();
      status.textContent = "";
    }
  });
  language.addEventListener("change", () => {
    preferredLanguage = language.value;
    hideDictation();
    setLanguage(preferredLanguage);
    status.textContent = "";
    stopSpeaking();
  });
  byId("Voice").addEventListener("change", event => { preferredVoices[lang] = event.target.value; });
  speech?.addEventListener?.("voiceschanged", refreshVoiceOptions);
  byId("Form").addEventListener("submit", event => {
    event.preventDefault();
    submit(input.value, voiceDraft);
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      byId("Form").requestSubmit();
    }
  });
  byId("Replay").addEventListener("click", () => {
    clearSpeechCheck();
    if (recognition) finishListening(recognition, true);
    status.textContent = "";
    if (lastReply) speak(lastReply);
  });
  mic.addEventListener("click", listen);
  setLanguage(lang);
  return { syncLanguage: () => setLanguage(preferredLanguage ?? directory.language()) };
}
