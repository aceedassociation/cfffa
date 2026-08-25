/* CFFA — Assistant CFFA (chatbot widget with simulated AI responses in French) */

window.FFAChatbot = (function () {
  const KNOWLEDGE = [
    {
      keys: ['adhésion', 'adherer', 'adherent', 'devenir', 'membre', 'inscrire', 'rejoindre'],
      answer:
        "Pour rejoindre le Cluster Filière Fromage-Agro (CFFA), rendez-vous sur la page <a href='pages/adhesion.html' class='underline font-semibold'>Adhésion</a>. " +
        "Le formulaire en 3 étapes vous accompagne. Trois catégories de membres : PME / Start-up / Grandes Entreprises, Institutionnels, et Enseignement-Recherche.",
      suggestions: ['Quels documents fournir ?', 'Quels sont les organes ?'],
    },
    {
      keys: ['document', 'fournir', 'pièce', 'justificatif'],
      answer:
        "Pour finaliser une adhésion, prévoyez : statuts juridiques, identifiant fiscal, PV de la dernière AG et un descriptif d'activité. Le bureau du CFFA examine le dossier sous 15 jours.",
    },
    {
      keys: ['président', 'president', 'hbaz', 'abdennabi'],
      answer:
        "Le Président du Cluster CFFA est <strong>M. Abdennabi El Hbaz</strong>. Lisez son message sur la page <a href='pages/mot-du-president.html' class='underline font-semibold'>Mot du Président</a>.",
    },
    {
      keys: ['produit', 'fromage', 'mozzarella', 'kefir', 'gamme', 'catalogue', 'saykouk'],
      answer:
        "Notre catalogue comprend : <strong>laits fermentés</strong> (Saykouk traditionnel & yaourt, Kefir, Kombucha, sans gluten), <strong>fromages frais & à tartiner</strong>, <strong>Mozzarella</strong>, " +
        "<strong>fromages à pâte dure</strong> (Edam, Gouda, Cheddar, râpé), <strong>crèmes, beurre & sauces fromage</strong>. " +
        "Détails sur <a href='pages/nos-produits.html' class='underline font-semibold'>Nos produits</a>.",
      suggestions: ['Quelles unités produisent ?', 'Quel est le partenariat ?'],
    },
    {
      keys: ['unité', 'aysa', 'bladi', 'ouargha', 'gie'],
      answer:
        "Trois unités industrielles forment le cœur du partenariat stratégique du CFFA : <strong>Aysa FMCG</strong> (pâte molle, Loukkous - Province de Kénitra, 40 t lait/jour), " +
        "<strong>Coopérative Féminine Bladi</strong> (lait de chèvre, Sidi Azouz El Berkine - Ben Guérir, 480 agricultrices), " +
        "<strong>GIE Bassin de Ouargha</strong> (pâte dure, Commune Mazroua - Taounate, 3 coopératives, 350 producteurs).",
    },
    {
      keys: ['partenaire', 'partenariat', 'collaborateur', 'institution'],
      answer:
        "Le CFFA collabore avec le Ministère de l'Agriculture (Direction de la Digitalisation, Direction du Développement des Filières), l'ONSSA, l'ONCA, l'IAV Hassan II, l'INRA, l'Université Hassan II (FS Ben M'Sik) et les CRRA de Tanger, Settat et Marrakech-Safi. Voir <a href='pages/nos-partenaires.html' class='underline font-semibold'>Nos partenaires</a>.",
    },
    {
      keys: ['vision', 'mission', 'stratégie', 'strategie', 'objectif', 'pilier'],
      answer:
        "Notre vision repose sur 5 piliers : valoriser le lait marocain, remplacer l'importation par le Made in Morocco, structurer une chaîne de valeur équitable, créer une marque marocaine forte, développer le monde rural. " +
        "Détails sur <a href='pages/notre-vision.html' class='underline font-semibold'>Notre vision</a>.",
    },
    {
      keys: ['territoire', 'région', 'region', 'carte', 'cartographie', 'localisation', 'ancrage'],
      answer:
        "Le CFFA est présent dans <strong>6 régions</strong> : Casablanca-Settat (siège), Rabat-Salé-Kénitra, Fès-Meknès, Béni Mellal-Khénifra, Marrakech-Safi, Laâyoune-Sakia El Hamra. " +
        "Carte interactive sur <a href='pages/ancrage-territorial.html' class='underline font-semibold'>Ancrage territorial</a>.",
    },
    {
      keys: ['recherche', 'rd', 'r&d', 'développement', 'developpement', 'innovation', 'flamme', 'mauritanie', 'rosso'],
      answer:
        "Les « Flammes du Cluster » couvrent la R&D (qualité du lait, microbiologie d'affinage, emballage écoresponsable, traçabilité, IA & data) et la stratégie générale, dont le <strong>partenariat Maroc-Mauritanie</strong> à Rosso (fleuve Sénégal). " +
        "Plus de détails sur <a href='pages/flammes-du-cluster.html' class='underline font-semibold'>Flammes du Cluster</a>.",
    },
    {
      keys: ['statut', 'réglement', 'reglement', 'reglementation', 'bureau', 'organe'],
      answer:
        "Organes de l'association : Assemblée Générale, Comité d'Orientation Stratégique, Conseil d'Administration, Comité Exécutif (4 membres), Commissions Thématiques + Comité de Sélection, Structure d'Animation. " +
        "Documents publics sur <a href='pages/reglementation.html' class='underline font-semibold'>Réglementation</a>.",
    },
    {
      keys: ['contact', 'téléphone', 'telephone', 'email', 'siege', 'siège', 'adresse', 'joindre', 'whatsapp', 'berrechid'],
      answer:
        "Siège : <strong>Centre de Conseil Agricole, Berrechid</strong> — 10-02, Rte de Khouribga. " +
        "Tél / WhatsApp : <a href='https://wa.me/212662869696' class='underline font-semibold'>+212 6 62 86 96 96</a>. " +
        "Email : <a href='mailto:contact@cffa.ma' class='underline font-semibold'>contact@cffa.ma</a>. " +
        "Formulaire sur <a href='pages/contact.html' class='underline font-semibold'>Contact</a>.",
    },
    {
      keys: ['femme', 'feminin', 'féminin', 'inclusion', 'genre', 'rurale'],
      answer:
        "Le CFFA compte plus de <strong>1 000 femmes</strong> productrices. La Coopérative Féminine Bladi rassemble à elle seule 480 agricultrices et produit fromages, Kefir, Kombucha et aliments sans gluten à partir de lait de chèvre.",
    },
    {
      keys: ['historique', 'histoire', 'création', 'creation', 'fondation', 'agro-lait'],
      answer:
        "Genèse : 2013 — création de la Coordination régionale des producteurs de lait et viande rouge ; 2016 — élargissement avec le nouveau découpage régional ; 2021 — renommage « Cluster Agro-Lait » ; <strong>9 octobre 2024</strong> — renommage <strong>Cluster Filière Fromage-Agro (CFFA)</strong>. " +
        "Frise complète sur <a href='pages/qui-sommes-nous.html#historique' class='underline font-semibold'>Notre historique</a>.",
    },
    {
      keys: ['chiffre', 'stat', 'statistique', 'combien', 'nombre'],
      answer:
        "Chiffres clés : <strong>~20 000 agriculteurs-éleveurs</strong>, dont <strong>+1 000 femmes</strong>, <strong>500 coopératives</strong>, <strong>15 sociétés</strong> partenaires, <strong>6 régions</strong>, <strong>+10 milliards de DH</strong> investis, <strong>~700 000 L de lait/jour</strong> (avant Covid).",
    },
  ];

  const DEFAULT_SUGGESTIONS = [
    'Comment adhérer ?',
    'Découvrir les produits',
    'Mot du Président',
    'Où nous trouver ?',
  ];

  let panel, body, input, isOpen = false;

  function localizeLinks(html) {
    const inPagesDir = location.pathname.toLowerCase().includes('/pages/');
    return inPagesDir ? html.replaceAll("href='pages/", "href='") : html;
  }

  function addBubble(text, who = 'bot') {
    const div = document.createElement('div');
    div.className = `chat-bubble ${who}`;
    if (who === 'bot') div.innerHTML = localizeLinks(text);
    else div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function addSuggestions(items) {
    if (!items || !items.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'chat-suggestions';
    items.forEach((s) => {
      const chip = document.createElement('button');
      chip.className = 'chat-chip';
      chip.textContent = s;
      chip.addEventListener('click', () => { input.value = s; handleSend(); });
      wrap.appendChild(chip);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function addTyping() {
    const div = document.createElement('div');
    div.className = 'chat-bubble bot';
    div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    return div;
  }

  function normalize(s) {
    return s.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s&]/g, ' ');
  }

  function findAnswer(q) {
    const n = normalize(q);
    let best = null, bestScore = 0;
    KNOWLEDGE.forEach((entry) => {
      const score = entry.keys.reduce((acc, k) => acc + (n.includes(normalize(k)) ? 1 : 0), 0);
      if (score > bestScore) { best = entry; bestScore = score; }
    });
    if (best) return best;
    return {
      answer:
        "Je n'ai pas la réponse exacte, mais l'équipe du CFFA peut vous aider directement via " +
        "<a href='pages/contact.html' class='underline font-semibold'>Contact</a>. " +
        "Vous pouvez aussi me demander : adhésion, produits, président, vision, partenaires, régions, contact.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  function handleSend() {
    const value = input.value.trim();
    if (!value) return;
    addBubble(value, 'user');
    input.value = '';
    const typing = addTyping();
    setTimeout(() => {
      typing.remove();
      const res = findAnswer(value);
      addBubble(res.answer, 'bot');
      addSuggestions(res.suggestions || DEFAULT_SUGGESTIONS);
    }, 650 + Math.random() * 500);
  }

  function open() {
    isOpen = true; panel.classList.add('open');
    setTimeout(() => input && input.focus(), 200);
  }
  function close() { isOpen = false; panel.classList.remove('open'); }
  function toggle() { isOpen ? close() : open(); }

  function build() {
    const launcher = document.createElement('button');
    launcher.className = 'chat-launcher';
    launcher.setAttribute('aria-label', 'Ouvrir Assistant CFFA');
    launcher.innerHTML = `
      <span class="pulse"></span>
      <svg class="w-7 h-7 relative" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a8 8 0 11-3.5-6.6L21 4l-1 4.5A8 8 0 0121 12z"/>
        <circle cx="8" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/>
      </svg>`;
    launcher.addEventListener('click', toggle);

    panel = document.createElement('div');
    panel.className = 'chat-panel';
    panel.innerHTML = `
      <div class="chat-header">
        <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5v5l3 2"/></svg>
        </div>
        <div class="flex-1">
          <p class="font-semibold leading-tight">Assistant CFFA</p>
          <p class="text-xs text-white/75 flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-green-300"></span> En ligne · Propulsé par IA</p>
        </div>
        <button id="chatCloseBtn" class="text-white/80 hover:text-white" aria-label="Fermer">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6l-12 12"/></svg>
        </button>
      </div>
      <div class="chat-body" id="chatBody"></div>
      <div class="chat-input-wrap">
        <input type="text" id="chatInput" class="chat-input" placeholder="Posez votre question…" autocomplete="off"/>
        <button id="chatSendBtn" class="chat-send" aria-label="Envoyer">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12l14-7-3 7 3 7-14-7z"/></svg>
        </button>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    body = panel.querySelector('#chatBody');
    input = panel.querySelector('#chatInput');
    panel.querySelector('#chatCloseBtn').addEventListener('click', close);
    panel.querySelector('#chatSendBtn').addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

    setTimeout(() => {
      addBubble("Bonjour ! Je suis <strong>Assistant CFFA</strong>, propulsé par IA. Comment puis-je vous aider aujourd'hui ?");
      addSuggestions(DEFAULT_SUGGESTIONS);
    }, 600);
  }

  return {
    init() { build(); },
    open, close,
  };
})();
