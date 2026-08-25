/* CFFA — Smart search (lightweight, opens via header CTA or Ctrl+K) */

window.FFASearch = (function () {
  const INDEX = [
    { title: 'Accueil', desc: 'Présentation du Cluster CFFA', href: 'index.html', tags: ['accueil', 'home', 'cluster', 'cffa'] },
    { title: 'Qui sommes-nous', desc: 'Mission, historique, organisation, écosystème', href: 'pages/qui-sommes-nous.html', tags: ['mission', 'histoire', 'organisation', 'ecosysteme', 'siege', 'berrechid'] },
    { title: 'Notre vision', desc: '5 piliers stratégiques', href: 'pages/notre-vision.html', tags: ['vision', 'strategie', 'objectifs', 'pilier', 'souverainete'] },
    { title: 'Ancrage territorial', desc: 'Cartographie des 6 régions', href: 'pages/ancrage-territorial.html', tags: ['carte', 'regions', 'cooperatives', 'territoire'] },
    { title: 'Flammes du Cluster', desc: 'R&D + stratégie générale', href: 'pages/flammes-du-cluster.html', tags: ['rd', 'recherche', 'innovation', 'strategie', 'mauritanie', 'rosso'] },
    { title: 'Nos produits', desc: 'Catalogue des produits CFFA', href: 'pages/nos-produits.html', tags: ['fromage', 'lait', 'kefir', 'saykouk', 'mozzarella'] },
    { title: 'Laits fermentés', desc: 'Saykouk, Kefir, Kombucha, sans gluten', href: 'pages/nos-produits.html#laits-fermentes', tags: ['saykouk', 'kefir', 'kombucha', 'yaourt', 'gluten'] },
    { title: 'Fromages frais & à tartiner', desc: 'Frais, tartiner, liquide, Feta', href: 'pages/nos-produits.html#frais', tags: ['feta', 'tartiner', 'frais', 'liquide'] },
    { title: 'Mozzarella', desc: 'Pâte filée', href: 'pages/nos-produits.html#mozzarella', tags: ['mozzarella'] },
    { title: 'Fromages à pâte dure', desc: 'Edam, Gouda, Cheddar, râpé', href: 'pages/nos-produits.html#pate-dure', tags: ['edam', 'gouda', 'cheddar', 'rape', 'pate dure'] },
    { title: 'Crèmes, beurre & sauces', desc: 'Crèmes, beurre, sauces fromage', href: 'pages/nos-produits.html#cremes', tags: ['creme', 'beurre', 'sauce'] },
    { title: 'Nos partenaires', desc: 'Partenariat stratégique des 3 unités', href: 'pages/nos-partenaires.html', tags: ['partenaire', 'aysa', 'bladi', 'ouargha'] },
    { title: 'Réglementation', desc: 'Statuts, bureau, adhérents', href: 'pages/reglementation.html', tags: ['statut', 'bureau', 'reglement', 'documents'] },
    { title: 'Adhésion', desc: "Formulaire d'adhésion en 3 étapes", href: 'pages/adhesion.html', tags: ['adhesion', 'inscription', 'membre'] },
    { title: 'Mot du Président', desc: 'Message de M. Abdennabi El Hbaz', href: 'pages/mot-du-president.html', tags: ['president', 'message', 'hbaz', 'abdennabi'] },
    { title: 'Contact', desc: 'Coordonnées, WhatsApp, Berrechid', href: 'pages/contact.html', tags: ['contact', 'siege', 'telephone', 'email', 'whatsapp', 'berrechid'] },
  ];

  let overlay, input, results;
  const inPagesDir = location.pathname.toLowerCase().includes('/pages/');
  const base = inPagesDir ? '../' : '';

  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function score(q, item) {
    const n = normalize(q);
    if (!n) return 0;
    let s = 0;
    if (normalize(item.title).includes(n)) s += 5;
    if (normalize(item.desc).includes(n)) s += 2;
    item.tags.forEach(t => { if (normalize(t).includes(n)) s += 3; });
    return s;
  }

  function render(q) {
    const list = INDEX
      .map(item => ({ item, s: score(q, item) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8);

    if (!q) {
      results.innerHTML = `
        <p class="text-xs uppercase tracking-wider text-[var(--ffa-mute)] px-3 pt-2 pb-1">Suggestions</p>
        ${INDEX.slice(0, 6).map(it => row(it)).join('')}
      `;
      return;
    }
    if (!list.length) {
      results.innerHTML = `<div class="p-6 text-center text-sm text-[var(--ffa-mute)]">Aucun résultat. Essayez « produits », « adhésion », « partenaires »…</div>`;
      return;
    }
    results.innerHTML = list.map(x => row(x.item)).join('');
  }

  function row(item) {
    return `<a href="${base}${item.href}" class="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-[rgba(23,107,58,.08)] transition">
      <span class="w-9 h-9 rounded-lg bg-[rgba(23,107,58,.12)] text-[var(--ffa-forest-dark)] flex items-center justify-center shrink-0">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
      </span>
      <span class="flex-1">
        <span class="block font-semibold text-sm text-[var(--ffa-ink)]">${item.title}</span>
        <span class="block text-xs text-[var(--ffa-mute)]">${item.desc}</span>
      </span>
    </a>`;
  }

  function build() {
    overlay = document.createElement('div');
    overlay.id = 'ffaSearchOverlay';
    overlay.className = 'fixed inset-0 z-[80] hidden';
    overlay.innerHTML = `
      <div class="absolute inset-0 bg-[rgba(23,107,58,.45)] backdrop-blur-sm" data-close></div>
      <div class="relative max-w-xl mx-auto mt-24 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="flex items-center gap-3 border-b border-[rgba(23,107,58,.08)] px-4 py-3">
          <svg class="w-5 h-5 text-[var(--ffa-mute)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z"/></svg>
          <input id="ffaSearchInput" type="text" class="flex-1 outline-none text-base bg-transparent" placeholder="Rechercher (produits, adhésion, partenaires…)"/>
          <kbd class="text-[10px] tracking-widest text-[var(--ffa-mute)] border border-[rgba(23,107,58,.15)] rounded px-1.5 py-0.5">ESC</kbd>
        </div>
        <div id="ffaSearchResults" class="max-h-[60vh] overflow-y-auto p-2"></div>
        <div class="border-t border-[rgba(23,107,58,.08)] px-4 py-2 text-[11px] text-[var(--ffa-mute)] flex items-center justify-between">
          <span>Recherche intelligente · CFFA</span>
          <span class="flex items-center gap-1"><kbd class="border border-[rgba(23,107,58,.15)] rounded px-1">↵</kbd> ouvrir</span>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    input = overlay.querySelector('#ffaSearchInput');
    results = overlay.querySelector('#ffaSearchResults');
    overlay.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
    input.addEventListener('input', () => render(input.value));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); toggle(); }
    });

    document.querySelectorAll('[data-search-trigger]').forEach(b => b.addEventListener('click', open));
  }

  function open() { overlay.classList.remove('hidden'); render(''); setTimeout(() => input.focus(), 50); }
  function close() { overlay.classList.add('hidden'); input.value = ''; }
  function toggle() { overlay.classList.contains('hidden') ? open() : close(); }

  return { init: build, open, close };
})();
